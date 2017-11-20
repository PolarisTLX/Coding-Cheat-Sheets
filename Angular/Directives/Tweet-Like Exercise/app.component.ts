// this file is in the wrong location, one folder too deep, just to preserve the lesson as a whole

import { TweetLikesComponent } from './tweet-likes/tweet-likes.component';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  //this word "tweet" is needed WITHIN the element that is in app.component.html
  tweet = {
    title: 'Title',
    isFavorite: false,
    likesCount: 41
  };

  // Simpler example for just STYLE:
  canSave = true;
}
