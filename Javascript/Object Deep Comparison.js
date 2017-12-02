DEEP OBJECT COMPARISON

NOTES from the chapter on this:

with objects, there is a difference between having two references to the same object
and having two different objects that contain the same properties. Consider the following code:

var object1 = {value: 10};
var object2 = object1;
var object3 = {value: 10};

console.log(object1 == object2);
// → true
console.log(object1 == object3);
// → false
object1.value = 15;
console.log(object2.value);
// → 15    //NOTE object2 is now ALSO changed to 15
The object1 and object2 variables grasp the same object, which is why changing object1 also changes the value of object2.

JavaScript’s == operator, when comparing objects, will return true only if both objects are precisely the same value.
Comparing different objects will return false, even if they have identical contents.




Eloquent JavaScript Book, Chapter 4, Exercize 4.


The == operator compares objects by identity.
But sometimes, you would prefer to compare the values of their actual properties.

1. Write a function, deepEqual, that takes two values and returns true
only if they are the same value or are objects with the same properties
whose values are also equal when compared with a recursive call to deepEqual.

To find out whether to compare two things by identity (use the === operator for that)
or by looking at their properties, you can use the typeof operator.
If it produces "object" for both values, you should do a deep comparison.

(But you have to take one silly exception into account: by a historical accident:
typeof null also produces "object".)

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true

function deepEqual(a, b){
  // console.log(a.object);
  // console.log(b.object);

  if ( a === b ) {   return true;  }

  if (a == null || b == null || typeof a !="object" || typeof b !="object") {
    return false;  }

  // I don't get much of this below:
  // counting the number of properties in the objects?
  var propsInA = 0, propsInB = 0;

  for (var prop in a) {
    propsInA += 1;
    console.log(prop);
  }
  console.log(propsInA); // 2 (they are "here" and "object")

  for (var prop in b) {
    propsInB += 1;
    console.log(prop);
    //below does it exists in a as well?
    if (!(prop in a) || !deepEqual(a[prop], b[prop])) {  // recursion to go a level deeper
      return false;
    }
  }
  console.log(propsInB);
  return propsInA == propsInB;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// wih the code written with the console.logs inside as above,
//the output is:
/*
here     first prop of a is "here"
object   second prop of a is "object"
2        there are 2 props in a
here     first prop in b is "here"
         recursion occurs with (a."here", b."here")
is       first prop in a."here" is "is"
1        there is 1 prop in a."here"
is       first prop in b."here" is "is"
         ?recursion occurs with (a."is", b."is"), but no props here
1        ???
object   ???
2        there are 2 props in b
true     propsInA = 2 & propsInB = 2
*/


//to explain it from Stack Overflow:
/*
It's checking to make sure that the property it's found in b is also a property in a, and that the values of both properties are the same.
pseudo code:

  goDeeper(folder) {
    childFolders = findAllFolderInFolder(folder);
    if (!childFolders) {
      alert('found the deepest Folder: ' + folder);
      return;
    } else
      childFolders.forEach(goDeeper); // Call goDeeper for each folder in this folder...
  }

  goDeeper('/'); // It will go through all the filesystem, and each time it finds an end it
  //NOTE I don't think that the "/" is applicable to the book's exercise, is it's not actually folders.
*/
