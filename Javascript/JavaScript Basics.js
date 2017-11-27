Type Coercion / Automatic Type Conversion:

When Javascript is supplied incompatible balue types,
it quietly tries to convert them to being compatible.
This doesnt always work well:

console.log(8 * null);  // 0
console.log("5" - 1);   // 4
console.log("5" + 1);   // 51
console.log("five" * 2);  //  NaN
console.log(false == 0);  //  true


"===" (compare while being strict with the type):

console.log( 0 === false); // false



null / undefined / infinity / NaN / false:
3 values that are considered "numbers" in JS but dont behave like normal numbers:
    1. Infinity
    2. -Infinity
    3. NaN

//NOTE Infinity must be written with a capital I!!
console.log(Infinity == Infinity);  // true
console.log(Infinity == infinity);  // Error


console.log(null == undefined);  // true
console.log(null == 0);    // false
console.log("" == false);  // true
console.log(0 == false);   // true

console.log(NaN == NaN);   // false
(This is the only value in JS that is not equal to itself. Because a nonsensical computation is not equal to another nonsensical computation)
console.log(NaN != NaN);   // true


How to get NaN?
Any numeric operation that doest yield precise numeric results:
console.log(0 / 0);  //NaN
console.log(Infinity / Infinity);  //NaN


Most operators are binary (they take 2 values to complete their "function"):
Examples:

Unary Operators:  (takes only 1 value to complete their "function"):
"typeof"
console.log(typeof  "x");    // string
console.log(typeof  8);      // number
console.log(typeof  false);  // boolean
console.log(typeof  yes);    // undefined (booleans are only true or false)

Ternary Operator (takes 3 values to complete their "function")
there is only one example of this, it is the  " ? : "
true ? 1 : 2




"Escaping the character" with backslash (\):
To include a '' or "" inside of another string:
'That don't impress me much'  (does not work)
'vs
'That don\'t impress me much'  (works)

Newline character: \n:
"This is the first line\nThis is the second line".
// "This is the first lines
// This is the second line."

If two \\ follow each other, tey collapse together:
"A newline character is written like \"\\n\" properly."
gives result:
"A newline character is written like "\n" properly."

Otherwise:
"A newline character is written like "\n" properly."
gives result:
X Uncaught SyntaxError: Invalid


Letters/strings can be compared, since all characters are given an internal asigned number for Unicode:
"b" is higher (comes after) "a" in this order.
console.log("a" < "b");
console.log("A" < "B");
console.log("Andrew" < "Mandrew"); // true
console.log("Andrew" < "Bndrew"); // true

//NOTE - Had this wrong before!
Uppercase letters come BEFORE??? lowercase letters in this order:
"A" is lower (comes before) "a" in this order.
console.log("APPLE" < "apple");  // true
console.log("a" > "A");  // false
console.log("b" > "A");  // true!!!
console.log("b" < "A");  // false!!!


Operator Order Of Precence / order of execution:
||  has the lowest precedence (executed last)

(paretheses)  -->   "* / %"  -->  "+ -"    -->   (comparisons (>, >=, ==, != ..)  -->   &&   -->   ||
