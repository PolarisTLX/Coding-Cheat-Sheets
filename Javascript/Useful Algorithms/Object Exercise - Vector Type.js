A vector type - Eloquent JavaScript Chapter 6 - Objects - Exercise 1

Write a constructor Vector that represents a vector in two-dimensional space.
It takes x and y parameters (numbers), which it should save to properties of the same name.

Give the Vector prototype two methods, plus and minus,
that take another vector as a parameter and return a new vector
that has the sum or difference of the two vectors’ (the one in this and the parameter) x and y values.

Add a getter property length to the prototype that computes the length of the vector—
which is the distance of the point (x, y) from the origin (0, 0).

Your solution can follow the pattern of the Rabbit constructor from this chapter quite closely.

Adding a getter property to the constructor can be done with the Object.defineProperty function. To compute the distance from (0, 0) to (x, y), you can use the Pythagorean theorem, which says that the square of the distance we are looking for is equal to the square of the x-coordinate plus the square of the y-coordinate. Thus, √(x2 + y2) is the number you want, and Math.sqrt is the way you compute a square root in JavaScript.


    console.log(new Vector(1, 2).plus(new Vector(2, 3)));
    // → Vector{x: 3, y: 5}
    console.log(new Vector(1, 2).minus(new Vector(2, 3)));
    // → Vector{x: -1, y: -1}
    console.log(new Vector(3, 4).length);
    // → 5


//My solution:
CONSTRUCTOR:
function Vector(x, y) {
  this.x = x;
  this.y = y;
/* get length() {
     return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
   } */
   // can't add getter to a constuctor like that, only to an object
}

To add the GETTER to the constructr:

Object.defineProperty(Vector.prototype, "length", {
  get: function() { return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2)); }
});


Vector.prototype.plus = function(newCoord) {
  this.x += newCoord.x;
  this.y += newCoord.y;
  return new Vector(this.x, this.y);
}
Vector.prototype.minus = function(newCoord) {
  this.x -= newCoord.x;
  this.y -= newCoord.y;
  return new Vector(this.x, this.y);
}
