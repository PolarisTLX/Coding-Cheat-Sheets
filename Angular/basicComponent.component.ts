/*
Angular components filenames convention is:
courses.component.ts
course-forms.component.ts
*/

/*
To quickly create a component with it's own new folder and all of it's needed files:
in CP type: ng g c component-name
(stands for ng generate component component name)
*/

import { Component } from '@angular/core';

// declerator function:
@Component({
  selector: 'courses',                     //<<<----  THIS SELECTOR NEEDS TO GO IN THE app.component.html  as "<courses>" in this case to display in the browser
  // so select from the HTML: <courses>    // IF YOU CHANGE OR ADD COMPONENTS TO YOUR FILE YOU MUST KEEP CHANGING what is in the app.component.html
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
  courses = ["course1", "course2", "course3"];
}

/*
//Another example:

template: `
    <h2>{{ "Title: " + title }}</h2>
    <img src="{{ imageUrl }}" />
    <img [src]="imageUrl" />
`
})
// NOTE it is BACKTICKS ABOVE!!

/* Note <img [src]="imageUrl" /> with the []  is called "property binding"
with the {{ }} is called interpolation
They do the same thing,
and interpolation actually get converted intothe [] method behind the scenes
*/


/* //BOOTSTRAP EXAMPLE:
template: `
  <button class="btn btn-primary">Save</button>
`
// requires in CP:
npm install bootstrap --save
//and in file style.css, need to type:
@import "~bootstrap/dist/css/bootstrap.css";
*/

export class CoursesComponent {
title = "List of courses";
imageUrl = "http://lorempixel.com/400/200";
}
*/

/*
// Class Binding Example
// (to change classes of elements based on coded scnearios)

template: `
  <button class="btn btn-primary" [class.active]="isActive">Save</button>
`
})

export class CoursesComponent {
isActive = true;  // this adds the active class to the button above
// in the browser inspecting this element would show it having an additional class
// if it was "false" that extra class would not be there
}
*/

/*
// Style Binding Example
// (to change CSS style of elements based on coded scenarios)

template: `
  <button [style.backgroundColor]="isActive ? 'blue' : 'white'">Save</button>
`
})

export class CoursesComponent {
isActive = true;
}
// if true, the button's background will be blue, else it will be white
*/


/*
//EVENT BINDING EXAMPLE
//for clicks / mouse move / keydown events

template: `
  <button (click)="onSave()">Save</button>
`

export class CoursesComponent {
  onSave() {
    console.log('Button was clicked');
  }
}

// CAN also include "$event" (is Angular reserved word) like below
// to record and catch a lot of events:

template: `
  <button (click)="onSave($event)">Save</button>
`

export class CoursesComponent {
  onSave($event) {
    console.log('Button was clicked', $event);
  }
}
*/


/*
// To demonstrate event bubbling upwards:

template: `
<div (click)="onDivClicked()">
  <button (click)="onSave($event)">Save</button>
  </div>
`
})

export class CoursesComponent {
onDivClicked() {
  console.log('Div was clicked');
}
onSave($event) {
  console.log('Button was clicked', $event);
}
}

when you click the button, the console will show:
'Button was clicked'
Then
'Div was clicked' (which is the parent element above it / holding it)

// $event.stopPropagation();  stops the bubbling like so:

onSave($event) {
  $event.stopPropagation();
  console.log('Button was clicked', $event);
}

*/



/*
// EVENT FILTERING:
// such as ONLY when the ENTER key is pressed:

// traditional JavaScript way?:

template: `
  <input (keyup)="onKeyUp($event)" />
`
})

export class CoursesComponent {
  onKeyUp($event) {
    if ($event.keyCode === 13) console.log("Enter Key was pressed");
  }
}

// Angular way is much cleaner:

template: `
  <input (keyup.enter)="onKeyUp()" />
`
})

export class CoursesComponent {
  onKeyUp() {
    console.log("Enter Key was pressed");
  }
}
*/


/*
// TEMPLATE VARIABLE:

// to capture what was typed in a field after a user presses Enter key:
// vanilla JavaScript way (without template variable):

template: `
  <input (keyup.enter)="onKeyUp($event)" />
`
})

export class CoursesComponent {
  onKeyUp($event) {
    console.log($event.target.value);
  }
}
// if user types "I have a bunch of coconuts" then presses enter,
// $event.target.value  will = "I have a bunch of coconuts"


// Angular cleaner way:
// using template variable (in this case "#usermessage")

template: `
  <input #usermessage (keyup.enter)="onKeyUp(usermessage.value)" />
`
})

export class CoursesComponent {
  onKeyUp(usermessage) {
    console.log(usermessage);
  }
}

*/

/*
// TWO-WAY BINDING:
// so that user entries can modify the original content.
// A more modern OOP way (though does not look better )

// Normal bu messy way:
template: `
  <input [value]="usermessage" (keyup.enter)="usermessage = $event.target.value; onKeyUp()" />
`
})

// Cleaner Angular Specific Way with  [(ngModel)]:
// NOTE: Must include in file " app.module.ts":
// on top: import { FormsModule } from '@angular/forms';
// and in   imports: [  BrowserModule, FormsModule],

template: `
  <input [(ngModel)]="usermessage" (keyup.enter)="onKeyUp()" />
`
})

export class CoursesComponent {
  usermessage = 'I\'ve got a bunch of coconuts';

  onKeyUp() {
    console.log(this.usermessage);
  }
}
*/


/*
// PIPES - Just means modifiers / filters to strings and numbers
// see cheat-sheet file on piping

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

*/


// END OF BASIC COMKPONENT

/*Then in the file: app.module.ts
must add details of this component in 2 places:
*/
//THIS PART SEEMS TO HAVE A PROBLEM WHEN in CP running: "ng serve"
//need to be in the right folder in CP?

import { CoursesComponent } from './courses.component';    // <<---- HERE  1 / 2
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent      // <<---- HERE  2 / 2
  ],
  imports: [
    ...
})
export class AppModule { }
