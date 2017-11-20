import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {

  log(x) { console.log(x); }

/* below, (f) is from contact-form.component.html:
   <form #f="ngForm"... */

  submit(f) {
    //console.log(f);
    //console.log(f.invalid);
    // console.log(f.value);
    console.log(f.value.firstName);
    //f.valid;
    //f.invalid;
    //f.value;
    //f.value.firstName;   //etc...
  }

  contactMethods = [
    { id: 1, name: 'Email' },
    { id: 2, name: 'Phone' },
    { id: 3, name: 'LinkedIn' },
  ];

}
