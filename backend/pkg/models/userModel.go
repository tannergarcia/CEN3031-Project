package models

import "time"

type User struct {
	ID       uint64 `json:"id" sql:"AUTO_INCREMENT" gorm:"primary_key"`
	Username string `validate:"alphanum,min=3,max=20"`
	HashWord string `validate:"ascii,min=8,max=20"`
	Session  string
	SeshExp  time.Time
}