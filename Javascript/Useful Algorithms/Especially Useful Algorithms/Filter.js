.filter():

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

Note how the filter function, rather than deleting elements from the existing array,
builds up a new array with only the elements that pass the test.
This function is "PURE". It does not modify the array it is given.



.filter   WITH   .map exercise:
https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/es6/write-higher-order-arrow-functions/


const realNumberArray = [4, 5.6, -9.8, 3.14, 42, 6, 8.34];
const squareList = (arr) => {
  "use strict";
  // change code below this line
  const squaredIntegers = arr.filter((element) => {
    if (element > 0 && Number.isInteger(element)) {
      return element;
    }
   }).map((element) => element**2);
  // change code above this line
  return squaredIntegers;
};
// test your code
const squaredIntegers = squareList(realNumberArray);
console.log(squaredIntegers);


Tests:
-User did replace var keyword.
-squaredIntegers should be a constant variable (by using const).
-squaredIntegers should be an array
-squaredIntegers should be [16, 1764, 36]
-function keyword was not used.
-loop should not be used
-map, filter, or reduce should be used
