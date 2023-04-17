import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AlbumComponent } from '../album/album.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent{

  static selectedIndex: number;
  public classRef = ProfileComponent;
  public static text = "New"
  

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ){
    ProfileComponent.selectedIndex = 0;
    ProfileComponent.text = "New";
  }

  Change(){
    
    if (this.classRef.selectedIndex == 0){
      this.classRef.selectedIndex = 1;
      ProfileComponent.text = "Album"
    }
    else{
      this.classRef.selectedIndex = 0;
      ProfileComponent.text = "New"
    }
    
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }
}
