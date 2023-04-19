package models

import "time"

type User struct {
	ID       uint64 `json:"id" sql:"AUTO_INCREMENT" gorm:"primary_key"`
	Username string 
	HashWord string 
	Session  string
	SeshExp  time.Time
}