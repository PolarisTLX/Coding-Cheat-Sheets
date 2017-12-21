ERROR PROPOGATION:
How to handle invalid user inputs:

Say you have a functin that asks the user for a whole number and returns it.
What should it return if the user inputs "orange"?

One option is to make it return a special value. Common choices for such values are null and undefined.

function promptNumber(question) {
  var result = Number(prompt(question, ""));
  if (isNaN(result)) {
    // return null;
    return "That is not a valid number";
  } else { return result; }
}
console.log(promptNumber("How many tree do you see?"));
