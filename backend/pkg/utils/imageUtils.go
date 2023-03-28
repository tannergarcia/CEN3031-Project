package utils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/tannergarcia/PhotoBomb/backend/pkg/database"
	"github.com/tannergarcia/PhotoBomb/backend/pkg/models"
)

// Add image to file and db
func AddImage(token string, filetype string, file *bytes.Buffer, w http.ResponseWriter) {
	//filename = token + ID -> ID = timestamp
	timestamp := Timestamp()
	fileName := token + timestamp + filetype

	//Save file
	WriteFile(fileName, file)

	//Image object to DB
	w.Header().Set("Content-Type", "application/json")
	var image models.Image
	image.Token = token
	image.Timestamp = timestamp
	image.Extension = filetype
	database.ImageInstance.Create(&image)
	json.NewEncoder(w).Encode(image)
}

func DecodeImage(file *multipart.File) string {
	//TODO return decoded image text
	return "Sample decode"
}

func WriteFile(fileName string, file *bytes.Buffer) {
	//Write image file
	f, err := os.Create("../uploads/"+fileName)

	if err != nil {
		fmt.Println("error creating file")
		return
	}
	file.WriteTo(f) // write buffer to file
	f.Close()
}

func Timestamp() string {
	return strconv.FormatInt(time.Now().UnixNano(), 10)
}
