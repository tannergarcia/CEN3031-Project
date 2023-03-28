import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLogin: boolean = false
  registerUsername: string | null = null
  registerPassword: string | null = null
  loginUsername: string | null = null
  loginPassword: string | null = null

  user = true;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ){ }

  register(){
    console.log(this.registerUsername, this.registerPassword)
    this.httpClient.post('http://localhost:8080/signup', {
      //username for now
      username: this.registerUsername,
      password: this.registerPassword
    }).subscribe((response: any) => {
      if(response){
        localStorage.setItem('token', response.jwt)
        this.router.navigate(['profile'])
      }
      this.registerUsername = null
      this.registerPassword = null

      this.goToPage('signin');
    })
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

}

