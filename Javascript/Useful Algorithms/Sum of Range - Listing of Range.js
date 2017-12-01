// create an array of all numers in a range:
function arrayFromRange(start, end) {
  array = [];
  for (i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}

// sum up all numbers between a start to and end (including the end)
function range(start, end) {
  sum = 0;
  for (i = start; i <= end; i++) {
    sum += i;
  }
  return sum;
}

// takes an array and calculates the sum
function rangeArray(array) {
  sum = 0;
  for (i = array[0]; i <= array[array.length -1]; i++) {
    sum += i;
  }
  return sum;
}

// make array between a start to an end (including the end) with optional steps
// if no 3rd step argument provided, default is 1.
// made to work with negative steps as well
function rangeStep(start, end, step) {
  array = [];
  // make sure it works with a negative step:
  if (end < start) {
    if (step == undefined) {
      step = -1;
    }
    for (i = start; i >= end; i += step) {
      array.push(i);
    }
  } else {
    if (step == undefined) {
      step = 1;
    }
    for (i = start; i <= end; i += step) {
      array.push(i);
    }
  }
  return array;
}
