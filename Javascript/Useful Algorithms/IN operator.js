var anObject = {left: 1, right: 2};
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
console.log("left" in anObject);
// → false
console.log("right" in anObject);
// → true

The binary in operator, when applied to a string and an object, returns a Boolean value that indicates whether that object has that property.
The difference between setting a property to undefined and actually deleting it is that,
in the first case, the object still has the property
(it just doesn’t have a very interesting value),
whereas in the second case the property is no longer present and in will return false.


JavaScript provides a loop construct specifically for going over the properties of an object. It looks a little like a normal for loop but distinguishes itself by the use of the word in.

for (var event in map)
  console.log("The correlation for '" + event +
              "' is " + map[event]);
// → The correlation for 'pizza' is 0.069
// → The correlation for 'touched tree' is -0.081
