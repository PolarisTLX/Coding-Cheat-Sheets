.push() and .pop(), which add and remove elements at the end of an array,
The methods for adding and removing things at the START of an array are
.unshift() and .shift().



.slice(), takes a start index and an end index and returns an array that has only the elements between those indices.
The start index is inclusive, the end index exclusive.

console.log([0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]


The .concat() method can be used to glue arrays together, similar to what the + operator does for strings. 
