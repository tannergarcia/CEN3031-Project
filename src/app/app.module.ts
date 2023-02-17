import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { ImagebtnsComponent } from './imagebtns/imagebtns.component';
import { MatDividerModule } from '@angular/material/divider';
import { TextboxComponent } from './textbox/textbox.component';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { UploadComponent } from './upload/upload.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DecodeComponent } from './decode/decode.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EncodeComponent } from './encode/encode.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ImagebtnsComponent,
    TextboxComponent,
    UploadComponent,
    DecodeComponent,
    EncodeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatInputModule,
    HttpClientModule,
    FlexLayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DecodeComponent]
})
export class AppModule { 

}
