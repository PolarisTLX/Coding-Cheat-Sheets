Standard methods on Array:

https://www.w3schools.com/jsref/jsref_obj_array.asp

.forEach()   Calls a function(){} for each array element
.reverse()
.sort()
.join()
.filter()
.map()
.reduce()
.find()
.findIndex()
.indexOf()
.every()	Checks if every element in an array pass a test
.some()	Checks if any of the elements in an array pass a test


.push() and .pop(), which add and remove elements at the end of an array,
The methods for adding and removing things at the START of an array are
.unshift() and .shift().


.slice(), takes a start index and an end index and returns an array that has only the elements between those indices.
The start index is inclusive, the end index exclusive.

console.log([0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]


.concat() method can be used to glue arrays together, similar to what the + operator does for strings.



FOR EACH:
forEach() is a standard method available for arrays.
Since the array is already provided as the thing the method acts on,
forEach takes only one required argument: the function() to be executed for each element.

      var numbers = [1, 2, 3, 4, 5], sum = 0;
      forEach(numbers, function(number) {
        sum += number;
      });
      console.log(sum);
      // → 15


FILTER: .filter():


To find the people in the ancestry data set who were young in 1924,
the following function filters out the elements in an array that don’t pass a test.

//NOTE below is expanded to demonstrate what happens internally, but it can be shorted, as shown at the end:

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


//NOTE above is expanded to demonstrate, but it can be shorted like so:

      console.log(ancestry.filter(function(person) {
        return person.born > 1900 && person.born < 1925;
      }));


This uses the argument named test, a function value, to fill in a “gap” in the computation.
The test function is called for each element,
and its return value determines whether an element is included in the returned array.

Note how the filter function, rather than deleting elements from the existing array,
builds up a new array with only the elements that pass the test.
This function(){} is "PURE". It does not modify the array it is given.


MAP:  .map()
The map method transforms an array by applying a function to all of its elements
and building a new array from the returned values.
The new array will have the same length as the input array,
but its content will have been “mapped” to a new form by the function(){}.

      var numbers = [4, 9, 16, 25];
      console.log(numbers.map(Math.sqrt));
      // [2, 3, 4, 5]

REDUCE: .reduce()
.reduce() (or sometimes fold) is a higher-order operation.
That "folds" up an array, one element at a time, till there is just 1 item left.
When summing numbers, you’d start with the number zero and, for each element,
combine it with the current sum by adding the two.

This function is a little less straightforward than filter and map, so pay close attention.

The parameters to the reduce function are:
The array, A combining function and A start value:

.reduce(array, combiningFunction, start)
or
array.reduce(combiningFunction, start)

If your array contains at least one element, you are allowed to leave off the start argument.
The method will take the first element of the array as its start value and start reducing at the second element.


To use reduce to find my most ancient known ancestor, we can write something like this:

      var numbers = [65, 44, 12, 4];

      function getSum(total, num) {
        return total + num;
      }

      console.log(numbers.reduce(getSum));  // 125

      // shortened with function incorporated:
      console.log(numbers.reduce(function(total, num) {
        return total + num;
      }));


      //another example:
      console.log(ancestry.reduce(function(min, cur) {
        if (cur.born < min.born) return cur;
        else return min;
      }));
      // → {name: "Pauwels van Haverbeke", born: 1535, …}
