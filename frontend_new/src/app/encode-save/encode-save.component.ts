import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EncodeComponent } from '../encode/encode.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-encode-save',
  templateUrl: './encode-save.component.html',
  styleUrls: ['./encode-save.component.css']
})
export class EncodeSaveComponent {
  public encodeComp!: EncodeComponent;
  service = ProfileComponent;

  constructor(
    public dialog: MatDialogRef<EncodeSaveComponent>
    ){}

  closeAll() {
    this.dialog.close();
    this.service.selectedIndex = 0;
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
