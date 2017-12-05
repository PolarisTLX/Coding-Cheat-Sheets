These are two of the standard methods evailable to arrays:

.every()	Checks if every element in an array pass a test
.some()	  Checks if any of the elements in an array pass a test

 when called with an array as their argument, they return true or false.


Building my own versions of these:

Special NOTE: JavaScript isNaN() Function  - Checks whether a value is NaN.

console.log(every([NaN, NaN, NaN], isNaN));
// → true
console.log(every([NaN, NaN, 4], isNaN));
// → false
console.log(some([NaN, 3, 4], isNaN));
// → true
console.log(some([2, 3, 4], isNaN));
// → false

function every(array, func) {
  for (i in array) {
    //if (func(array[i]) == false) {
      if (!func(array[i])) {
    // func(array[i]) becomes isNaN(array[i])
      return false;
    }
  }
  return true;
}

function some(array, func) {
  for (i in array) {
    if (func(array[i]) == true) {
      return true;
    }
  }
  return false;
}
