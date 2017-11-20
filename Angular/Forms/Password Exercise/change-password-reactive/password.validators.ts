import { AbstractControl } from '@angular/forms';

export class PasswordValidators {
  // this file is just for the async validator,
  // to create a delay, to simulate a call to a server
  static validOldPassword(control: AbstractControl) {
    return new Promise((resolve) => {
      if (control.value !== '1234') {
        resolve({ invalidOldPassword: true });
      } else {
        resolve(null);
      }
    });
  }


  static passwordsShouldMatch(control: AbstractControl) {
    let newPassword = control.get('newPassword');
    let confirmPassword = control.get('confirmPassword')

    if (newPassword.value !== confirmPassword.value) {
      return { passwordsShouldMatch: true };
    } else {
      return null;
    }
  }

}
