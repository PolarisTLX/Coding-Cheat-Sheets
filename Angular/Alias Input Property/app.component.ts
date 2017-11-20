import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  //this word "post" is needed WITHIN the element that is in app.component.html
  post = {
    title: 'Title',
    isFavorite: true
  };
}
