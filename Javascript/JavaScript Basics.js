Many languages will stop you, or at least warn you,
when you are defining a variable with a name that is already taken.
JavaScript does not, so need to be careful.


A program is built out of statements, which themselves sometimes contain more statements.
Statements tend to contain expressions, which themselves can be built out of smaller expressions.
Putting statements after one another gives you a program that is executed from top to bottom.

Type Coercion / Automatic Type Conversion:

When Javascript is supplied incompatible balue types,
it quietly tries to convert them to being compatible.
This doesnt always work well:

console.log(8 * null);  // 0
console.log("5" - 1);   // 4
console.log("5" + 1);   // 51
console.log("five" * 2);  //  NaN
console.log(false == 0);  //  true


"===" (compare while being strict with the type):

console.log( 0 === false); // false



null / undefined / infinity / NaN / false:
3 values that are considered "numbers" in JS but dont behave like normal numbers:
    1. Infinity
    2. -Infinity
    3. NaN

//NOTE Infinity must be written with a capital I!!
console.log(Infinity == Infinity);  // true
console.log(Infinity == infinity);  // Error


console.log(null == undefined);  // true
console.log(null == 0);    // false
console.log("" == false);  // true
console.log(0 == false);   // true

console.log(NaN == NaN);   // false
(This is the only value in JS that is not equal to itself. Because a nonsensical computation is not equal to another nonsensical computation)
console.log(NaN != NaN);   // true


How to get NaN?
Any numeric operation that doest yield precise numeric results:
console.log(0 / 0);  //NaN
console.log(Infinity / Infinity);  //NaN


Most operators are binary (they take 2 values to complete their "function"):
Examples:

Unary Operators:  (takes only 1 value to complete their "function"):
"typeof"
console.log(typeof  "x");    // string
console.log(typeof  8);      // number
console.log(typeof  false);  // boolean
console.log(typeof  yes);    // undefined (booleans are only true or false)

Ternary Operator (takes 3 values to complete their "function")
there is only one example of this, it is the  " ? : "
true ? 1 : 2




"Escaping the character" with backslash (\):
To include a '' or "" inside of another string:
'That don't impress me much'  (does not work)
'vs
'That don\'t impress me much'  (works)

Newline character: \n:
"This is the first line\nThis is the second line".
// "This is the first lines
// This is the second line."

If two \\ follow each other, tey collapse together:
"A newline character is written like \"\\n\" properly."
gives result:
"A newline character is written like "\n" properly."

Otherwise:
"A newline character is written like "\n" properly."
gives result:
X Uncaught SyntaxError: Invalid


Letters/strings can be compared, since all characters are given an internal asigned number for Unicode:
"b" is higher (comes after) "a" in this order.
console.log("a" < "b");
console.log("A" < "B");
console.log("Andrew" < "Mandrew"); // true
console.log("Andrew" < "Bndrew"); // true

//NOTE - Had this wrong before!
Uppercase letters come BEFORE??? lowercase letters in this order:
"A" is lower (comes before) "a" in this order.
console.log("APPLE" < "apple");  // true
console.log("a" > "A");  // false
console.log("b" > "A");  // true!!!
console.log("b" < "A");  // false!!!


Operator Order Of Precence / order of execution:
||  has the lowest precedence (executed last)

(paretheses)  -->   "* / %"  -->  "+ -"    -->   (comparisons (>, >=, ==, != ..)  -->   &&   -->   ||



When you call on a variable that has not been assigned a value, it returns "undefined"
var tricycle = 3;
console.log(tricycle); // 3
var bicycle;
console.log(bicycle); // undefined

defining multiple values at a time with one statement, simply use a comma:
var one = 1, two = 2, three = 3;


//Not very useful?
an alternative to the browser popup "alert("good morning");"
can be confirm("Do you accept?");  //this has a pop up with TWO buttons, Cancel and ok
can be prompt("How do you plea?", "...");  //this is same as Confirm, but with a text input field first

var pickedNumber = Number(prompt("Pick a number", ""));
alert("Your number x 3 is: " + pickedNumber * 3);

Only doing this if the number typed is a valid number:
if(!isNaN(pickedNumber));
if(!isNaN(pickedNumber)) { alert("That's a valid number!"); } else { alert("That's not a valid number!"); }

curly braces {}  they are ACTUALLY only needed if an if or else statement has more than one statement to perform.
most use them at all times since you may need to add more statements later, thus would need to add curly braces.



do/while loop is basically a while loop that will perform the first action at least once, regardless of if a further condition is met or not.
This example will prompt once, and then keep prompting until the user provides a response:
    do {
      var yourName = prompt("Who are you");
    } while (!yourName);
    console.log(yourName);


// looking at the for loop, you can take out the middle state as so if you like. It does the same thing:
// (not that it's desireable)
for (var current = 20; current % 7 ==0; current++) {
}
console.log(current);
// OR :
for (var current = 20; ; current++) {
  if (current % 7 == 0)
    break;
}
console.log(current);
// → 21

The "continue" keyword is similar to "break",
in that it influences the progress of a loop.
When continue is encountered in a loop body, control jumps out of the body
 and continues with the loop’s next iteration.

 FUNCTIONS:

 The function keyword, when used as an expression, can create a function value.
 When used as a statement, it can be used to declare a variable and give it a function as its value.

 // Create a function value f
 var f = function(a) {
   console.log(a + 2);
 };

 // Declare g to be a function
 function g(a, b) {
   return a * b * 3.5;
 }


 The return keyword without an expression after it will cause the function to return undefined.

 This “localness” of variables applies only to the parameters and to variables declared with the var keyword inside the function body.
 EX:
      var x = "outside";

      var f1 = function() {
        var x = "inside f1";  //<-- "var", no it affects nothing out side of function
      };
      f1();
      console.log(x); // → outside

      var f2 = function() {
        x = "inside f2";   //<-- no "var"
      };
      f2();
      console.log(x); // → inside f2


var square = function(x) {}
is the same as
function square(x) {}  //function decleration
// except function declerations are not part of the "top-to-bottom" flow of code
// they are run through at the top of their scope and can be used by all code below it (within that scope)
// NOTE ONLY use this method (function-decleration) in the OUTERMOST block of your program

// BAD EXAMPLE:
function exampleA() {
  function exampleB() {} // Not great
  if (...) {
    function exampleC() {} // Danger!
  }
}

// Proper example (I think):
function exampleA() {
  var exampleB = function() {} // Not great
  if (...) {
    var exampleC = function() {} // Danger!
  }
}


ARGUMENTS object:
Whenever a function is called, a special variable named "arguments"
is added to the environment in which the function body runs.
This variable refers to an object that holds all of the arguments passed to the function.

The arguments object has a .length property for the number of arguments that were passed to that function.
It also has a property for each argument, named 0, 1, 2, and so on.

If that sounds a lot like an array to you, you’re right.
But this object, unfortunately, does not have any array methods (like slice or indexOf),
so it is a little harder to use than a real array.

function argumentCounter() {
  console.log("You gave me", arguments.length, "arguments.");
}
argumentCounter("String1", "String2", "String3");
// You gave me 3 arguments.

FUNCTION OPTIONAL ARGUMENTS::

JavaScript is extremely broad-minded about the number of arguments you pass to a function.
If you pass too many, the extra ones are ignored.
If you pass too few, the missing parameters simply get assigned the value "undefined".

The following code is allowed and executes without any problem:

alert("Hello", "Good Evening", "How do you do?");
The function alert officially accepts only one argument.
Yet when you call it like this, it doesn’t complain.
It simply ignores the other arguments and shows you “Hello”.

Example: Providing too few arguments:
The function below can be called either with two arguments or a single argument,
in which case the exponent is assumed to be = 2

function power(base, exponent) {
  if (exponent == undefined)
    exponent = 2;
  var result = 1;
  for (var count = 0; count < exponent; count++)
    result *= base;
  return result;
}

console.log(power(4));    // → 16
console.log(power(4, 3)); // → 64



console.log outputs all of the values it is given.
console.log("R", 2, "D", 2);  // → R 2 D 2


CLOSURE (Weird seemingly unimportant concept):
Everything within a function is dealt with independently for each time it is called.
The first call does no permanent changes that affect the next call  to that same function. (I think)

"Being able to reference a specific instance of local variables in an enclosing function—
is called closure. A function that “closes over” some local variables is called a closure.
This behavior not only frees you from having to worry about lifetimes of variables."

      function wrapValue(n) {
        return n;
      }

      var wrap1 = wrapValue(1);
      var wrap2 = wrapValue(2);
      console.log(wrap1());  // → 1
      console.log(wrap2());  // → 2
      console.log(wrap1());  // → 1

RECURSION vs LOOPING:
Calling a function within itself, effectively looping another turn through it's code.
It basically acheives the same as LOOPING,
BUT LOOPING IS MUCH LESS RESOURCE INTENSIVE (approx 10 times faster than recursion).
{} (just to return color to notes)

Recursion example:

      function power(base, exponent) {
          return base * power(base, exponent - 1);
      }

      console.log(power(2, 3));  // → 8


A "PURE" FUNCTION:
A pure function is a specific kind of value-producing function that not only has no side effects,
 but also doesn’t rely on side effects from other code—for example,
 it doesn’t read global variables that are occasionally changed by other code.
 A pure function has the pleasant property that, when called with the same arguments,
 it always produces the same value (and doesn’t do anything else).



ARRAYS and OBJECTS:
Almost all JavaScript values have properties.
The exceptions are null and undefined.

If you try to access a property on one of these nonvalues, you get an error:

      null.length;
      // → TypeError: Cannot read property 'length' of null


Arrays, are just a kind of object specialized for storing sequences of things.
If you evaluate typeof [1, 2], this produces "object".
You can see them as long, flat octopuses with all their arms in a neat row, labeled with numbers.


value.x  VS  value[x] to access a property value:
They don't necessarily return the same property.
The difference is in how x is interpreted.

When using value.x,  "x" must directly name a valid property.
When using value[x], "x" is evaluated to get the property name.
value[x] tries to evaluate "x" and uses the result as the property name.

So if you know that the property you want is called “length”,
you say value.length.

If you want to extract the property named by the value held in the variable "i", you say value[i].
(The index of that property name, its positioning, i, in the object?)


// NOTE: because property names can be any string, if you want to access a property named “2” or “John Doe”,
// you must use square brackets: value[2] or value["John Doe"].
// This is the case even though you know the precise name of the property in advance,
// because neither “2” nor “John Doe” is a valid variable name and so cannot be accessed through dot notation.


curly braces have two meanings in JavaScript. At the start of a statement, they start a block of statements.
In any other position, they describe an object.

    var descriptions = {
      work: "Went to work",
      "touched tree": "Touched a tree"
    };

    compared to a function() {  //I think?
      ...
    }


Reading a property that doesn’t exist will produce the value undefined

      var day1 = {
        squirrel: false,
        events: ["work", "touched tree", "pizza", "running",
                 "television"]
      };
      console.log(day1.squirrel);
      // → false
      console.log(day1.wolf);
      // → undefined
      day1.wolf = false;
      console.log(day1.wolf);
      // → false

It is possible to assign a value to a property expression with the = operator. This will replace the property’s value if it already existed
or create a new property on the object if it didn’t.


var anObject = {left: 1, right: 2};
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
console.log("left" in anObject);
// → false
console.log("right" in anObject);
// → true

The binary in operator, when applied to a string and an object,
returns a Boolean value that indicates whether that object has that property.
The difference between setting a property to undefined and actually deleting it is that,
in the first case, the object still has the property
(it just doesn’t have a very interesting value),
whereas in the second case the property is no longer present and in will return false.



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



The MATH OBJECT:
The Math object is a bag of number-related utility functions,
such as Math.max (maximum), Math.min (minimum), and Math.sqrt (square root).

The Math object is used simply as a container to group a bunch of related functionality.



THE GLOBAL OBJECT:

Stored in the "window" variable.

The global scope, the space in which global variables live,
can also be approached as an object in JavaScript.
Each global variable is present as a property of this object.
In browsers, the global scope object is stored in the window variable.

var myVar = 10;
console.log(window.myVar);
//  10
console.log("myVar" in window);
//  true
