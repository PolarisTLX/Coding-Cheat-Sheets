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
