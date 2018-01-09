Module with JS, at least ES5, is limited.

Problems with global scope variables,
most other languages have more levels of scopes.

Functions are the only thing in JS that create a new scope.

SIMPLE TRIVIAL MODULE EXAMPLE:

var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function dayName(number) {
  return names[number];
}

console.log(dayName(1));  // Monday

the functin dayName() is part of this modules interface, but the variable "names" is not.

To prevent "names" from being a global scope variable we can do this:

var dayNames = function() {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return function(number) {
    return names[number];
  };
}();

console.log(dayNames(3));   // Wednesday

Now "names" is a local variable in an unnamed functin.
This functin is created an immediatly called.


Using a similar pattern to isolate code from the outside world entirely as well:

(function() {
  function square(x) {
    return x * x;
  }
  var hundred = 100;

  console.log(square(hundred));
})();
//10000

This code simply outputs the square of 100.
The module is wrapped in a functin to prevent the variables it uses internally from being in the global scope.
In a real world example a module like this could add a method to some prototype or sets up a widget on a webpage.

Wrapping the whole module in a pair of () is a quirk of JavaScript syntax.
It is to trick to force the functin to be interpreted as an expression.
If an "expression" starts with the keyword "function", it is a functin expresion.
But if a "statement" starts with functin, it is a functin "decleration", which requires a name,
and cannot be called by writting parentheses after it (because its not an expression).


OBJECTS AS INTERFACES:

Now we want to add another functin to our day-of-the-week module,
that goes from day name to a number.
We cant simply return the functin anymore,
We must wrap the two functions in an object.

var weekDay = function() {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return {
    name: function(number) { return names[number]; },
    number: function(name) { return names.indexOf(name); }
  };
}();

console.log(weekDay.name(weekDay.number("Sunday")));
// Sunday
