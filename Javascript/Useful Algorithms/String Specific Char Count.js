You can get the Nth character, or letter, from a string
by writing "string".charAt(N),
similar to how you get its length with "s".length.

1. Write a function countBs that takes a string as its only argument
and returns a number that indicates how many uppercase “B” characters are in the string.

2. Next, write a function called countChar that behaves like countBs,
except it takes a second argument that indicates the character that is to be counted
(rather than counting only uppercase “B” characters).
3. Rewrite countBs to make use of this new function.


console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4


function countBs(string) {
  count = 0;
  for (N = 0; N < string.length; N++){
    if ( string.charAt(N) == "B") {
      count++;
    }
  }
  return count;
}

function countChar(string, char) {
  count = 0;
  for (N = 0; N < string.length; N++){
    if ( string.charAt(N) == char) {
      count++;
    }
  }
  return count;
}

// this part dow not seem very useful in this example.
3. Rewrite countBs to make use of this new function.
function countBs(string) {
  return countChar(string, "B");
}
