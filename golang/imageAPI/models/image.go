package entities

type Image struct {
	ID        uint   `json:"id"`
	Token     string `json:"token"`     //Unique id per user
	Timestamp string `json:"timestamp"` //Name of image file
	Extention string `json:"extention"` //File extension
}
