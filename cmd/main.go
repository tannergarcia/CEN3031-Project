package main

import (
	"github.com/tannergarcia/PhotoBomb/pkg/controllers"
	"github.com/tannergarcia/PhotoBomb/pkg/database"
	"log"
	"net/http"

	"github.com/tannergarcia/PhotoBomb/pkg/auth"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

const PORT = "8080"

func main() {
	// Initialize Database
	database.Connect()
	database.Migrate()

	//Init router
	r := mux.NewRouter()

	//Routes
	RegisterImageRoutes(r)

	//Start server
	log.Printf("Server is running on http://localhost:%s", PORT)

	//Cors allow all orgins
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})
	handler := c.Handler(r)

	log.Println(http.ListenAndServe(":"+PORT, handler))

}
func RegisterImageRoutes(r *mux.Router) {
	//User login
	r.HandleFunc("/signin", auth.Signin).Methods("POST")
	r.HandleFunc("/signup", auth.Signup).Methods("POST")
	r.HandleFunc("/logout", auth.Logout).Methods("POST")

	//Image upload
	r.HandleFunc("/upload/encode", controllers.ImageCreate).Methods("POST")
	r.HandleFunc("/upload/decode", controllers.ImageDecode).Methods("POST") //Decode new
	r.HandleFunc("/decode", controllers.ExistingDecode).Methods("GET")      //Decode existing
	r.HandleFunc("/download/", controllers.GetImageById).Methods("GET")
	r.HandleFunc("/download/list/", controllers.GetAllImages).Methods("GET")
	r.HandleFunc("/delete", controllers.DeleteImageById).Methods("DELETE")
}
