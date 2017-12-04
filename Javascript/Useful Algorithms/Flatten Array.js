EXERCISE:

.reduce(array, combiningFunction, start)
or
array.reduce(combiningFunction, start)

/*
var numbers = [65, 44, 12, 4];

function getSum(total, num) {
  return total + num;
}

console.log(numbers.reduce(getSum));  // 125
*/



Use the reduce method in combination with the concat method to “flatten”
an array of arrays into a single array that has all the elements of the input arrays.

var arrays = [[1, 2, 3], [4, 5], [6]];


function flatten(){
  newArray = [];
  for (i = 0; (i <= arrays.length-1); i++) {
    for (j = 0; (j <= arrays[i].length-1); j++) {
      newArray.push(arrays[i][j]);
      console.log(newArray);
    }
  }
  return newArray;
}

//OR

function flatten(){
  newArray = [];
  for (i = 0; (i <= arrays.length-1); i++) {
    newArray = newArray.concat(arrays[i]);
  }
  return newArray;
}

console.log(arrays.reduce(flatten));
// → [1, 2, 3, 4, 5, 6]


//proper answer:

function flatten(newArray, passedArray){
    return newArray.concat(passedArray);
}
//passedArray is what gets placed in front of the .reduce
console.log(arrays.reduce(flatten, []));

//remember structure:
// array.reduce(combiningFunction, start)
