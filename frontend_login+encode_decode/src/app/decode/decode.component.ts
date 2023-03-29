import { Component, Inject, OnInit} from '@angular/core';
import { UploadComponent } from '../upload/upload.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


export interface DialogData {
  message?: string;
}

@Component({
  selector: 'app-decode',
  templateUrl: './decode.component.html',
  styleUrls: ['./decode.component.css']
})

export class DecodeComponent implements OnInit{

  form!: FormGroup;
  test: unknown;
  
  
  constructor(
    public dialog: MatDialogRef<DecodeComponent>,
    private service: UploadComponent){}
    
    ngOnInit() {
      this.service.getDecoded()
        .subscribe(response => {
          this.test = response;
        });
      }


  save() {
    this.dialog.close();
  }

  close() {
    this.dialog.close();
  }

}
