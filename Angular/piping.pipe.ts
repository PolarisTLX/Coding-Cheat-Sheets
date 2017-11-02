// PIPES - Just means modifiers / filters to strings and numbers

// file:  courses.component.ts:

import { CoursesService } from './courses.service';

import { Component } from '@angular/core';

// declerator function:
@Component({
  selector: 'courses',

  template: `
    {{ course.title | uppercase }} <br/>
    {{ course.students | number }} <br/>
    {{ course.rating | number:'2.2-2' }} <br/>
    {{ course.price | currency:'CAD':true:'3.2-2' }} <br/>
    {{ course.releaseDate | date:'shortDate' }} <br/>
  `
})
export class CoursesComponent {
    course = {
      title: "The Complete Angular Course",
      rating: 4.9745,
      students: 30123,
      price: 190.95,
      releaseDate: new Date(2016, 3, 1)
    }
}




/* CUSTOM PIPING

the component file example:
*/

import { Component } from '@angular/core';

@Component({
  selector: 'courses',

  template: `
    {{ text | summary:10 }}
  `
})
export class CoursesComponent {
  text = `Lorem ipsum dummy text is very long. It has been around since 1500s.`;
}

/*
Creating a custom pipe / modifyer / filter requres a new kind of file:
pipename.pipe.ts:
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})

export class SummaryPipe implements PipeTransform {
  transform(value: string, limit?: number) {
    if (!value) {
      return null;
    }
    let actualLimit = (limit) ? limit : 50;
    return value.substr(0, actualLimit) + '...';
  }
}


/*
and changes to  app.module.ts:
1.  add to the top:
import { SummaryPipe } from './summary.pipe';
2. add to the declerations: [
                 ---,
                 SummaryPipe
              ],

*/
