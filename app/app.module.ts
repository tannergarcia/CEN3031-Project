import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 

import { MatToolbarModule } from '@angular/material/toolbar'; //maybe not necessary
import { MatButtonModule } from '@angular/material/button'; //needed for buttons
import { MatCardModule } from '@angular/material/card'; //for login, register, forget
import {MatInputModule} from '@angular/material/input'; //for login inputs + register + forget
import {MatCheckboxModule} from '@angular/material/checkbox'; //remeber user email

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageComponent } from './page/page.component';

import { ContentService } from './shared/services/content.service';
import { FullpageDirective } from './shared/directives/fullpage.directive';
import { InputBoxesComponent } from './input-boxes/input-boxes.component';

import {ErrorStateMatcher} from '@angular/material/core'; // for email checker
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms'; //for email checker

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    FullpageDirective,
    InputBoxesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [ContentService],  //, {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  bootstrap: [AppComponent]
})
export class AppModule { }
