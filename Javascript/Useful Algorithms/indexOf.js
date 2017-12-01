The indexOf method has a sibling called lastIndexOf,
which starts searching for the given element at the END of the array
instead of the front.

console.log([1, 2, 3, 2, 1].indexOf(2));
// → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2));
// → 3

Both indexOf and lastIndexOf take an optional second argument that indicates where to start searching from.
