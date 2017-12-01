LISTS

Eloquent JavaScript Book, Chapter 4, Exercize 3.


(is this actually common?)
A common data structure is the list (not to be confused with the array). A list is a nested set of objects, with the first object holding a reference to the second, the second to the third, and so on.

var list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};

The resulting objects form a chain, like this:

(image from lesson)

A linked list
A nice thing about lists is that they can share parts of their structure. For example, if I create two new values {value: 0, rest: list} and {value: -1, rest: list} (with list referring to the variable defined earlier), they are both independent lists, but they share the structure that makes up their last three elements. In addition, the original list is also still a valid three-element list.

1. Write a function arrayToList that builds up a data structure like the previous one when given [1, 2, 3] as argument.

2. Write a function listToArray that produces an array from a list.
Also write the helper functions prepend, which takes an element and a list
and creates a new list that adds the element to the front of the input list,
and nth, which takes a list and a number and returns the element at the given position in the list,
or undefined when there is no such element.

3. If you haven’t already, also write a recursive version of nth.


console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

1.
function arrayToList(array) {
  var list = null;
  for (i = array.length -1; i >= 0; i--) {
    list = {value: array[i], rest: list};
  }
  return list;
}

2. //(this just makes me shake my head)
function listToArray(list) {
  var array = [];
  for (var node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}
//2.b  //never used prepend
function prepend(value, list) {
  return {value: value, rest: list};
}

3. //(this also makes me shake my head)
function nth(list, N) {
  if (!list) {
    return undefined;
  } else if (N == 0) {
    return list.value;
  } else {
    return nth(list.rest, N-1);
  }
}
