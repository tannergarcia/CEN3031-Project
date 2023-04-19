import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { Router } from '@angular/router';

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
    //Remove cookie
    document.cookie.split(';').forEach(function(c) {
      document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    });
    this.router.navigate([`${pageName}`]);
  }
}
