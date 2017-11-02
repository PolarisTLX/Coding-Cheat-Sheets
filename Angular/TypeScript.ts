/*
A special type of Type in typscript is an "enum"

enum Color { Red = 0, Green = 1, Blue = 2, Purple = 3 }
let backgroundColor = Color.Red;


which is a much cleaner way to do what in Javascript would require:

var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
    Color[Color["Purple"] = 3] = "Purple";
})(Color || (Color = {}));
var backgroundColor = Color.Red;

to do the same thing
*/



/*
Type assertions:

let message;
message = 'abc';

//Method 1 (most common):
let endsWithC = (<string>message).endsWith('c');

//Method 2 (less often used):
let alternativeWay = (message as string).endsWith('c');

*/

/*
// custom types:
let drawPoint = (x, y) => {
  // ...
};

// instead of passing manny parameters (x, y, z, q, ,d, e...):
interface Point {
  x: number,
  y: number
}

let drawPoint2 = (point: Point) => {
  // ...
};

drawPoint2({
  x: 1,
  y: 2
});
*/

/*
// class method is better and replaces all above:
class Point {
  x: number;
  y: number;


  //  this is called a mthod:
  draw() {
    console.log('X: ' + this.x + ', Y: ' + this.y);
  }
  getDistance(another: Point) {
    // ...
  }
}

//  this "point" below is an Object, which is an instance of a Class
let point = new Point();
point.x = 1;
point.y = 2;
point.draw();
*/


/*
//  CONSTRUCTORS (to save you lines at the bottom):

class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
  //constructor(x?: number, y?: number) {
  //  the ? marks means those parameters are optional
  // for cases when those values may not be known yet
    this.x = x;
    this.y = y;
  }

  draw() {
    console.log('X: ' + this.x + ', Y: ' + this.y);
  }
}

//  this is an Object, which is an instance of a Class
let point = new Point(1, 2);
//  let point = new Point();
//  if there are ? marks above, then don't need to specify the values, in this case (1, 2) for X and Y, right away
point.draw();
*/


/*
// Access Modifyers and Constructor Parameters
// to reduce amount of code required to write:
// example below has 4 lines less

class Point {

  //private x: number;  //moved below:
  //y: number;

  constructor(private x?: number, private y?: number) {
  // typescript does the below automcatically if you provide the access modifyers liek above:
  //  this.x = x;
  //  this.y = y;
  }

  //  this is called a mthod:
  draw() {
    console.log('X: ' + this.x + ', Y: ' + this.y);
  }
}

let point = new Point(1, 2);
point.draw();

*/


/*
Properties

They look like functions but have an extra space:
// normal functions/methods:
getX() {
  return this.x;
}

let x = point.getX();
point.setX(10);



// versus Properties:
get X() {
  return this.x;
}

let x = point.X;
point.X = 10;

// cleaner syntax as there is no need to call methods like first example.

*/


// Modules

// all code below moved to point.ts
// and "export" is added to the front of the class
/*
class Point {
  constructor(private x?: number, private y?: number) {
  }

  draw() {
    console.log('X: ' + this.x + ', Y: ' + this.y);
  }
}
*/

/*
// this line is added:
import { Point } from './point';

let point = new Point(1, 2);
point.draw();
*/
