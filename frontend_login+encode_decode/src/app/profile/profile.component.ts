import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ){
  }

  

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }
}
