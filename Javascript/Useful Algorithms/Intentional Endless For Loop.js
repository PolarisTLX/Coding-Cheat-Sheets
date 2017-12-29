// WARNING: this code if done improperly can run endlessly and eat up CPU and RAM and crash the PC.

// the key here is the for (;;) {} which is a construct to create a loop that will not terminate on it's own
// this example will keep prompting a user until user provides a valid input.
// it is not a perfect example

function promptDirection(question) {
  var result = Number(prompt(question, ""));
  if (isNaN(result)) {
    // return null;
    return "That is not a valid direction from 0-9";
  } else { return result; }
}

for (;;) {
  try {
    var direction = promptDirection("Where to? (please select from 0-9)");
    console.log("You chose: ", direction);
    break;
  } catch (e) {
    console.log("Not a valid direction. Try again.");
  }
}


// OR  DONE AS JUST ONE FUNCTION (is not a perfect example)

for (;;) {
  try {
    var direction = prompt("Where to? (please select from 0-9)", "");
    if (!isNaN(direction)) {
      console.log("You chose ", direction);
      break;
    }
  } catch (e) {
    console.log("Not a valid direction. Try again.");
  }
}
