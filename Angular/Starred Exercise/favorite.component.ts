import { Component } from '@angular/core';

// declerator function:
@Component({

  selector: 'isFavorite',

  template: `
    <span
       (click)="starFill()"
       [class]="isEmpty ? 'glyphicon glyphicon-star-empty' : 'glyphicon glyphicon-star'"
       style="font-size: 50px;">
    </span>
  `
})
export class CoursesComponent {
  isEmpty = true;
  starFill() {
    console.log('Star has been clicked');
    this.isEmpty = !this.isEmpty;
  }
}
