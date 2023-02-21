package controllers

import (
	"encoding/json"
	"fmt"
	"imageAPI/database"
	entities "imageAPI/models"
	"imageAPI/utils"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func ImageCreate(w http.ResponseWriter, r *http.Request) {
	var errNew string
	fmt.Println("Create")
	//Parse form data
	r.ParseMultipartForm(32 << 20)
	file, handler, err := r.FormFile("uploadfile")
	imageText := r.Form["imagetext"]

	//Only allow images
	filetype := filepath.Ext(handler.Filename)
	filetype = strings.ToLower(filetype)
	if filetype != ".jpeg" && filetype != ".png" && filetype != ".jpg" {
		errNew = "The provided file format is not allowed. Please upload a JPEG,JPG or PNG image"
		//http_status = http.StatusBadRequest
		panic(errNew)
	} else {
		//TODO check if text can fit into image
		//TODO encode image with text
		fmt.Println(imageText)
		utils.AddImage("token", filetype, &file, w) //Write image file and add to DB
	}

	if err != nil {
		fmt.Println("error")
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusCreated) //http_status
}

func ImageDecode(w http.ResponseWriter, r *http.Request) {
	var errNew string
	var imageCode string
	//Parse form data
	r.ParseMultipartForm(32 << 20)
	file, handler, err := r.FormFile("uploadfile")

	//Only allow images
	filetype := filepath.Ext(handler.Filename)
	if filetype != ".jpeg" && filetype != ".png" && filetype != ".jpg" {
		errNew = "The provided file format is not allowed. Please upload a JPEG,JPG or PNG image"
		//http_status = http.StatusBadRequest
		panic(errNew)
	} else {
		imageCode = utils.DecodeImage(&file)
	}

	if err != nil {
		fmt.Println("error")
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	json.NewEncoder(w).Encode(imageCode)
	//w.WriteHeader(http.StatusCreated) //http_status
}

func GetImageById(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Get image")

	//Parse request
	token := r.URL.Query().Get("token")
	timestamp := r.URL.Query().Get("timestamp")

	var image entities.Image
	image.Token = token
	image.Timestamp = timestamp

	//Get from db
	database.Instance.Where("token = ? AND timestamp = ?", image.Token, image.Timestamp).First(&image)
	if image.ID == 0 { //If image does not exist
		json.NewEncoder(w).Encode("Image Not Found!")
		return
	}
	filename := image.Token + image.Timestamp + image.Extention
	fileBytes, err := ioutil.ReadFile("./uploads/" + filename)
	if err != nil {
		panic(err)
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/octet-stream")
	w.Write(fileBytes)
}

func ExistingDecode(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Get image")

	//Parse request
	var image entities.Image
	err := json.NewDecoder(r.Body).Decode(&image)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//Get from db
	database.Instance.Where("token = ? AND timestamp = ?", image.Token, image.Timestamp).First(&image)
	if image.ID == 0 { //If image does not exist
		json.NewEncoder(w).Encode("Image Not Found!")
		return
	}
	filename := image.Token + image.Timestamp + image.Extention
	fileBytes, err := ioutil.ReadFile("./uploads/" + filename)
	if err != nil {
		panic(err)
	}

	//TODO decode image
	fmt.Println(fileBytes[0])

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("imageCode")

}

func GetAllImages(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Get all images")
	//Parse request
	token := r.URL.Query().Get("token")
	fmt.Println("Check GET")
	fmt.Println(token)

	var image entities.Image
	image.Token = token

	//Get from db
	var images []entities.Image
	database.Instance.Where("token = ?", image.Token).Find(&images)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(images)
}

func DeleteImageById(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Delete image")
	//Parse request
	var image entities.Image
	err := json.NewDecoder(r.Body).Decode(&image)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//Delete from db
	database.Instance.Where("token = ? AND timestamp = ?", image.Token, image.Timestamp).First(&image).Delete(&image)
	if image.ID == 0 { //If image does not exist
		json.NewEncoder(w).Encode("Image Not Found!")
		//return
	}
	//Delete file
	filename := image.Token + image.Timestamp + image.Extention
	fmt.Println(filename)
	os.Remove("./uploads/" + filename)

}
