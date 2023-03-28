import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLogin: boolean = false
  registerUsername: string | null = null
  registerPassword: string | null = null
  loginUsername: string | null = null
  loginPassword: string | null = null

  user = true;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ){}

  

  login(){
    this.httpClient.post('http://localhost:8080/signin', {
      username: this.loginUsername,
      password: this.loginPassword
    }).subscribe((response: any) => {
      if(response || 'User Signed In'){
        //removed, not jwt currently
        //localStorage.setItem('token', response.jwt)
        this.router.navigate(['profile'])
      }

      //want to be able to username from database instead
      

      this.loginUsername = null
      this.loginPassword = null
    })
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  fieldTextType: boolean = false;
  show: boolean = false;

  toggleFieldTextType() {
      this.fieldTextType = !this.fieldTextType;
      this.show = !this.show;
  }

}