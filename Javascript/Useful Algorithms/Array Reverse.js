Arrays have a method reverse, which changes the array by inverting the order in which its elements appear.

For this exercise, write two functions:

1. reverseArray() takes an array as argument and produces a new array that has the same elements in the inverse order.

2. reverseArrayInPlace() does what the reverse method does: it modifies the array given as argument in order to reverse its elements.

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

1.
function reverseArray(array) {
  var newArray = [];
  for (i = (array.length-1); i >= 0; i--) {
    newArray.push(array[i]);
  }
  return newArray;
}


2. // unpopular method, did not feel like doing this one myself
function reverseArrayInPlace(array) {
  for (var i = 0; i < Math.floor(array.length / 2); i++) {
    var old = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = old;
  }
  return array;
}
