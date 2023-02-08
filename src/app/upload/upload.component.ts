import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  fileName = '';
  ipAddy = '100.64.5.189';
  formData = new FormData();

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {

    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

      if (file) {

          this.fileName = file.name;        

          this.formData.append("uploadfile", file);
          this.formData.append("imagetext", "Hello");
          
      }
  }

  onUpload(){
    const upload$ = this.http.post('http://' + this.ipAddy +':8080/upload/encode', this.formData);       
    upload$.subscribe();
    console.log("Sent");
  }
}
