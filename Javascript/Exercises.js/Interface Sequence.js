Sequence interface - Eloquent JavaScript Chapter 6 - Objects - Exercise 3

Design an interface that abstracts iteration over a collection of values.

Interface just means a functin. And in this case it just iterates over the values privided to it.

An object that provides this interface represents a sequence, and the interface
must somehow make it possible for code that uses such an object to
iterate over the sequence, looking at the element values it is made up of
and having some way to find out when the end of the sequence is reached.

When you have specified your interface, try to write a function logFive
that takes a sequence object and calls console.log on its first five elements—
or fewer, if the sequence has fewer than five elements.

Then implement an object type ArraySeq that wraps an array and allows iteration
over the array using the interface you designed. Implement another object type RangeSeq
that iterates over a range of integers (taking from and to arguments to its constructor) instead.



logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104

One way to solve this is to give the sequence objects state,
meaning their properties are changed in the process of using them.
You could store a counter that indicates how far the sequence object has advanced.

Your interface will need to expose at least a way to get the next element
and to find out whether the iteration has reached the end of the sequence yet.
It is tempting to roll these into one method, next, which returns null
or undefined when the sequence is at its end. But now you have a problem
when a sequence actually contains null. So a separate method (or getter property)
to find out whether the end has been reached is probably preferable.



Solved with a system where a sequence object has two methods:
//
// * next(), which returns a boolean indicating whether there are more
//   elements in the sequence, and moves it forward to the next
//   element when there are.
//
// * current(), which returns the current element, and should only be
//   called after next() has returned true at least once.

function logFive(sequence) {
  // here sequence will be either "ArraySeq" or "RangeSeq"
  for (i = 0; i < 5; i++) {
    //checks if there are more elements left after this one
    if (!sequence.next()) {
      break;
      // if there aren't any, stop
    }
    console.log(sequence.current());
  }
}

// this is for if it is passed an array of values
// ex: logFive(new ArraySeq([1, 2]));
function ArraySeq(array) {
  this.pos = -1;
  this.array = array;
}
//if there are no more elements, next will return false, stopping the logFive function
ArraySeq.prototype.next = function() {
  if (this.pos >= this.array.length - 1) {
    return false;
  }
  //otherwise return true, and keep logging in the logFive function
  this.pos++;
  return true;
};
ArraySeq.prototype.current = function() {
  // provide the value at the current position in the array, which is what will be logged
  return this.array[this.pos];
};

// this is if passed 2 values directly, the values represent a "from" and a "to"
// ex: logFive(new RangeSeq(100, 1000));
function RangeSeq(from, to) {
  this.pos = from -1;
  this.to = to;
  //start at -1 from first value, because it will be ++1 below before the first console.log
}
//if the range doesn't make sense (from is larger than to),
// of if there are no more elements, next will return false, stopping the logFive function
RangeSeq.prototype.next = function() {
  if (this.pos >= this.to) {
    return false;
  }
  this.pos++;
  return true;
};
// provide the current value, which is what will be logged
RangeSeq.prototype.current = function() {
  return this.pos;
};




Another solution is to avoid changing state in the object. You can expose a method
for getting the current element (without advancing any counter)
and another for getting a new sequence that represents the remaining elements
after the current one (or a special value if the end of the sequence is reached).
This is quite elegant—a sequence value will “stay itself” even after it is used
and can thus be shared with other code without worrying about what might happen to it.
It is, unfortunately, also somewhat inefficient in a language like JavaScript
because it involves creating a lot of objects during iteration.
