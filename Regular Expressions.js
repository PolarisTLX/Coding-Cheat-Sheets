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



GROUPING SUBEXPRESSIONS: (...+):
To use an + or a * or other operators on more than one element at a time,
put them in () parentheses.
Parts of a RegExp that is enclosed in () count as a single operation:

var crying = /boo+(hoo+)+/;
console.log(crying.test("boohoooohoohooo"));  //true
console.log(crying.test("Boohoooohoohooo"));  //false
console.log(crying.test("boohoooohoohooo"));  //true
console.log(crying.test("booohoooohoohooo"));  //true
console.log(crying.test("boohohohooo"));  //false
console.log(crying.test("bohoohoohooo"));  //false

The first and second + above apply to only the second "o" in "boo" and "hoo".
The third + applies to the group (hoo+), matching one or more sequences of "hoo".

CASE SENSITIVITY: "i":

var crying = /boo+(hoo+)/i;   // i means "NOT case sentive" or "case "in"sensitive"
console.log(crying.test("boohoooohoohooo"));  // true
console.log(crying.test("Boohoooohoohooo"));  // true



EXEC: (EXECUTE) INSTEAD OF TEST:
RegExp also have .exec that will return "null" if no match was found,
but will return an object(an array of strings) with info if there is a match:

var match = /\d+/.exec("one two 100");
// d+ for "digits, one or more"
console.log(match);  // ["100", index: 8, input: "one two 100"]
This shows its an array of strings

Objects returned from .exec has an "index" property to indicate where it was matched in the provided string.
console.log(match.index); // 8
The digits first occured in the given string at index 8.

Strings also have a similar method ".match" that does the EXACT same thing:
console.log("one two 100".match(/\d+/));
// ["100", index: 8, input: "one two 100"]
(the format is just reversed)

var quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// ["'hello'", "hello", index: 9, input: "she said 'hello'"]


when a group does not end up being matched at all, example when followed by a "?",
its index will be "undefined":

console.log(/bad(ly)?/.exec("bad"));
// ["bad", undefined, index: 0, input: "bad"]


// DON'T GET THIS ONE
when a group is matched many times, only the index of the last one is shown:
console.log(/(\d)+/.exec("123"));
// ["123", "3", index: 0, input: "123"]


Groups can be useful for extracting parts of a string.  For when we want to not just confirm it exists,
but also grab it and do something with it.
This is done by wrapping () parentheses around the pattern.
Such as for taking out a date out of a string.



(A detour in the chapter?)
THE DATE TYPE
JavaScript has a specific object type for storing dates, called Date().

If you create a new object of Date(), it gives the current time and date:
console.log(new Date());
// Wed Jan 03 2018 23:48:26 GMT-0500 (Eastern Standard Time)

Can also create an object for a specific date and time:
console.log(new Date(YYYY, MM, D, HH, MM, SS, MSS));
console.log(new Date(2009, 11, 9));
// Wed Dec 09 2009 00:00:00 GMT-0500 (Eastern Standard Time)
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));
// Wed Dec 09 2009 12:59:59 GMT-0500 (Eastern Standard Time)

// NOTE  JavaScript STUPIDLY decided that MONTHS would start at 0
// but days start 1 !!!!   It's just stupid.


UNIX TIMESTAMPS:
UNIX Timestamps are measured as number of miliseconds since 1970.
Anything before this uses negative numbers.
The method .getTime() returns this number.  It is a big number due to miliseconds.
console.log(new Date(2018, 1, 3).getTime());
// 1517634000000
console.log(new Date(1378297460000));
// Wed Sep 04 2013 08:24:20 GMT-0400 (Eastern Daylight Time)

// Date.now() will return the current time in this UNIX milisecond format
console.log(Date.now());
// 1515042081328

There is also getFullYear, getMonth, getHours, getMinutes, getSeconds, getDate
// NOTE "getYear" is useless, always use "getFullYear".
console.log(new Date(2018, 1, 3).getMonth());  // 1
console.log(new Date(2018, 1, 3).getDate());  // 3
console.log(new Date(2018, 1, 3).getFullYear());  // 2018
console.log(new Date(2018, 1, 3).getYear());  // 118 ??? USELESS
console.log(new Date(2018, 1, 3).getHours());  // 0 (none provided)
console.log(new Date(2018, 1, 3).getMinutes());  // 0 (none provided)
console.log(new Date(2018, 1, 3).getSeconds());  // 0 (none provided)



GET CURRENT TIME (DATE, HOURS, MINUTES etc):
console.log(new Date().getMinutes());  // 17  (currently 12:17 am)


FINDING A DATE IN A STRING / IN ANY TEXT:
Using all this to create a date object from a string:
function findDate(string) {
  //var datePattern = /(\d{1,2})-(\d{1,2})-(\d{4})/;
  // SEE BELOW WHY the $ is needed.
  var datePattern = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
  var matchArray = datePattern.exec(string);
  console.log(matchArray);
  return new Date(Number(matchArray[3]),
                  Number(matchArray[2]) - 1,
                  // minus 1 because only months start at 0, lol (see note about stupidity above)
                  Number(matchArray[1]));
}
console.log(findDate("30-1-2003"));
// ["30-1-2003", "30", "1", "2003", index: 0, input: "30-1-2003"]
// Thu Jan 30 2003 00:00:00 GMT-0500 (Eastern Standard Time)

matchArray[3] is "2003",  putting Number in front makes it not a string
matchArray[2] -1 is 1 -1, = 0  which represents January (only for months)
matchArray[1] is "30",

so we are returning new Date(2003, 0, 30);


console.log(findDate("I wish to buy a house by 30-1-2003"));
// ["30-1-2003", "30", "1", "2003", index: 25, input: "I wish to buy a house by 30-1-2003"]
// Thu Jan 30 2003 00:00:00 GMT-0500 (Eastern Standard Time)


NOTE!!!  PROBLEM:
console.log(findDate("30-1-220033"));  wouldnt work but still returns a date,
ALSO
console.log(findDate("14530-1-2003"));  wouldnt work but still returns a date,

Unfortunately, findDate will also happily extract the nonsensical date 00-1-3000 from the string "100-1-30000".
A match may happen anywhere in the string, so in this case,
it’ll just start at the second character and end at the second-to-last character.

If we want to enforce that the match must span the whole string,
we can add the markers ^ and $.

This pattern fixes it:
var datePattern = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;

BEGINS AND ENDS WITH:   ^  AND  $  :

The ^ matches the start of the string,
The $ matches the end of the string.

So  /^\d+$/  matches a string  that is exactly one or more digits,
Then /^!/  matches any string that starts with an ! mark (there can be nothing before it.)
Then /!$/  matches any string that ends with an ! mark (there can be nothing after it.)

console.log(/!$/.exec("Help!"));      // ["!", index: 4, input: "Help!"]
console.log(/!$/.exec("Help"));       // null  (does not end in !)
console.log(/!$/.exec("Help!Help"));  // null  (does not end in !)
console.log(/!$/.exec("HelpHelp!"));  // ["!", index: 8, input: "HelpHelp!"]

console.log(/^!/.exec("Help!"));      // null  (does not begin with !)
console.log(/^!/.exec("!Help"));      // ["!", index: 0, input: "!Help"]
console.log(/^!/.exec("!Help!"));     // ["!", index: 0, input: "!Help!"]

console.log(/^!.*!$/.exec("!Help"));     // null  (does not begin AND end with !)
Needs ".*", which means any characters in between repeated 0 or more times
console.log(/^!.*!$/.exec("!Help!"));     // ["!Help!", index: 0, input: "!Help!"]
console.log(/^!.*!$/.exec("!!"));     // ["!!", index: 0, input: "!!"]





WORD BOUNDARY: \b
Start or end of a string or any point in a string that has a word character on one side,
and a non-word character on the other side.

console.log(/cat/.test("concatenate"));          // true
console.log(/\bcat\b/.test("concatenate"));      // false
console.log(/\bcat\b/.test("con--cat--enate"));  // true
console.log(/\bcat/.test("con--cat--enate"));    // true
console.log(/cat\b/.test("con--cat--enate"));    // true
console.log(/\bcat\b/.test("concat--enate"));    // false



FIND a NUMBER followed by ONE OF A FEW WORDS, or their PLURAL FORMS:
Ex: number + either pig(s), cow(s) or chicken(s).

Instead of writting 3 regular expressions:

var animal = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animal.test("15 pigs"));         // true
console.log(animal.test("15 manbearpigs"));  // false



BACKTRACKING in REGEXP:

console.log(/.*x/.test("abcx7"));  // true

The RegExp will test the while string ".*" and see if it ends with an "x".
When it doesnt, abcx7 does not have an x after,
so it goes back and tries again with 1 character less,
abcx also does not have an x after it, so it tries again,
abc DOES have an x after it, so it succeeds.




REPLACING WITH .replace  and RegExp:

strings already have a .replace method:

var start = "papa"

var middle = "papa".replace("p", "m");
console.log(middle);
// mapa
var end = middle.replace("p", "m")
console.log(end);
// mama

However, this only does one letter at a time.
Using RegExp as the first argument improves this:

console.log("papa".replace(/p/, "m"));   // mapa     same result

But now using "g" for global:
console.log("papa".replace(/p/g, "m"));   // mama    all "p"s are replaced


REPLACE ALL "2"s OR "4"s  TO BECOME "3"s:
console.log("363642362244".replace(/[24]/g, "3"));   // 363633363333



RE-ARRANGE "LastName, FirstName" TO  "FirstName LastName" WITH $1 & $2:

var listOfNames = "Rail, Paul\nRail, Melanie\nRail, Celine\nRobertson, James";
//console.log(listOfNames);

var rearranged = listOfNames.replace(/([\w]+), ([\w]+)/g, "$2 $1");

([\w]+), ([\w]+) means:
(word characters of any length in a row) + ", " + (word characters of any length in a row)

console.log(rearranged);

    Paul Rail
    Melanie Rail
    Celine Rail
    James Robertson


PASSING A FUNCTION IN .replace  AS THE SECOND ARGUMENT:

var phrase = "the cia and fbi";

var corrected = phrase.replace(/\b(fbi|cia)\b/g, function(string) {
  return string.toUpperCase();
});

console.log(corrected);   // the CIA and FBI


IF THERE IS ONLY 1 OF AN ITEM LEFT, REMOVE THE "s":

    var stock = "1 lemon, 2 cabbages, and 101 eggs";
    // pattern is number of any digits length, then a space, then word of any characters length
    var pattern = /(\d+) (\w+)/g;

NOTE:  Each () in the pattern above is provided as an argument to the functin,
and the order of the ()s is important in this case.

    function minusOne(match, amount, unit) {
      console.log(arguments);

      //reduce number by 1:  (needs to be converted from string first)
      amount = Number(amount) - 1;
      // if only 1 left, remove the "s":
      if (amount == 1) {
        unit = unit.slice(0, unit.length -1);
      }
      else if (amount == 0) {
        amount = "no";
      }
      return amount + " " + unit;
    }

    console.log(stock.replace(pattern, minusOne));
    // no lemon, 1 cabbage, and 100 eggs

NOT SURE HOW the function recognizes the number as "amount" and the name as "unit"
"match" is an object containing info of all matches.


function lloan(test1, test2){
    //console.log(arguments);
    console.log(test2.toUpperCase());
}

lloan(test2 = 'hello', test1 = 'test');  //TEST
console.log(lloan('hello', 'test')); //TEST

Seems that saying "test2 = 'hello'" does nothing. It only matters what order they were provided



Toying with it to better understand:

    var stock = "1 lemon zest, 2 cabbages rolls, and 101 eggs whites";
    // pattern is number of any digits length, then a space, then word of any characters length
    var pattern = /(\d+) (\w+) (\w+)/g;

    function minusOne(match, amount, unit, type) {
      console.log(match);  // 1 lemon zest (first round only)
      console.log(amount); // 1
      console.log(unit);   // lemon
      console.log(type);   // zest

      //reduce number by 1:  (needs to be converted from string first)
      amount = Number(amount) - 1;
      // if only 1 left, remove the "s":
      if (amount == 1) {
        unit = unit.slice(0, unit.length -1);
      }
      else if (amount == 0) {
        amount = "no";
      }
      return amount + " " + unit + " " + type;
    }

    console.log(stock.replace(pattern, minusOne));

          1 lemon zest
          1
          lemon
          zest
          2 cabbages rolls
          2
          cabbages
          rolls
          101 eggs whites
          101
          eggs
          whites

          no lemon zest, 1 cabbage rolls, and 100 eggs whites


  stock.replace(pattern, minusOne) =:
    stock = string being tested
    pattern = what we are looking for in the string
    minusOne = what that will be replaced with

  for minusOne, which is a function:
      functin minusOne(match, amount, unit, type)
  (because there is a "g") this will be EACH pattern matched in the string you get:
    -First argument (what was matched)
    -+another argument for each "()" in that pattern, in order of appearence
      var pattern = /(\d+) (\w+) (\w+)/g;
      since pattern has (\d+) (\w+) (\w+), that is 3 more arguments:

      functin minusOne(part of string that matches the pattern, (1), (2), (3))



REMOVE ALL COMMENTS FROM JS CODE:

function stripComments(code) {
  //return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
  // (fixed example here, explained below)
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}

comment1 = "x = 10;// ten!";
comment2 = "1 + /* 2 */3";
comment3 = "1 /* a */+/* b */ 1";

console.log(stripComments(comment1));  // x = 10
console.log(stripComments(comment2));  // 1 + 3
console.log(stripComments(comment3));  // 1  1   <-- PROBLEM


The [^]* part the expression does some RegExp backtracking, will first match as much as it can.
If that causes the next part of the pattern to fail, it moves back one character and tries again from there.


The repetition operators (+, *, ?, {}) are "greedy":
Because they match as much as they can and backtrack from there.
If you put a "?" after them (+?, *?, ??, {}?), they become non-greedy,
because they start by matching as little as possible,
matching more only when the remaining pattern does not fil the smaller match.

// so now the same function with an extra "?" in the RegExp:
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}

comment3 = "1 /* a */+/* b */ 1";
console.log(stripComments(comment3));
// 1 + 1  (proper)
// (instead of   " 1  1 " like above)


These "Greedy" operators can cause a lot of bugs in RegExp.



WHEN YOU DONT KNOW THE PATTERN AHEAD OF TIME:
DYNAMICALLY CREATING REGEXP OBJECTS:

Example: look for a users name in a piece of text,
but you wont know the name until the program is running.
Cannot use the slash-based notation for this.

    var name = "harry"
    var text = "Harry is a suspicious character.";
    var regexp = new RegExp("\\b(" + name + ")\\b", "gi");
    // gi is fro global and case insensitive

    console.log(text.replace(regexp, "_$1_"));
    // _Harry_ is a suspicious character.


weird name example:  name = "dea+hl[]rd"

to fix this, we use add backslashes before any character that we dont trust:
use it for anything that is not alphanumeric or whitespace.

    var name = "dea+hl[]rd";
    var text = "This dea+hl[]rd kid is super annoying.";
    // before moving on we will modify "name",
    // escaped firstr goes through "name" and for any non word character we add \\
    var escaped = name.replace(/[^\w\s]/g, "\\$&");


STILL NEED TO UNDERSTAND THE LINE ABOVE!

recall that:
\d  =  same as [0-9], any digit characters
\D  =  any character that is NOT a digit
\w  =  any letter character,  same as [a-zA-Z] ?
\W  =  any NON-LETTER character
\s  =  any white space character (space, tab, newline)
\S  =  any NON-WHITE SPACE characters
.   =  any character except for newline (\n?)

so a backslash \  is placed in front of  "+" , "[",  "]".

[^\w\s]
The ^ means begins, HOWEVER when a ^ is in a [],
ie [^], means "anything that is not"
so [^\w\s]  means:  "anything that is not a word character or a space"

"\\$&"
the & means the last match? (because there are many matches?),
replace that match with itself plus a \ in front of it.


    console.log(escaped);
    // dea\+hl\[\]rd

    //now use "escaped" instead of "name".
    var regexp = new RegExp("\\b(" + escaped + ")\\b", "gi");

    console.log(text.replace(regexp, "_$1_"));
    // This +dea+hl[]rd_ guy is super annoying.



THE SEARCH METHOD:

We cannot use the indexOf() method for strings in a RegExp.  Instead we need .search().
.search() returns the first index on which a RegExp is found, or -1 when it is not found.

console.log("  word".search(/\S/));    //\S means "not a space"
// 2  (the first non-space character is at the 2nd index)

console.log("    ".search(/\S/));
// -1   (there are no non-space characters)


Unlike the .indexOf() method,  .search() cannot be told an offset of when a match should start.

THE LAST INDEX PROPERTY:

JavaScript and RegExp again do not have the best solution here.
The .exec() method does not provide a conveniant way to start searching from a specific position in a string.

RegExp are objects that have properties. Some of those properties are:
"source" - this is the string the expression was created from.
"lastIndex" - which controls where the next index where start.
NOTE: lastIndex only works when the global "g" is applied + does through the .exec() method.

    var pattern = /y/g;
    var match = pattern.exec("xyzzy");
    console.log(match.index);
    // 1
    console.log(pattern.lastIndex);
    // 2

Same example but set the RegExp "lastIndex" to start further down:

    var pattern = /y/g;
    pattern.lastIndex = 3;
    var match = pattern.exec("xyzzy");
    console.log(match.index);
    // 4
    console.log(pattern.lastIndex);
    // 5

If there is a match, using .exec() will update the "lastIndex" property to be after the match.
If there is no match, "lastIndex" is set back to zero (0) (where they all start from.)

PROBLEM: running this multiple times on different strings can cause problems.

    var digit = /\d/g;
    console.log(digit.lastIndex);
    // 0

    console.log(digit.exec("first a long sencente that ends in 1")); // ["1"]
    console.log(digit.lastIndex);
    // 36

    console.log(digit.exec("now a shorter example: 1")); // null
    console.log(digit.lastIndex);
    // 0

It cannot find the match in the second example because from the previous one it starts at index of "36".
So just sets it back to 0.

Reversing the example, shorter first, then longer, works fine:

    var digit = /\d/g;
    console.log(digit.lastIndex);
    // 0

    console.log(digit.exec("now a shorter example: 1")); // null
    console.log(digit.lastIndex);
    // 24

    console.log(digit.exec("first a long sencente that ends in 1")); // ["1"]
    console.log(digit.lastIndex);
    // 36





FIND ALL OCCURRENCES BY LOOPING OVER MATCHES WITH .exec(), lastIndex AND "while":

var string = "1 string with several numbers in it... 42...30.";
var pattern = /\b(\d+)\b/g;
var match;
while (match = pattern.exec(string)) {
  //console.log(pattern.lastIndex);
  console.log("Found", match[1], "at index " + match.index);
}
// Found 1 at index 0
// Found 42 at index 39
// Found 30 at index 44

What happens above is that "pattern" has a "lastIndex",
that keeps increasing with each run of pattern.exec(),
so pattern.exec(string) is different every time.
We are storing that value in "match".
Though there must be a different way to do this??



.MATCH + GLOBAL "g" RETURNS ALL MATCHES IN AN ARRAY:

console.log("Banana".match(/an/g));
// ["an","an"]

So best to be cautious with the global "g", often best used with .replace()




PARSING AN INI FILE:

Part of a program to harvest information "from our enemies from the internet".

Want to convert an INI configuration file into an array of objects,
each with a name property and an array of settings.
Want 1 for each section + 1 global settings at the top.

The INI configuration file:

    searchengine=http://www.google.com/search?q=$1
    spitefulness=9.7

    ; comments are preceded by a semicolon...
    ; each section concerns an individual enemy
    [larry]
    fullname=Larry Doe
    type=kindergarten bully
    website=http://www.geocities.com/CapeCanaveral/11451

    [gargamel]
    fullname=Gargamel
    type=evil sorcerer
    outputdir=/home/marijn/enemies/gargamel


rules for these kinds of INI files:

-Blank lines and lines starting with semicolons are ignored.
-Lines wrapped in [ and ] start a new section.
-Lines containing an alphanumeric identifier followed by an "=" character add a setting to the current section
-Anything else is invalid.


Since the file has to be processed line by line,
first split the file into seperate lines using string.split("\n");

Special NOTE:  some OSs  use "\n" and some use "\r\n" for a new line.
So use a RegExp to make the "\r" optional with "?":     /\r?\n/


The code below goes over every line in the file,
updating the "current section" object as it goes along.

First it checks is a line can be ignored with  /^\s*(;.*)?$/
(;.*) is to match comments.
The "?" will make sure it also matches lines containing only whitespace.

The "^" and "$"  throughout is used to make sure it matches the whole line.
This reduces the number of errors that occurs.

The pattern of if (match = line.match(...)) is similar to above example
of finding all occurences of a pattern by looping with .exec(), lastIndex and "while":

Here it is inside an if statement because you cant always be sure the match will succeed, so make it an if.

To not break the chain of "if" statements,
we assign the result of "match" to a variable
and immediately use that assignement as the test in the if statement.
(talking about the simple early line  "var match;" ?)


    function parseINI(string) {
      // Start with an object to hold the top-level fields (huh?)
      var currentSection = {name: null, fields: []};
      var categories = [currentSection];

      string.split(/\r?\n/).forEach(function(line) {
        var match;
        // first check is a line can be ignored:
        if (/^\s*(;.*)?$/.test(line)) {
          return;
        }
        // if the line is not a comment,
        // then check whether the line starts a new section with []
        else if (match = line.match(/^\[(.*)\]$/)) {
          // if so, create a new "currentSection" object.
          currentSection = {name: match[1], fields: []};
          categories.push(currentSection);
        }
        // last significant option is a line that is a normal setting
        // so add this setting to the current section object.
        else if (match = line.match(/^(\w+)=(.*)$/)) {
          currentSection.fields.push({name: match[1], value: match[2]});
        }
        // any other kind of line, throw an error.
        else {
          throw new Error("Line '" + line + "' is invalid.");
        }
      });

      return categories;
    }



JAVASCRIPT REGEXP DOES NOT PLAY WELL WITH ANY CHARACTER NOT IN THE ENLGISH LANGUAGE.


SUMMARY:

\d  =  same as [0-9], any digit characters
\D  =  any character that is NOT a digit
\w  =  any letter character,  same as [a-zA-Z] ?
\W  =  any NON-LETTER character
\s  =  any white space character (space, tab, newline)
\S  =  any NON-WHITE SPACE characters
.   =  any character except for newline (\n?)

/./  any character EXCEPT new lines
/\b/ a word boundary
/^/  start of input
/$/  End of input

/abc/  A sequence of Characters
/[abc]/  ANY character from a set of characters
/[^abc]/ Any character BUT the ones in the set provided
/[0-9]/ Any character in a range of characters
/(abc)/  a group
/a|b|c/  ANY one OF SEVERAL patterns
/x+/  One OR MORE occurences of the pattern "x"
/x+?/  OPTIONAL, one or more occurences, "non-greedy"
/x*/  ZERO OR MORE occurences
/x?/  OPTIONAL, zero or one occurence
/x{2,4}/  between 2 and 4 occurences


RegExp options:

i  -  case insensitive
g  -  global  (with .replace() will cause it to replace all occurences)


(confirm these)
.test() with "true or false" to see if a match exists.

.exec()  (execute), if there is a match, returns an array containing all matched groups.
.exec()  also has an index property of where the match was found.

.match()
.search()  returns starting index position of a match.

.replace()  can replace matches of a pattern with a designated replacement string.
.replace()  can also be passed a functin as the second argument for what to replace it with.



EXERCISES:

REGEXP GOLF:

    function verify(regexp, yes, no) {
      //Ignore unfinished EXERCISES
      if (regexp.source == "...") {
        return;
      }
      yes.forEach(function(s) {
        if (!regexp.test(s)) {
          console.log("Failure to match '" + s + "'");
        }
      });
      no.forEach(function(s) {
        if (regexp.test(s)) {
          console.log("Unexpected match for '" + s + "'");
        }
      });
      //console.log("If no error messages posted, test passed!");
    }

functin verify() will be provided with 3 arguments (regex, yes, no):
regexp:  the pattern
yes:   which strings should give positive match occurence with the pattern
no:   which strings should NOT give positive match occurence with the pattern

For each of the following items, write a regular expression to test a substring occuring in a string:

//1. car and cat:    car|cat

    //verify(/cat|car/,  //works  - 7
    //verify(/ca(t|r)/,  //works  - 7
    verify(/ca[tr]/,     //works  - 6
           ["my car", "bad cats"],
           ["camper", "high art"]);

//2. pop and prop

    // verify(/pop|prop/,  // works - 8
    verify(/pr?op/,        // works - 5
           ["pop culture", "mad props"],
           ["plop"]);

// 3. ferret, ferry, and ferrari

    verify(/ferr(et|y|ari)/,  // works - 13
           ["ferret", "ferry", "ferrari"],
           ["ferrum", "transfer A"]);

// 4. Any word ending in ious

    verify(/ious\b/,  // works - 6
           ["how delicious", "spacious room"],
           ["ruinous", "consciousness"]);

// 5. A whitespace character followed by a dot, comma, colon, or semicolon

    //verify(/\s\W/,  // works - 4
    verify(/\s[.,:;]/,  // more accurate - 8
           ["bad punctuation ."],
           ["escape the dot"]);

// 6. A word longer than six letters

    verify(/\w{7,}/,    // works - 6
           ["hottentottententen"],
           ["no", "hotten totten tenten"]);

// 7. A word without the letter e

    verify(/\b[^\We]+\b/,
           ["red platypus", "wobbling nest"],
           ["earth bed", "learning ape"]);

    Recall that \W  =  any NON-LETTER character. So it cant be just a white space?



    EXERCISE: QUOTING STYLE:

    In a story, all dialogue is written with  " ' "  single quote marks.
    Want to change them all to "" double quote marks,
    but dont want to replace the occurences in words like "don't".

    var text = "'I'm the cook, ' he said, 'I don't do the dishes.'";
    // "I'm the cook, " he said, "I don't do the dishes."


    // console.log(text.replace(/^\b'|'\b$/g, "\""));  // does not work

    console.log(text.replace(/^'|\W'|'$|'\W/g, "\""));   // almost works (but it removes "." and white space?)
    // "I'm the cook," he said,"I don't do the dishes"


// need the $ method to carry over the character that was matched in \W  (commas, periods, white spaces etc)
// and place them back in again, so they are not dropped.
// they also need to be wrapped in () parentheses.

    console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));
    // "I'm the cook, " he said, "I don't do the dishes."



EXERCISE: NUMBERS AGAIN:

Test for any valid JavaScript number.

// var pattern = /^(+|-)?\d+?\.?\d+[eE]?(+|-)?\d+$/;   // does not work
var pattern = /^(\+|-|)(\d+(\.\d*)?|\.\d+)([eE](\+|-|)\d+)?$/;

(\+|-|) means + or - or nothing.

//Test:
["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4",
 "1e+12"].forEach(function(s) {
  if (!pattern.test(s))
    console.log("Failed to match '" + s + "'");
});
["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5",
 "."].forEach(function(s) {
  if (pattern.test(s))
    console.log("Incorrectly accepted '" + s + "'");
});


RegExp options:

i  -  case insensitive
g  -  global  (with .replace() will cause it to replace all occurences)


(confirm these)
.test() with "true or false" to see if a match exists.

.exec()  (execute), if there is a match, returns an array containing all matched groups.
.exec()  also has an index property of where the match was found.

.match()
.search()  returns starting index position of a match.

.replace()  can replace matches of a pattern with a designated replacement string.
.replace()  can also be passed a functin as the second argument for what to replace it with.
