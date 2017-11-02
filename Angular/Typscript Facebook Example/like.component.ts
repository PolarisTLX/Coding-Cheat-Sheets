// EXERCISE:  Facebook "like" component:

/* more novice version:
export class LikeComponent {

  constructor(public likesCount: number, public isSelected: boolean) {
  }

  onClick() {
    if (this.isSelected) {
      this.likesCount--;
      this.isSelected = false;
    } else {
      this.likesCount++;
      this.isSelected = true;
    }
  }
}
*/

/*
// Cleaner version:
export class LikeComponent {

  constructor(public likesCount: number, public isSelected: boolean) {
  }

  onClick() {

    this.likesCount += (this.isSelected) ? -1 : 1;
    this.isSelected = !this.isSelected;
  }
}
*/

// Cleaner version that also protects against unrealistic behavior where things get tampered:
export class LikeComponent {

  constructor(private _likesCount: number, private _isSelected: boolean) {
  }

  onClick() {

    this._likesCount += (this._isSelected) ? -1 : 1;
    this._isSelected = !this._isSelected;
  }

  get likesCount() {
    return this._likesCount;
  }
  get isSelected() {
    return this._isSelected;
  }
}
