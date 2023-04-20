import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DecodeComponent } from '../decode/decode.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-decode-save',
  templateUrl: './decode-save.component.html',
  styleUrls: ['./decode-save.component.css']
})
export class DecodeSaveComponent {
  public encodeComp!: DecodeComponent;
  service = ProfileComponent;

  constructor(
    public dialog: MatDialogRef<DecodeSaveComponent>
    ){}

  closeAll() {
    this.dialog.close();
    this.service.selectedIndex = 0;
    this.service.text = "New";
    this.encodeComp.service.hide = true;
    this.encodeComp.service.fileName = '';
    this.encodeComp.service.formData = new FormData;
  }

  close() {
    this.dialog.close();
    this.encodeComp.service.hide = true;
    this.encodeComp.service.fileName = '';
    this.encodeComp.service.formData = new FormData;
  }
}
