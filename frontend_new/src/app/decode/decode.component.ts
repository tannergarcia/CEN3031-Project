import { Component, Inject, OnInit} from '@angular/core';
import { UploadComponent } from '../upload/upload.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DecodeSaveComponent } from '../decode-save/decode-save.component';


export interface DialogData {
  message?: string;
}

@Component({
  selector: 'app-decode',
  templateUrl: './decode.component.html',
  styleUrls: ['./decode.component.css']
})

export class DecodeComponent implements OnInit{
  test!: string;
  public service!: UploadComponent;
  
  constructor(
    public dialog: MatDialogRef<DecodeComponent>, private dialogSave: MatDialog
    ){console.log("decode component")} 
    
    ngOnInit() {
      this.service.getDecoded().subscribe((rslt:Object)=>{
        this.test = JSON.stringify(rslt);
        console.log(this.test)
      }
      )
      
    }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
  
    let dialogRef = this.dialogSave.open(DecodeSaveComponent, dialogConfig);
    dialogRef.componentInstance.encodeComp = this;
    this.dialog.close();
  }

  close() {
    this.dialog.close();
  }

}
