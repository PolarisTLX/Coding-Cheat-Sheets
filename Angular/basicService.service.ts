/*
To quickly create a service with it's own new folder and all of it's needed files:
in CP type: ng g s service-name
(stands for ng generate service service-name)
*/

export class CoursesService {
  getCourses() {
    return ["course1", "course2", "course3"]
  }
}

// END OF SERVICE FILE

/*
to use a service.ts file, must also modify component file like so:
*/

import { CoursesService } from './courses.service';    //  <<--- HERE

import { Component } from '@angular/core';

// declerator function:
@Component({
  selector: 'courses',
  // so select from the HTML: <courses>
  // the line will be:
  // selector: 'courses'

  // <div class="courses">, the line will be:
  // selector: '.courses'

  // if <div id="courses">, then:
  // selector: '#courses'

  template: `
    <h2>{{ "Title: " + title }}</h2>
    <ul>
      <li *ngFor="let course of courses">
        {{ course }}
      </li>
    </ul>
  `
  // NOTE it is BACKTICKS ABOVE!!
})

export class CoursesComponent {
  title = "List of courses";
  courses;                   //  <<--- HERE

  constructor(service: CoursesService) {    //  <<--- HERE
    this.courses = service.getCourses();    //  <<--- HERE
  }                                         //  <<--- HERE
}
