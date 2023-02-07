package database

import (
	"log"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"github.com/tannergarcia/PhotoBomb/models"
)

const DB_USERNAME = "root"
const DB_PASSWORD = ""
const DB_NAME = "users"
const DB_HOST = "127.0.0.1"
const DB_PORT = "3306"

var UserInstance *gorm.DB
var err error

func Connect() {
	dsn := DB_USERNAME + ":" + DB_PASSWORD + "@tcp" + "(" + DB_HOST + ":" + DB_PORT + ")/" + DB_NAME + "?" + "parseTime=true&loc=Local"
	UserInstance, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
		panic("Cannot connect to DB")
	}
	log.Println("Connected to Database...")
}

func Migrate() {
	UserInstance.AutoMigrate(&models.User{})
	log.Println("Database Migration Completed...")
}
