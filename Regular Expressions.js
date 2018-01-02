REGULAR EXPRESSIONS (Chapter 9 in Eloquent JavaScript) :

A regular expression is a type of object.
Two ways of creating a Regular Expression:

var re1 = new RegExp("abc");  // with the new RegExp constructor
var re2 = /abc/;  // by wrapping the desired pattern with forward slashes /.../

When using new RegExp(), the pattern is written as a string, so rules for backslashes "\\" apply.

for the /abc/ method,  if we want any backslash as part of our pattern, it must go before the second forward slash.
because the second forward slash ends the pattern.
Also, backslashes that arent part of special codes, like \n, will be preserved (and change the pattern meaning),
instead of being ignored like they are in strings.

Characters that have special meaning in RegExpression:  ? +...
there are many special characters...

If one of these characters are meant to represent themselves in the patern, they must have a backslash \ infront:
To get "eighteen+":
var eighteenPlus = /eighteen\+/;

there are many special characters,
so instead of memorizing them all, just put a \ in front of any special character (not a normal character, number or white space)


TESTING FOR MATCHES:
Using one of the many built in methods of RegExp, "test",
returns true or false when you provide it a string, and a RegExp,
if the string contains a match for the RegExp, it returns true.

console.log(/abc/.test("abcde"));  // true
console.log(/abc/.test("abxyz"));  // false

This is basically the same as "indexOf", so RegExp are better for more complex matches:



[]  square brackets in a RegExp means "do ANY of the characters between the brackets exist in the string?"
[x-x]  a "-" inside square brackets in a RegExp indicate a range.


WANT TO SEE IF ANY NUMBER EXISTS IN A STRING:

console.log(/[0123456789]/.test("in 1992"));  //true
console.log(/[0-9]/.test("in 1992")); // true
console.log(/[5]/.test("abc def 5 0000000 1111 rrrrrrr")); //true
console.log(/[5]/.test("1234 6789")); //false



BUILT-IN SHORTCUTS:

\d  =  same as [0-9], any digit characters
\D  =  any character that is NOT a digit
\w  =  any letter character,  same as [a-zA-Z] ?
\W  =  any NON-LETTER character
\s  =  any white space character (space, tab, newline)
\S  =  any NON-WHITE SPACE characters
.   =  any character except for newline (\n?)



MATCH A TIME AND DATE ("30-01-2003 15:20"):

(improved below with dateTime2)
var dateTime = /\d\d\-\d\d\-\d\d\d\d\s\d\d\:\d\d/;

console.log(dateTime.test("30-01-1987 12:30"));  //true
console.log(dateTime.test("30-JAN-1987 12:30"));  //false



TO MATCH ANY CHARACTER >>EXCEPT<< A SPECIFIC ONE, PLACE A [^...] IN FRONT:

var notBinary = /[^01]/;
console.log(notBinary.test("0111101010110"));  // false
console.log(notBinary.test("0341110010110"));  // true



REPEATING PARTS OF PATTERN - TO TEST FOR MORE THAN 1 CHARACTER:

the +  symbol after a character, it means "1 OR MORE" of that character.

console.log(/\d+/.test("123"));   // true
console.log(/\d+/.test("1z2z3")); // true
console.log(/\d+/.test("1a"));    // true
console.log(/\d+/.test("1"));     // true
console.log(/\d+/.test("abc"));   // false
console.log(/\d+/.test(" "));     // false

the * symbol after a character, it means "NONE OR MORE" of that character.
(the * is less useful)

console.log(/\d*/.test("123"));   // true
console.log(/\d*/.test("abc"));   // true
console.log(/\d*/.test(" "));     // true



REPEAT PARTS OF PATTERN A SPECIFIC NUMBER OF TIMES WITH {4}:

Ex: Putting {4} after a character means it must repeat 4 times:

// old:
// var dateTime = /\d\d\-\d\d\-\d\d\d\d\s\d\d\:\d\d/;
var dateTime2 = /\d{2}\-\d{2}\-\d{4}\s\d{2}\:\d{2}/;

console.log(dateTime2.test("30-01-1987 12:30"));   //true
console.log(dateTime2.test("30-1-1987 12:30"));    //false
console.log(dateTime2.test("30-JAN-1987 12:30"));  //false


Putting {2,4} means that it must occur between 2 and 4 times.

var dateTime3 = /\d{1,2}\-\d{1,2}\-\d{4}\s\d{1,2}\:\d{1,2}/;

console.log(dateTime3.test("30-01-1987 12:30"));   //true
console.log(dateTime3.test("30-1-1987 12:30"));    //true
console.log(dateTime3.test("30-001-1987 12:30"));    //false


Putting {5,} means "at least 5 times or more".



OPTIONAL PARTS OF A PATTERN:

the ? symbol after a character, means "that character may or may not appear":

var neighbor = /neighbou?r/;
console.log(neighbor.test("neighbor"));  //true
console.log(neighbor.test("neighbour")); //true
console.log(neighbor.test("neighboor")); //false
console.log(neighbor.test("nieghbor"));  //false
