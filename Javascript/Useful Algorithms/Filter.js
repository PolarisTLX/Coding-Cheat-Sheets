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
