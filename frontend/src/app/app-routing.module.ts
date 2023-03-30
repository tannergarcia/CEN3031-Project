import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authweb/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: "signin", component: LoginComponent },
  { path: "signup", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: '', redirectTo: 'signin', pathMatch: 'full'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }