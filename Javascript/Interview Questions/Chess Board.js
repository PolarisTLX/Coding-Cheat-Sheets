//my shorter/improved version:
var height = 8;
var width = 8;

for ( i =1; i <= height  ; i++) {
  var runningWidth = width;
  var row = "";
  if ( i%2 == 0 ) {
    while ( runningWidth > 0) {
      row += " #";
      runningWidth -= 2;
    }
    console.log(row);
    runningWidth = width;
  } else {
    while ( runningWidth > 0) {
      row += "# ";
      runningWidth -= 2;
    }
    console.log(row);
    runningWidth = width;
  }
}

//my original that is slightly longer with an extra "count" variable that flips after each row
var height = 8;
var width = 8;
var count = 1;

for ( i =1; i <= height  ; i++) {
  var runningWidth = width;
  var row = "";
  if ( count == 1) {
    while ( runningWidth > 0) {
      row += " #";
      runningWidth -= 2;
    }
    console.log(row);
    count = -count;
    runningWidth = width;
  } else {
    while ( runningWidth > 0) {
      row += "# ";
      runningWidth -= 2;
    }
    console.log(row);
    count = -count;
    runningWidth = width;
  }
}


//shortest version:
var height = 8;
var width = 8;
var board = "";

for (var y = 0; y < height; y++) {
  for (var x = 0; x < width; x++) {
    if ((x + y) % 2 == 0) {
      board += " ";
    } else {
      board += "#";
    }
  }
  board += "\n";
}

console.log(board);
