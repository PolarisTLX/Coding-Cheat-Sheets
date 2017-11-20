import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from './username.validators'

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

      // this portion is NOT working and is for Async valiation
      // the name "form" below is used at top of the html
      form = new FormGroup({
      changePass: new FormGroup({
              oldPassword: new FormControl('', [], UsernameValidators.shouldBeUnique
              ),
              // NOTE ABOVE, last one is an "async function" so needs to be outside of rest of array
              // hover over "FormControl() just above to see"
        })
      });

  // This is the function that is called when one of the entry fields are are activated
  // this function is just for troubleshooting
  log(f) {
    // console.log(f);
    console.log(f.value);
   }

/* below, (f) is from contact-form.component.html:
   <form #f="ngForm"... */

  // submit(f) {
  //   //console.log(f);
  //   //console.log(f.invalid);
  //   // console.log(f.value);
  //   // console.log(f.value.newPassword);
  //   //f.valid;
  //   //f.invalid;
  //   //f.value;
  //   //f.value.firstName;   //etc...
  // }

}
