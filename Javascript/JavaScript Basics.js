GLOBAL STANDARD METHODS IN JAVASCRIPT:
OTHER METHODS: .apply(){} and .bind() and .call() ???
JavaScript isNaN() Function  - Checks whether a value is NaN.




Many languages will stop +, or at least warn you,
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
A pure functin is a specific kind of value-producing functin that not only has no side effects,
but also doesn’t rely on side effects from other code—for example,
it doesn’t read global variables that are occasionally changed by other code.
A pure functin has the pleasant property that, when called with the same arguments,
it always produces the same value (and doesn’t do anything else).



ARROW FUNCTIONS
NEW FROM 3RD EDITION OF BOOK WHICH INCLUDES ES2015 to ES2017.

This is written as => to be a less verbose way of writting a functin.

The => basically reads as:  "this input (the arguments) produces this result (the function body)."

const power = (base, exponent) => {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}


When there is only one argument/parameter, you dont need the "()".
And when the body is only one line, you dont need the "{}" or the "return".
So these are both the same:

const square1 = (x) => { return x * x; };
const square2 = x => x * x;


When there are NO arguments/parameters provided to the functin, you need an empty "()":

const basic = () => { console.log("no arguments here!"); }


There is "almost" no reason to have both arrow functions and regular functions in the same code,
except for a minor situation, which is explained in "chapter 6" of Eloquent JS 3rd Edition.


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


FOR EACH:
forEach() is a standard method available for arrays.
Since the array is already provided as the thing the method acts on,
forEach takes only one required argument: the function() to be executed for each element.

      var numbers = [1, 2, 3, 4, 5], sum = 0;
      forEach(numbers, function(number) {
        sum += number;
      });
      console.log(sum);
      // → 15


HIGHER-ORDER FUNCTIONS:
.forEach() .map() .filter() .reduce() etc.
Writting functions for simple actions are not much worse without higher-order functions
like .reduce(). But higher-order functions start to shine when the actions get more complicated.
Such as when you need to "compose" functions.

Higher-order functions that somehow apply a function to the elements of an array
are widely used in JavaScript.
The .forEach() method is the most primitive such function(){}.
There are a number of other variants available as methods on arrays.


APPLY METHOD TO PASS ARGUMENTS:
JavaScript functions have a .apply() method.
You pass it an array (or array-like object) of arguments,
and it will call the function with those arguments.

function transparentWrapping(f) {
 return function() {
   return f.apply(null, arguments);
 };
}

That’s a useless function, but it shows the pattern we are interested in:
The function(){} it returns passes all of the given arguments, and only those arguments, to f.
It does this by passing its own arguments object to apply.
The first argument to apply, for which we are passing null here, can be used to simulate a method call.


JSON:

in JSON, All property names have to be surrounded by double quotes,
and only simple data expressions are allowed—
//no function calls, variables, or anything that involves actual computation.
Comments are not allowed in JSON.

JavaScript gives us functions, JSON.stringify and JSON.parse,
that convert data to and from this format.
JSON.stringify takes a JavaScript value and returns a JSON-encoded string.
JSON.parse takes such a string and converts it to the value it encodes.

    var string = JSON.stringify({name: "X", born: 1980});
    console.log(string);
    // → {"name":"X","born":1980}
    console.log(JSON.parse(string).born);
    // → 1980



FILTER: .filter():

To find the people in the ancestry data set who were young in 1924,
the following function filters out the elements in an array that don’t pass a test.

function filter(array, test) {
  var passed = [];
  for (var i = 0; i < array.length; i++) {
    if (test(array[i]))
      passed.push(array[i]);
  }
  return passed;
}

console.log(filter(ancestry, function(person) {
  return person.born > 1900 && person.born < 1925;
}));
// → [{name: "Philibert Haverbeke", …}, …]


This uses the argument named test, a function value, to fill in a “gap” in the computation.
The test function is called for each element,
and its return value determines whether an element is included in the returned array.



A "PURE" function does not modify the array(/data?) it is given.

MAP:  .map()
The map method transforms an array by applying a function to all of its elements
and building a new array from the returned values.
The new array will have the same length as the input array,
but its content will have been “mapped” to a new form by the function(){}.

      var numbers = [4, 9, 16, 25];
      console.log(numbers.map(Math.sqrt));
      // [2, 3, 4, 5]

REDUCE: .reduce()
.reduce() (or sometimes fold) is a higher-order operation.
That "folds" up an array, one element at a time, till there is just 1 item left.
When summing numbers, you’d start with the number zero and, for each element,
combine it with the current sum by adding the two.

This function is a little less straightforward than filter and map, so pay close attention.

The parameters to the reduce function are:
The array, A combining function and A start value:

.reduce(array, combiningFunction, start)
or
array.reduce(combiningFunction, start)

If your array contains at least one element, you are allowed to leave off the start argument.
The method will take the first element of the array as its start value and start reducing at the second element.


To use reduce to find my most ancient known ancestor, we can write something like this:

      var numbers = [65, 44, 12, 4];

      function getSum(total, num) {
        return total + num;
      }

      console.log(numbers.reduce(getSum));  // 125

      // shortened with function incorporated:
      console.log(numbers.reduce(function(total, num) {
        return total + num;
      }));


      //another example:
      console.log(ancestry.reduce(function(min, cur) {
        if (cur.born < min.born) return cur;
        else return min;
      }));
      // → {name: "Pauwels van Haverbeke", born: 1535, …}


COMBINED ARRAY HIGHER-ORDER FUNCTIONS EXAMPLE:
Example code that finds the average age for men and for women in a provided data set "ancestry".
Below we created 4 core functions: average, age, male, female

    var ancestry = [
      {"name": "Emma de Milliano", "sex": "f",
       "born": 1876, "died": 1956,
       "father": "Petrus de+ Milliano",
       "mother": "Sophia van Damme"},
      {"name": "Carolus Haverbeke", "sex": "m",
       "born": 1832, "died": 1905,
       "father": "Carel Haverbeke",
       "mother": "Maria van Brussel"}
    ];

    //not all data put here

    // function average(array) {
    //   function plus(a, b) { return a + b; }
    //   return array.reduce(plus) / array.length;
    // }
    function average(array) {
      return array.reduce(function(a, b) {
        return a + b; }
      ) / array.length;
    }

    function age(p) { return p.died - p.born; }
    function male(p) { return p.sex == "m"; }
    function female(p) { return p.sex == "f"; }

    console.log(average(ancestry.filter(male).map(age)));
    // → 61.67 (not all data provided in this example)
    console.log(average(ancestry.filter(female).map(age)));
    // → 54.56 (not all data provided in this example)

    // //NOTE that the "array" at teh top is actually:
    // ancestry.filter(male).map(age)
    //
    // could put it all into one thing if desired:
    //
    // var array = ancestry.filter(male).map(age);
    //
    // console.log(array.reduce(function(a, b) {
    //     return a + b;
    //   }) / array.length;
    // );
    //


    A program that processes an array is most elegantly expressed as a sequence of cleanly separated steps that each do something with the array and produce a new array. But building up all those intermediate arrays is somewhat expensive.

    Likewise, passing a function(){} to forEach and letting that method handle the array iteration for us is convenient and easy to read. But function calls in JavaScript are costly compared to simple loop bodies.


GLOBAL STANDARD METHODS IN JAVASCRIPT:
OTHER METHODS: .apply(){} and .bind() and .call() ???
JavaScript isNaN() Function  - Checks whether a value is NaN.




Functions derive from Function.prototype, and arrays derive from Array.prototype. objects derive from Object.prototype
All functions) automatically get a property named prototype, which by default holds a plain, empty object that derives from Object.prototype.


CONSTRUCTORS:
NOTE constructors are functions
A more convenient way to create objects that derive from some shared prototype is to use a constructor. In JavaScript, calling a function with the new keyword in front of it causes it to be treated as a constructor. The constructor will have its this variable bound to a fresh object, and unless it explicitly returns another object value, this new object will be returned from the call.
NOTE: The actual prototype of a constructor is Function.prototype since constructors are functions.

An object created with "new" is said to be an instance of its constructor(){}.



DEFINITIONS (will try to get most in one place):

  encapsulation: (distinguishing between internal complexity and external interface). One of several concepts for objects in object oriented programming, as the interface of an object is usually simpler in complexity then its internal content

  Methods: simply properties that hold functn values
  Usually a method needs to do something with the object it was called on. When a functin is called as a method—looked up as a property and immediately called, as in object.method()—the special variable this in its body will point to the object that it was called on.


FUNDAMENTALS OF OOP OBJECT ORIENTED PROGRAMING:
-Encapsulation
-Polymorphism
-Inheritance



"THIS" IN A FUNCTION:
When a functin isn’t called as a method, this will refer to the global object.
This is a bit of a flaw in ES5, but fixed in ES6?
There are workarounds. A common pattern is to say var self = this and from then on refer to self,
which is a normal variable and thus visible to inner functions.
Another solution is to use the bind method, which allows us to provide
an explicit this object to bind to.

    var test = {
      prop: 10,
      addPropTo: function(array) {
        return array.map(function(elt) {
          return this.prop + elt;
        }.bind(this));
      }
    };
    console.log(test.addPropTo([5]));

The function passed to map is the result of the bind call and thus has
its this bound to the first argument given to bind—the outer functin’s this value
(which holds the test object).

Most standard higher-order methods on arrays, such as forEach and map,
take an optional second argument that can also be used to provide a this
for the calls to the iteration function.
So you could express the previous example in a slightly simpler way:

    var test = {
      prop: 10,
      addPropTo: function(array) {
        return array.map(function(elt) {
          return this.prop + elt;
        }, this); // ← no bind, note the comma
      }
    };
    console.log(test.addPropTo([5]));
    // → [15]

This works only for higher-order functions that support such a context parameter.
When they don’t, you’ll need to use one of the other approaches.
