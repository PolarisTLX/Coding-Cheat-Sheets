// Eloquent JavaScript Chapter 7:
// Bugs and Error Handling:

STRICT MODE:
By putting "use strict";  at the top of a file or top of a functin,
JavaScript is a bit less assumptive of trying to guess what you might mean when you made a mistake

EXAMPLE: WHY HAVE THE "VAR =" IN A FOR LOOP:

function canYouSpotTheProblem() {
  "use strict";
  for ( i = 0 ; i < 10 ; i++ ) {
    console.log("Happy Function");
  }
}

canYouSpotTheProblem();
// ReferenceError: i is not defined
// ("var =" is missing)
// this error will not occur if "use strict" is not present

Normally when you dont put "var i = ", JS quietly solves this by creating a global variable for "i" and uses that.

So when you then type "window.i"  you will get a value of 10,
because i is now a global variable.
If you use "var i = ",  i will not be a global variable
and typing "window.i" will give "undefined".

This will cause problems if there is already exists a global variable of the same name.


STRICT MODE:
EXAMPLE: "this" keyword in a constructor

Another change in strict mode is that the this binding holds the value undefined in functions that are not called as methods.

For example, consider the following code, which calls a constructor without the new keyword so that its this will not refer to a newly constructed object:

function Person(name) { this.name = name; }
var ferdinand = Person("Ferdinand");   //forgot to put "new" Person()

console.log(name);
// Ferdinand
window.name
// "Ferdinand"

without strict mode, above the "this" will refer to a global object.

"use strict";
function Person(name) { this.name = name; }
var ferdinand = Person("Ferdinand");  //forgot to put "new" Person()
// ERROR!!!  TypeError: Cannot set property 'name' of undefined.

var ferdinand = new Person("Ferdinand");
console.log(name);
// Ferdinand
window.name
// ""


TESTING:
write a second program to test if our code works as intended when changes are made.

function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};


second testing program:

function testVector() {
  var p1 = new Vector(10, 20);
  var p2 = new Vector(-10, 5);
  var p3 = p1.plus(p2);

  if (p1.x !== 10) { return "fail: x property"; }
  if (p1.y !== 20) { return "fail: y property"; }
  if (p2.x !== -10) { return "fail: negative x property"; }
  if (p3.x !== 0) { return "fail: x from plus"; }
  if (p3.x !== 25) { return "fail: y from plus"; }

  //else
  return "everything still ok!";
}

console.log(textVector());
// everything still ok!

Can also use "testing frameworks" which is software to reduce  writting repetitive, awkward code.


DEBUGGING:

Apart from simply strategically placing console.log(); statements through your code,

The browser has built in debugging capabilities,
by setting a breakpoint (by include the "debugger" keyword statement).
This will make the browser pause the program when it reaches that statement,
to allow you inspect its state.


ERROR PROPOGATION:
How to handle invalid user inputs:

Say you have a functin that asks the user for a whole number and returns it.
What should it return if the user inputs "orange"?

One option is to make it return a special value. Common choices for such values are null and undefined.

function promptNumber(question) {
  var result = Number(prompt(question, ""));
  if (isNaN(result)) {
    // return null;
    return "That is not a valid number";
  } else { return result; }
}
console.log(promptNumber("How many trees do you see?"));



// section from Mark's place
EXCEPTIONS:

Mechanisms that make it possible for code that runs into a problem to raise (or throw) and exception, which is simply a value.
Raising an exception somehat resembles a super-charged return from a functin: it jumps out of not just the current functin,
but also out of its callers, all the way down to the first call that started the current execution.
This is called UNWINDING THE STACK.

BUT if exceptions always zoomed right down to the bottom of the stack, thery would not be much use.
This would just blow up the program.  So you set "obstacles" along the stack to "catch" the exception
as it is zooming down. This is what makes them powerful/useful, because then you can do something with it,
after which the program continues running.

Example:

    function promptDirection(question) {
      var result = prompt(question, "");
      if (result.toLowerCase() == "left") { return "L";}
      if (result.toLowerCase() == "right") { return "R";}
      // if neither of the above occurs:
      throw new Error(result + " Is an invalid direction.");
    }

    function look() {
      if (promptDirection("Which way?") == "L") {
        return "a house";
      } else {
        return "two hungry bears";
      }
    }

    try {
      console.log("You see", look());
    } catch (error) {
      console.log("Something went wrong: " + error);
    }

The "throw" keyword is what raises the exception.
Then catching it is done with the "try" keyword,
you wrap a piece of code in a "try block"
followed by the word "catch".



CLEANING UP AFTER EXCEPTIONS:

this program makes sure that an initial variable "context"
maintains its original value after the functin is done interacting with it.

    var context = null;

    function withContext(newContext, body) {
      var oldContect = context;
      context = newContext;
      var results = body();
      context = oldContext;
      return result;
    }

problem: if body raises an exception, the whole functin withContext will be thrown out of the stack,
and "context" will not regain back its original value.

solution: "try" statements also have a "finally" keyword
that can be used with or instead of the "catch" keyword

"finally" basically is "No matter what, run this code after trying to run the code in the "try" block"
even if there is an error/exception, the code in "finally" will run, thus:

    function withContext(newContext, body) {
      var oldContect = context;
      context = newContext;
      try {
        return body();
      } finally {
        context = oldContext;
      }
    }

and context will be reset no matter what.
NOTE that we no longer need to store
    var results = body();
we can just:
    return body();
"FINALLY" WILL RUN EVEN AFTER A "RETURN" STATEMENT!

now we can do:

    try {
      withContext(5, function() {
        if (context < 10) {
          throw new Error("Not enough context.");
        }
      });
    } catch (e) {
      // e = the Error was that thrown above
      console.log("Ignoring: " + e);
    }
    // -> Ignoring: Error: Not enough context.
    error was thrown


    console.log(context);
    // ->  null   (which was the original value before the function withContext was called and interacted with it)


ENDLESS FOR-LOOP THAT WILL NOT TERMINATE TILL IT GETS A VALID USER INPUT:
// WARNING: this code if done improperly can run endlessly and eat up CPU and RAM and crash the PC.

// the key here is the for (;;) {} which is a construct to create a loop that will not terminate on it's own
// this example will keep prompting a user until user provides a valid input.
// it is not a perfect example

    function promptDirection(question) {
      var result = Number(prompt(question, ""));
      if (isNaN(result)) {
        // return null;
        return "That is not a valid direction from 0-9";
      } else { return result; }
    }

    for (;;) {
      try {
        var direction = promptDirection("Where to? (please select from 0-9)");
        console.log("You chose: ", direction);
        break;
      } catch (e) {
        console.log("Not a valid direction. Try again.");
      }
    }


// OR  DONE AS JUST ONE FUNCTION (is not a perfect example)

    for (;;) {
      try {
        var direction = prompt("Where to? (please select from 0-9)", "");
        if (!isNaN(direction)) {
          console.log("You chose ", direction);
          break;
        }
      } catch (e) {
        console.log("Not a valid direction. Try again.");
      }
    }


In the chapter, is discusses on a simple typo in this code:
    prompDirection("Where to? (please select from 0-9)");
    // missing a t in prompt
will result in an "undefined vairable" error.
The catch (e) {} block wrongly treats the variable error as a bad input (user imput?).
This causes an infinite loop, and "buries" the useful error message about the typo.

As a general rule, dont blanket-catch exceptions unless its to purposely "routing" them somewhere.
Ex: over the network to tell another system that our program crashed.


SOLUTION: SELECTIVE CATCHING OF SPECIFIC EXCEPTIONS:
JavaScript has a flaw in that it doesnt provide direct support for selective catching of exceptions.

But we can achieve this by checking in the   catch (e){}  block
whether the exception we caught is the one we are interested in and by rethrowing it otherwise.

How to recognize an exception:
define a new type of error and use "instanceof" to identify it.
So below we create a kind of error we call InputError,
which is a prototype derived from Error.prototype.
and give its prototype a prototype.name

function InputError(message) {
  this.message = message;
  this.stack = (new Error()).stack;
}
InputError.prototype = Object.create(Error.prototype);
InputError.prototype.name = "InputError";


So instanceof Error will return true for InputError objects.
Its also given a name property, since the standard error types:
(Error, SyntaxError, ReferenceError), also have a name property.

Now promptDirection can throw such an error:

function promptDirection(question) {
  var result = prompt(question, "");
  if (result.toLowerCase() == "left") { return "L";}
  if (result.toLowerCase() == "right") { return "R";}
  // if nothing above stops the function (ie not a recognized input):
  throw new InputError("Invalid direction: " + result);
}

now the loop can catch it more carefully:

for (;;) {
  try {
    var direction = promptDirection("Where?");
    console.log("You chose ", direction);
    break;
  } catch (e) {
    if ( e instanceof InputError ) {
      console.log("Not a valid direction. Try again.");
    } else {
      throw e;
    }
  }
}

now it will catch ONLY instances of "InputError", but will let unrelated exceptions through.
If you introduce a type, like prompDirection (missing a "t"),
the undefined variable error will be properly reported.



ASSERTIONS:
These are a tool to do sanity checks for code errors.
They are a way of making sure that a mistake will cause failure right where/when
the mistake happens, instead of potentially have the code silently producing a nonsense value that carries through the code.

Example: we create a help function called "assert"

function AssertionFailed(message) {
  this.message = message;
}
AssertionFailed.protype = Object.create(Error.prototype);

function assert(test, message) {
  if (!test) {
    throw new AssertionFailed(message);
  }
}

function lastElement(array) {
  assert(array.length > 0, "empty array in lastElement");
  return array[array.length - 1];
}

In this case, the last function "lastElement" we are testing if an array has at least 1 element.
if the array.length is NOT > 0, (its empty),
then the test will be false, and assert will throw the error
that we called "AssertionFailed", that we defined above it,
and the message will be "empty array in lastElement".

If the array is not empty, test is true, and assert does nothing,
lastElement simply returns the last element of the array.

If we did not use this assertion, and we used an empty array,
lastElement would simply return "undefined". Which is a nonsense value
that can carry forward through our program.
