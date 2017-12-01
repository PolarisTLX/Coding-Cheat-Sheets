JavaScript is extremely broad-minded about the number of arguments you pass to a function.
If you pass too many, the extra ones are ignored.
If you pass too few, the missing parameters simply get assigned the value "undefined".

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

console.log(power(4));
// → 16
console.log(power(4, 3));
// → 64
