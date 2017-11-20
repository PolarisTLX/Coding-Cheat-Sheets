/* //BOOTSTRAP EXAMPLE:

// requires in CP:
npm install bootstrap --save

//and in file style.css, need to type:
@import "~bootstrap/dist/css/bootstrap.css";
*/

import { Component } from '@angular/core';

@Component({
  selector: 'courses',

  template: ` <button class="btn btn-primary">Save</button> `,
  // NOTE it is BACKTICKS ABOVE!!
  styleUrls: ['./name.component.css']
})

export class CoursesComponent {
  title = "List of courses";
  courses = ["course1", "course2", "course3"];
}
