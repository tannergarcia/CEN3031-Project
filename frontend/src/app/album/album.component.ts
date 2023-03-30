import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { imageObj } from './imageObj';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {
  fileName = '';
  ipAddy = 'localhost';
  formData = new FormData();
  hide = true;
  message!: string;
  public displayImageList= [""];
  public imageTest!: imageObj[]

  constructor(private httpClient: HttpClient, private readonly domSanitizer: DomSanitizer) {
    hide: true;
    console.log("new instance");
  }

  ngOnInit() {
    this.updateImages();
  }

  getImageList(){
    console.log("Sent");
    return this.httpClient.get('http://' + this.ipAddy +':4200/download/list/',
    {
      withCredentials: true
    });
  }

  updateImages(){
    this.getImageList().subscribe(images => {
      this.imageTest = JSON.parse(JSON.stringify(images));;
      for(let image in this.imageTest){
        var url = "http://localhost:4200/download/?timestamp="
        var timestamp = this.imageTest[image].timestamp;
        this.displayImageList.push(url + timestamp)
      }
     });
    this.displayImageList.pop();
  }

  public highlight(ev: MouseEvent) {  
    const target = ev.target as HTMLImageElement;
    console.log(target.currentSrc);
    target.classList.add("clicked");
  }

}
