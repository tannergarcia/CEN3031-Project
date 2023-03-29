import { Component } from '@angular/core';
import { EncodeComponent } from '../encode/encode.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialogActions} from '@angular/material/dialog';

@Component({
  selector: 'app-encode-close',
  templateUrl: './encode-close.component.html',
  styleUrls: ['./encode-close.component.css']
})
export class EncodeCloseComponent {
  public encodeComp!: EncodeComponent;

  constructor(
    public dialog: MatDialogRef<EncodeCloseComponent>
    ){}

  closeAll() {
    this.dialog.close();
    this.encodeComp.close();
  }

  close() {
    this.dialog.close();
  }

}
