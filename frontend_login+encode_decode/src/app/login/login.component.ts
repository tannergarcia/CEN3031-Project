import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WarningsService } from '../warnings/warnings.service';

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
  loading = false;
  submitted = false;
  form!: FormGroup;
  error = false;
  timer = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertService: WarningsService,
    private formBuilder: FormBuilder
  ){ }

  ngOnInit() {
    this.form = this.formBuilder.group({
        loginUsername: ['', Validators.required],
        loginPassword: ['', Validators.required]
    });
  } 

  get f() { 
    return this.form.controls; 
  }

  login(){
    this.submitted = true;
    this.alertService.clear_warnings();
    this.httpClient.post('http://localhost:8080/signin', {
      username: this.loginUsername,
      password: this.loginPassword
    }).subscribe((response: any) => {
      if(response || 'User Signed In'){
        //removed, not jwt currently
        //localStorage.setItem('token', response.jwt)
        //this.router.navigate(['profile'])
        
      }

        //want to be able to username from database instead
      this.timer = true;
      this.router.navigate(['profile'])
      this.loginUsername = null
      this.loginPassword = null
    });

    if(this.timer == false){
      this.error = true;
    }


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