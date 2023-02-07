package main

import (
	"net/http"
	"log"
	"github.com/tannergarcia/PhotoBomb/database"
	"github.com/tannergarcia/PhotoBomb/auth"

)

func main() {

	database.Connect()
	database.Migrate()


	http.HandleFunc("/signin", auth.Signin)
	http.HandleFunc("/signup", auth.Signup)
	http.HandleFunc("/logout", auth.Logout)

	log.Println("listening on localhost:3000")
	log.Fatal(http.ListenAndServe(":3000", nil))
}
