import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { PasswordValidators } from './password.validators'

@Component({
  selector: 'change-password-reactive',
  templateUrl: './change-password-reactive.component.html',
  styleUrls: ['./change-password-reactive.component.css']
})
export class ChangePasswordReactiveComponent {

  form: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      // oldPassword: ['', Validators.required],
      // async validators added:
      oldPassword: ['', Validators.required, PasswordValidators.validOldPassword],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    // });   // adding "extra", in this case, the matching validator:
    }, {
      validator: PasswordValidators.passwordsShouldMatch
    });
  }

  // to make variables in the html file shorter:
  /*<div
    *ngIf="oldPassword.touched && oldPassword.invalid"
    class="alert alert-danger">
  </div>
  */
  get oldPassword() { return this.form.get('oldPassword'); }
  get newPassword() { return this.form.get('newPassword'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }


}
