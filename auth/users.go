package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
	"errors"

	"github.com/google/uuid"
	"github.com/tannergarcia/PhotoBomb/database"
	"github.com/tannergarcia/PhotoBomb/models"
	"golang.org/x/crypto/bcrypt"
)

type Credentials struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

func Signup(w http.ResponseWriter, r *http.Request) {
	// Parse and decode the request body into a new `Credentials` instance
	creds := &Credentials{}
	err := json.NewDecoder(r.Body).Decode(creds)
	if err != nil {
		// If there is something wrong with the request body, return a 400 status
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	// Salt and hash the password using the bcrypt algorithm
	// The second argument is the cost of hashing, which we arbitrarily set as 8 (this value can be more or less, depending on the computing power you wish to utilize)
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(creds.Password), 8)

	if err != nil {
		// something wrong
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Next, create a new user entry for the database
	// TODO: check if username already exists

	// ADD IN SESSION AND SESHEXP
	newUser := models.User{Username: creds.Username, HashWord: string(hashedPassword)}

	// Now add to DB

	result := database.UserInstance.Create(&newUser)

	// check for error
	if result.Error != nil {
		// something wrong
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// We reach this point if the credentials we correctly stored in the database, and the default status of 200 is sent back
	fmt.Println("User Signed Up")
}

func Signin(w http.ResponseWriter, r *http.Request) {
	var creds Credentials

	// Get the JSON body and decode into credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		// If the structure of the body is wrong, return an HTTP error
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// First look for user
	var foundUser models.User
	database.UserInstance.First(&foundUser, "username = ?", creds.Username)

	if err := database.UserInstance.Where("username = ?", creds.Username).First(&foundUser).Error; err != nil {
		// username not found
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	storedPassword := foundUser.HashWord

	// attempt to decrypt password

	if err = bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(creds.Password)); err != nil {
		// wrong password
		w.WriteHeader(http.StatusUnauthorized)
	}

	// Create a new random session token
	sessionToken := uuid.NewString()
	expiresAt := time.Now().Add(2419200 * time.Second) // expiration date is 28 days

	// set token and expiration in database
	database.UserInstance.Model(&foundUser).Update("Session", sessionToken)
	database.UserInstance.Model(&foundUser).Update("SeshExp", expiresAt)

	// Finally, we set the client cookie for "session_token" as the session token we just generated
	http.SetCookie(w, &http.Cookie{
		Name:    "session_token",
		Value:   sessionToken,
		Expires: expiresAt,
	})
	fmt.Println("User Signed In")
}

/*
func Welcome(w http.ResponseWriter, r *http.Request) {
	// We can obtain the session token from the requests cookies, which come with every request
	c, err := r.Cookie("session_token")
	if err != nil {
		if err == http.ErrNoCookie {
			// If the cookie is not set, return an unauthorized status
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		// For any other type of error, return a bad request status
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	sessionToken := c.Value

	// We then get the name of the user from our session map, where we set the session token
	userSession, exists := sessions[sessionToken]
	if !exists {
		// If the session token is not present in session map, return an unauthorized error
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	if userSession.isExpired() {
		delete(sessions, sessionToken)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	// Finally, return the welcome message to the user
	w.Write([]byte(fmt.Sprintf("Welcome %s!", userSession.username)))
}
*/

/*
func Refresh(w http.ResponseWriter, r *http.Request) {
	// (BEGIN) The code from this point is the same as the first part of the `Welcome` route
	c, err := r.Cookie("session_token")
	if err != nil {
		if err == http.ErrNoCookie {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	sessionToken := c.Value

	userSession, exists := sessions[sessionToken]
	if !exists {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	if userSession.isExpired() {
		delete(sessions, sessionToken)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	// (END) The code until this point is the same as the first part of the `Welcome` route

	// If the previous session is valid, create a new session token for the current user
	newSessionToken := uuid.NewString()
	expiresAt := time.Now().Add(120 * time.Second)

	// Set the token in the session map, along with the user whom it represents
	sessions[newSessionToken] = session{
		username: userSession.username,
		expiry:   expiresAt,
	}

	// Delete the older session token
	delete(sessions, sessionToken)

	// Set the new token as the users `session_token` cookie
	http.SetCookie(w, &http.Cookie{
		Name:    "session_token",
		Value:   newSessionToken,
		Expires: time.Now().Add(120 * time.Second),
	})
}
*/

func Logout(w http.ResponseWriter, r *http.Request) {
	c, err := r.Cookie("session_token")
	if err != nil {
		if err == http.ErrNoCookie {
			// If the cookie is not set, return an unauthorized status
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		// For any other type of error, return a bad request status
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// find session token in DB
	var foundUser models.User
	database.UserInstance.First(&foundUser, "session = ?", c.Value) // TODO: test if user doesn't exist

	// remove session from DB
	database.UserInstance.Model(&foundUser).Update("Session", "")

	// We need to let the client know that the cookie is expired
	// In the response, we set the session token to an empty
	// value and set its expiry as the current time
	http.SetCookie(w, &http.Cookie{
		Name:    "session_token",
		Value:   "",
		Expires: time.Now(),
	})
	fmt.Println("User logged out")
}

func GetUser(r *http.Request) (uint64, error) {
	cooky, err := r.Cookie("session_token")
	if err != nil {
		if err == http.ErrNoCookie {
			return 0, errors.New("no cookie")
		}
		return 0, errors.New("bad request")
	}

	var foundUser models.User
	
	if err := database.UserInstance.First(&foundUser, "session = ?", cooky.Value).Error; err != nil {
		// user id doesn't exist
		return 0, errors.New("userID doesn't exist")
	} 

	return foundUser.ID, nil
}