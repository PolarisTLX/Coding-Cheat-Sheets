POLYMORPHISM EXAMPLE:  Laying Out a Table
will write a program that, given an array of arrays of tables,
builds up a string that contains a nicely laid out table (column and rows are lined up and straight):

the builder function(){} will ask each cell how wide and high it wants to be
and then use this information to determine the width of the columns and the height of the rows.
The builder functin will then ask the cells to draw themselves at the correct size
and assemble the results into a single string.
The layout program will communicate with the cell objects through a well-defined interface.

The interface will be:

minHeight(), minWidth(),
draw(width, height): returns an array of length "height",
which contains a series of strings that are each "width" characters wide
This is the contents of each cell


This part computes arrays of minimum column widths and row heights
The "rows" variable will hold an array of arrays (each representing a row of cells)
ie, "rows" is vertical, and each notch is all the data of that row, rows[0] is on top, rows[1] is below that

// finds the max height(?) present in each horizontal row
function rowHeights(rows) {
  return rows.map(function(row) {
    return row.reduce(function(max, cell) {
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}

// .map is because each row in rows needs to have a value
// .reduce because 1 row is an array reduced to just one value that we are looking for
// (either height of width)

// finds the widest word
function colWidths(rows) {
  return rows[0].map(function(_, i) {
    // underscore (_) means that this argument is not going to be used.
    return rows.reduce(function(max, row) {
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

/* .map( , )'s second argument:
it passes a second argument to the function it is given:
the index of the current element.
By mapping over the elements of the first row and only using the mapping function’s second argument,
colWidths builds up an array with one element for every column index. */


the code to draw a table:

function drawTable(rows) {
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(function(block) {
      return block[lineNo];
    }).join(" ");
  }

  // draws all rows and then joins then together with "\n"
  function drawRow(row, rowNum) {
    var blocks = row.map(function(cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum]);
    });
    return blocks[0].map(function(_, lineNo) {
      return drawLine(blocks, lineNo);
    }).join("\n");
  }

  return rows.map(drawRow).join("\n");
}

// helper for the constructor, used later
//builds a string of value = (string's argument x times)
// this is for the adding the blank padding to either side of the words
function repeat(string, times) {
  var result = "";
  for (i = 0; i < times; i++) {
    result += string;
  }
  return result;
}


// CONSTRUCTOR
// main constructor:
function TextCell(text) {
  this.text = text.split("\n");
}

// adding 3 properties to the constructor "TextCell"
TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
  }, 0);
};

TextCell.prototype.minHeight = function() {
  return this.text.length;
};

TextCell.prototype.draw = function(width, height) {
  var result = [];
  for (i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};


// bulding a 5 x 5 checkerboard:

var rows = [];
for (i = 0; i < 5; i++) {
  var row = [];
  for (j = 0; j < 5; j++) {
    if ((j + i) % 2 == 0) {
      row.push(new TextCell('##'));
    } else {
      row.push(new TextCell("  "));
    }
    rows.push(row);
  }
}


console.log(drawTable(rows));
// → ##    ##    ##
//      ##    ##
//   ##    ##    ##
//      ##    ##
//   ##    ##    ##



Now with a more elaborate example:

    var MOUNTAINS = [
      {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
      {name: "Everest", height: 8848, country: "Nepal"},
      {name: "Mount Fuji", height: 3776, country: "Japan"},
      {name: "Mont Blanc", height: 4808, country: "Italy/France"},
      {name: "Vaalserberg", height: 323, country: "Netherlands"},
      {name: "Denali", height: 6168, country: "United States"},
      {name: "Popocatepetl", height: 5465, country: "Mexico"}
    ];

    // this is not needed:
    // if (typeof module != "undefined" && module.exports)
    //   module.exports = MOUNTAINS;


We want to highlight the top row, which contains the column names,
by underlining the cells with a series of dash characters.
No problem—we simply write a cell type that handles underlining:

    function UnderlinedCell(inner) {
      this.inner = inner;
    }
    UnderlinedCell.prototype.minWidth = function() {
      return this.inner.minWidth();
    };
    UnderlinedCell.prototype.minHeight = function() {
      return this.inner.minHeight() + 1;
    };
    UnderlinedCell.prototype.draw = function(width, height) {
      return this.inner.draw(width, height - 1)
        .concat([repeat("-", width)]);
    };

An underlined cell contains another cell. It reports its minimum size as being
the same as that of its inner cell (by calling through to that cell’s minWidth and minHeight methods)
but adds one to the height to account for the space taken up by the underline.

Having an underlining mechanism, we can now write a function that builds up a grid of cells from our data set.

    function dataTable(data) {
      var keys = Object.keys(data[0]);
      var headers = keys.map(function(name) {
        return new UnderlinedCell(new TextCell(name));
      });
      var body = data.map(function(row) {
        return keys.map(function(name) {
          return new TextCell(String(row[name]));
        });
      });
      return [headers].concat(body);
    }

    console.log(drawTable(dataTable(MOUNTAINS)));

// OUTPUT:

    name         height country
    ------------ ------ -------------
    Kilimanjaro  5895   Tanzania
    Everest      8848   Nepal
    Mount Fuji   3776   Japan
    Mont Blanc   4808   Italy/France
    Vaalserberg  323    Netherlands
    Denali       6168   United States
    Popocatepetl 5465   Mexico


IMPORTANT:
The standard Object.keys function(){} returns an array of property names in an object.

The top row of the table must contain underlined cells that give the names of the columns.
Below that, the values of all the objects in the data set appear as normal cells—
we extract them by mapping over the keys array so that we are sure that
the order of the cells is the same in every row.



To align the numbers column to the right:


Create another cell type that is like TextCell,
but that adds padding to the lines on the left side instead of the right side.

INHERITANCE:
To avoid writting a whole new constructor with all three methods,
we can do something clever, because prototypes may themselves have prototypes:

Inheritance allows us to build slightly different data types from existing data types with relatively little work.

RTextCell becomes basically equivalent to a TextCell,
except that its draw method contains a different function.

    function RTextCell(text) {
      TextCell.call(this, text);
    }
    RTextCell.prototype = Object.create(TextCell.prototype);
    RTextCell.prototype.draw = function(width, height) {
      var result = [];
      for (i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(repeat(" ", width - line.length) + line);
      }
      return result;
    };

The new constructor will call the old constructor (using the call method
in order to be able to give it the new object as its this value).
Once this constructor has been called, we can assume that all the fields
that the old object type is supposed to contain have been added.

We want the new prototype to derive from the old prototype
so it will also have access to the same properties.

Finally, we can override some of these properties by adding them to our new prototype.

Now adjust the dataTable function to use RTextCell for cells whose value is a number

      function dataTable(data) {
        var keys = Object.keys(data[0]);
        var headers = keys.map(function(name) {
          return new UnderlinedCell(new TextCell(name));
        });
        var body = data.map(function(row) {
          return keys.map(function(name) {
            var value = row[name];
            // This is what changed:
            if (typeof value == "number") {
              return new RTextCell(String(value));
            } else {
              return new TextCell(String(value));
            }
          });
        });
        return [headers].concat(body);
      }

      console.log(drawTable(dataTable(MOUNTAINS)));

      // RESULT:

      name         height country
      ------------ ------ -------------
      Kilimanjaro    5895 Tanzania
      Everest        8848 Nepal
      Mount Fuji     3776 Japan
      Mont Blanc     4808 Italy/France
      Vaalserberg     323 Netherlands
      Denali         6168 United States
      Popocatepetl   5465 Mexico


NOTE:  inheritance is often confused with polymorphism.
inheritance fundamentally ties types together, and can creat tangle in your code.
You should see it as a slightly dodgy trick that can help you define new types with little code

A preferable way to extend types is through composition,
such as how UnderlinedCell builds on another cell object
by simply storing it in a property and forwarding method calls to it in its own methods.
