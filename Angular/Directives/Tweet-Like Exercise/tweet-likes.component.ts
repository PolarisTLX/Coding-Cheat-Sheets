import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'tweetlikes',
  templateUrl: './tweet-likes.component.html',
  styles: [ `.glyphicon:hover {
               cursor: pointer;
              }`]
})
export class TweetLikesComponent {

  @Input('isFavorite') isSelected: boolean;
  @Input('likesCount') likesCount: number;

  // likesCount = 0;

  onClick() {

    this.likesCount += (this.isSelected) ? -1 : 1;

    this.isSelected = !this.isSelected;

    // this.isSelected ? this.likesCount++ : this.likesCount--;

    /* //this simpler but longer version of above:
    if (this.isSelected) {
      this.likesCount++;
    } else {
      this.likesCount--;
    }*/
  }
}
