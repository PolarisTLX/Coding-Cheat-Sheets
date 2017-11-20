// SHOW / HIDE div based on criteria with
//  *ngIf and ng-template   --OR--   [hidden]

import { Component } from '@angular/core';

@Component({
  selector: 'app.root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses = [1, 2];
}
