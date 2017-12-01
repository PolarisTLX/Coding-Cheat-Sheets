The standard function Math.min that returns its smallest argument.
We can do that ourselves now.
Write a function min that takes two arguments and returns their minimum.

Test cases:
console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10


function min(a, b) {
  return a < b ? a : b;
}

console.log(min(0, 10));
