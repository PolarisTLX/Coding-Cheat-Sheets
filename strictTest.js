function canYouSpotTheProblem() {
  "use strict";
  for ( i = 0 ; i < 10 ; i++ ) {
    console.log("Happy Function");
  }
}

canYouSpotTheProblem();
// ReferenceError: i is not defined  ("var =" is missing)
// this error will not occur if "use strict" is not present
