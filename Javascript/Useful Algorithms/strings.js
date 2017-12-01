Values of type string, number, and Boolean are not objects,
and though the language doesn’t complain if you try to set new properties on them,
it doesn’t actually store those properties.
The values are immutable and cannot be changed.

If you try to add a new property, it doesn’t stick.

var myString = "Fido";
myString.myProperty = "value";
console.log(myString.myProperty);
// → undefined


But these types do have some built-in properties.
Every string value has a number of methods.
The most useful ones are probably .slice() and .indexOf()
which resemble the array methods of the same name.

console.log("coconuts".slice(4, 7));
// → nut
console.log("coconut".indexOf("u"));
// → 5

One difference is that a string’s indexOf can take a string containing more than one character,
whereas the corresponding array method looks only for a single element.

console.log("one two three".indexOf("ee"));
// → 11



Accessing the individual characters in a string can be done with the .charAt() method
but also by simply reading numeric properties, like you’d do for an array.

var string = "abc";
console.log(string.length);
// → 3
console.log(string.charAt(0));
// → a
console.log(string[1]);
// → b



The trim method removes whitespace (spaces, newlines, tabs, and similar characters) from the start and end of a string.

console.log("  okay \n ".trim());
// → okay
