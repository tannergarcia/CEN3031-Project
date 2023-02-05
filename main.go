package main

import (
	"fmt"
	"html/template"
	"net/http"
	"os"

	"log"

	"github.com/gorilla/pat"
	"github.com/gorilla/sessions"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
)

func main() {

	//key := "" // Replace with your SESSION_SECRET or similar

	// key should be set in environment variable
	// use "set GOOGLEKEY={key}" on windows
	// may have to go into control pannel if that doesn't work
	// I had to restart for it to apply
	key := os.Getenv("GOOGLE_KEY")

	// ClientID also set in environment variable
	
	clientID := os.Getenv("GOOGLE_CLIENT")



	maxAge := 86400 * 30                         // 30 days
	isProd := false                              // Set to true when serving over https

	store := sessions.NewCookieStore([]byte(key))
	store.MaxAge(maxAge)
	store.Options.Path = "/"
	store.Options.HttpOnly = true // HttpOnly should always be enabled
	store.Options.Secure = isProd

	gothic.Store = store

	goth.UseProviders(
		google.New(clientID, key, "http://localhost:3000/auth/google/callback", "email", "profile"),
	)

	p := pat.New()
	p.Get("/auth/{provider}/callback", func(res http.ResponseWriter, req *http.Request) {

		user, err := gothic.CompleteUserAuth(res, req)
		if err != nil {
			fmt.Fprintln(res, err)
			return
		}
		t, _ := template.ParseFiles("templates/success.html")

		store.Save

		t.Execute(res, user)
	})

	p.Get("/auth/{provider}", func(res http.ResponseWriter, req *http.Request) {
	  if gothUser, err := gothic.CompleteUserAuth(res, req); err == mil {
		t, _ := template.ParseFiles("templates/success.html")
		t.Execute(res, gothUser)
	  } else {
	    gothic.BeginAuthHandler(res, req)
	  }
	})

	p.Get("/logout/{provider}", func(res http.ResponseWriter, req *http.Request)) {
		gothic.logout(res,req)
		res.Header().set("Location", "/")
		res.WriteHeader(http.StatusTemporaryRedirect)
	}

	p.Get("/", func(res http.ResponseWriter, req *http.Request) {
		t, _ := template.ParseFiles("templates/index.html")
		t.Execute(res, false)
	})
	log.Println("listening on localhost:3000")
	log.Fatal(http.ListenAndServe(":3000", p))
}
