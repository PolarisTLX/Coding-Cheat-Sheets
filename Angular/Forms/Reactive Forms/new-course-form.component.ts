import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrls: ['./new-course-form.component.css']
})
export class NewCourseFormComponent {

  // 2nd part of this lecture replaces all these lines with a simpler version seen below
  /*
  form = new FormGroup({
    // 2nd part of this lecture:
    name: new FormControl('', Validators.required),
    contact: new FormGroup({
        email: new FormControl(),
        phone: new FormControl()
    }),
    // end of 2nd part of lecture
    // back to 1st part of this lecture:
    topics: new FormArray([])
  });
  */

  // 2nd part of this lecture:
  // replaces the code above to be a little bit cleaner/simpler
  form;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      contact: fb.group({
        email: [],
        phone: []
      }),
      topics: fb.array([])
    });
  }
  // end of 2nd part of lecture

  addTopic(topic: HTMLInputElement) {
    // (this.form.get('topics') as FormArray).push(new FormControl(topic.value))
    // simplified/shortened with "topics() method/function below"
    this.topics.push(new FormControl(topic.value))
    // clear the user input field after each occurance
    topic.value = '';
  }

  get topics() {
    return this.form.get('topics') as FormArray;
  }

  // this was make into a click event from the .html file
  // to allow each item to be removed when clicked on
  removeTopic(topic: FormControl) {
    let locationOfTopic = this.topics.controls.indexOf(topic);
    this.topics.removeAt(locationOfTopic);
  }
}
