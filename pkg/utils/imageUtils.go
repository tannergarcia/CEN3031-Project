package utils

import (
	"encoding/json"
	"fmt"
	"github.com/tannergarcia/PhotoBomb/pkg/database"
	"github.com/tannergarcia/PhotoBomb/pkg/models"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
	"time"
)

// Add image to file and db
func AddImage(token string, filetype string, file *multipart.File, w http.ResponseWriter) {
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

func WriteFile(fileName string, file *multipart.File) {
	//Write image file
	defer (*file).Close()

	f, err := os.Create("../uploads/"+fileName)

	if err != nil {
		fmt.Println("error")
		return
	}
	defer f.Close()
	io.Copy(f, *file)
	if err != nil {
		fmt.Println("error")
		return
	}
}

func Timestamp() string {
	return strconv.FormatInt(time.Now().UnixNano(), 10)
}
