package database

import (
	entities "imageAPI/models"
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

const DB_USERNAME = "root"
const DB_PASSWORD = ""
const DB_NAME = "images"
const DB_HOST = "127.0.0.1"
const DB_PORT = "3306"

var Instance *gorm.DB
var err error

func Connect() {
	dsn := DB_USERNAME + ":" + DB_PASSWORD + "@tcp" + "(" + DB_HOST + ":" + DB_PORT + ")/" + DB_NAME + "?" + "parseTime=true&loc=Local"
	Instance, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
		panic("Cannot connect to DB")
	}
	log.Println("Connected to Database...")
}

func Migrate() {
	Instance.AutoMigrate(&entities.Image{})
	log.Println("Database Migration Completed...")
}
