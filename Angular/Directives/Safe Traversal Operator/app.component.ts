import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})

export class AppComponent {
    task = {
      title: 'Review applications',
      // assignee: {
      //   name: 'John Smith'
      // }
      assignee: null
    }
}
