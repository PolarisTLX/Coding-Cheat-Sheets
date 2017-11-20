//  THIS FILE is not working with all the other files of this component

import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidators {
  static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    // if no error above, just return "null"
    return null;
  }

  static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {

    return new Promise((resolve, reject) => {

        // without call to server simulation:
        /* if (control.value === 'Polaris') {
           return { shouldBeUnique: true };
           }
           return null;
        */

        // to simulate a call to a server & asyncronous operation, with a delay:
        // with call to server simulation
        setTimeout(() => {
            console.log('2 second delay');
            if (control.value === 'Polaris') {
              resolve({ shouldBeUnique: true });
            } else {
              resolve(null);
            }
        }, 2000);

    });
  }
}
