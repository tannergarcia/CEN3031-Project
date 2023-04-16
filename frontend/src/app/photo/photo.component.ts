import { Component, Inject, OnInit } from '@angular/core';
import { AlbumComponent } from '../album/album.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit{
  public service!: AlbumComponent;
  photoURL! : string;
  timestamp!: string;
  ipAddy = 'localhost';


  constructor(private httpClient: HttpClient,
    public dialog: MatDialogRef<PhotoComponent>, @Inject(MAT_DIALOG_DATA) public data: string
    ){}
    
  ngOnInit(): void {
    this.photoURL = this.data;
    this.timestamp = this.photoURL.substring(42);
  }

    Decode(){
    }

    Delete(){
      console.log("delete");
      this.httpClient.delete("http://localhost:4200/delete/?timestamp="+this.timestamp,
      {
        withCredentials: true
      }).subscribe((rslt:Object)=>{
        console.log(JSON.stringify(rslt))
      }) ;

      this.dialog.close();
      

    }

    Update(){
      this.service.removeImage(this.photoURL);
    }

    Download(){
      console.log("download"); 
      window.open(this.photoURL);
  }

    Close(){
      this.dialog.close();
    }

  

}
