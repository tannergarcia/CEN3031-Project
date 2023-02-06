import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {FormGroupDirective} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'input-boxes',
  templateUrl: './input-boxes.component.html',
  styleUrls: ['./input-boxes.component.css'],
})
export class InputBoxesComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
}
