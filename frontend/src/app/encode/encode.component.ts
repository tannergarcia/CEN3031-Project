import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { UploadComponent } from '../upload/upload.component';
import { EncodeCloseComponent } from '../encode-close/encode-close.component';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { EncodeSaveComponent } from '../encode-save/encode-save.component';

@Component({
  selector: 'app-encode',
  templateUrl: './encode.component.html',
  styleUrls: ['./encode.component.css']
})
export class EncodeComponent {
  public service!: UploadComponent;
  input = "";
  message! :string;
  
  constructor(
    public dialog: MatDialogRef<EncodeComponent>, private httpClient: HttpClient, private dialogClose: MatDialog
    ){
      hide: true;
      console.log("new instance")
    }
  
  openEncodeClose() {
    console.log(this.input.length)
    if (this.input.length > 0){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
  
      let dialogRef = this.dialogClose.open(EncodeCloseComponent, dialogConfig);
      dialogRef.componentInstance.encodeComp = this;
    }
    else{
      this.dialog.close();
    }
    
  }

  openEncodeSave() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
  
    let dialogRef = this.dialogClose.open(EncodeSaveComponent, dialogConfig);
    dialogRef.componentInstance.encodeComp = this;
    
  }
    
  save() {
    console.log(this.input)
    this.service.formData.delete("imagetext");
    this.service.formData.append("imagetext", this.input);
    this.service.getEncoded().subscribe((rslt:Object)=>{
      this.message = JSON.stringify(rslt);
      console.log(this.message)
    }) 
    this.dialog.close();
  }

  close() {
    this.dialog.close();
  }
}
