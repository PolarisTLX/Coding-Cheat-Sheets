import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})

export class AppComponent {
  courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'} ];


    onAdd() {
      this.courses.push({ id: 4, name: 'course4'});
    }

    removeButton(course) {
    // must have a variable passed TO this function to be able to specify which item to act on!
      let courseIndex = this.courses.indexOf(course);
      this.courses.splice(courseIndex, 1);
      // go to that index, and delete 1 item starting from that location
    }

    modifyContent(course) {
      course.name = 'UPDATED';
    }

    lectures;

    loadLectures() {
      this.lectures = [
        { id: 1, name: 'lecture1'},
        { id: 2, name: 'lecture2'},
        { id: 3, name: 'lecture3'} ];
    }

    // THIS IS TO REDUCE MEMORY/RESOURCE when dealing with LARGE lists
    // use ONLY for LARGE lists!!
    trackCourse(index, lecture) {
      lecture ? lecture.id : undefined;
    }
}
