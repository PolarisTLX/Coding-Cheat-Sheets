Eloquent JavaScript
Project 1 - Electronic lifetimes


The grid that models the world using a fixed H & W:

    function Vector(x, y) {
      this.x = x;
      this.y = y;
    }

    Vector.prototype.plus = function(other) {
      return new Vector(this.x + other.x, this.y + other.y);
    };


A "grid" is part of a "world", but a seperate object
which will be a property of a "world" object


/* //simpler looking method, but not used in book example
One method to store grid of values:
using an array of row arrays and two properties to get to a specific square:

    var grid = [["top left", "top middle", "top right"],
                ["bottom left", "bottom middle", "bottom right"]];

    console.log(grid[1][2]);
    // bottom right
*/


//don't like this one
another method to store grid of values:
use a single array with size of W x H,
the element at (x, y) is found at position "x + (y x Width)" in the array

    var grid = ["top left", "top middle", "top right", "bottom left", "bottom middle", "bottom right"];

    console.log(grid[2 + (1 * 3)]);
    // "bottom right"



code to define the grid object with some basic methods:

    function Grid(width, height) {
      this.space = new Array(width * height);
      this.width = width;
      this.height = height;
    }
    // add a method that checks if a position(x & y vector) exists within the world:
    Grid.prototype.isInside = function(vector) {
      return vector.x >= 0 && vector.x < this.width &&
             vector.y >= 0 && vector.y < this.height;
    };
    Grid.prototype.get = function(vector) {
      return this.space[vector.x + this.width * vector.y];
    };
    Grid.prototype.set = function(vector, value) {
      this.space[vector.x + this.width * vector.y] = value;
    };


test:
    var grid = new Grid(5, 5);
    console.log(grid.get(new Vector(1, 1)));
    // undefined

    grid.set(new Vector(1, 1), "X");
    console.log(grid.get(new Vector(1, 1)));
    // X

    console.log(grid.isInside(new Vector(4, 4)));
    // true  (because the grid is 5x5)

    console.log(grid.isInside(new Vector(6, 6)));
    // false  (because the grid is 5x5)


CRITTERS:
the world will ask what actions the critters want to take:
each critter object has  method "act", which return an action when called

and action is an object with a property "type", which names the type of action the critter wants to take
example: "move"
it may also hold addition information such as direction

when the "act" method is called, the critters are given a "view" object
that allows critters to inspect surroundings in the world.
The 8 surrounding squares are given directions "n" for north, "ne" for northeast, etc.

      // NOTE north is negative?  and east is positive
      var directions = {
        "n": new Vector(0, -1),
        "ne": new Vector(1, -1),
        "e": new Vector(1, 0),
        "se": new Vector(1, -1),
        "s": new Vector(0, 1),
        "sw": new Vector(-1, 1),
        "w": new Vector(-1, 0),
        "nw": new Vector(-1, -1),
      };

The "view" object has a method "look", which takes a direction and returns a character:
example it returns "#" when there is a wall, " " when there is nothing.

it also has methods "find" and "findAll". Both take a map character as an argument.
"find" returns a direction which a specific character can be found in the 8 spaces next to the critter,
or "null" if none of that character exist in those 8 spaces.

"findAll" returns an array containing all of the 8 spaces that contain the character in question.
Example: If critter is sitting west of a wall of "#"s,
"findAll" for character "#" will return ["ne","e","se"].


      function randomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
      }
      var directionNames = "n ne e se s sw w nw".split(" ");


Simple dumb critter:  simply goes straight till it hits something and bounces off in a random direction:

      function BouncingCritter() {
        // generate a random direction of n,s,e,w
        this.direction = randomElement(directionNames);
      };

      BouncingCritter.prototype.act = function(view) {
        // to prevent a return of "null" if critter is somehow trapped with no empty spaces
        if (view.look(this.direction) != " ") {
          this.direction = view.find(" ") || "s";
        }
        return {type: "move", direction: this.direction};
      };


THE WORLD OBJECT:
it takes a plan and a legend as arguments
the plan is grid made of and array of strings earlier

the legend tells us what each character in the map means,
every character will have a constructor, except for the empty space character, which will be "null"


      function elementFromChar(legend, ch) {
        // for empty space:
        if (ch == " ") {
          return null;
        }
        var element = new legend[ch]();
        // below is to make it easy to find what the character the element was originally created from
        element.originChar = ch;
        return element;
      }

      function World(map, legend) {
        var grid = new Grid(map[0].length, map.length);
        this.grid = grid;
        this.legend = legend;

        map.forEach(function(line, y) {
          for (var x = 0; x < line.length; x++) {
            grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
          }
        });
      }

      function charFromElement(element) {
        if (element == null) {
          return " ";
        } else {
          return element.originChar;
        }
      }

      World.prototype.toString = function() {
        var output = "";
        for (var y = 0; y < this.grid.height; y++) {
          for (var x = 0; x < this.grid.width; x++) {
            var element = this.grid.get(new Vector(x, y));
            output += charFromElement(element);
          }
          output += "\n";
        }
        return output;
      };


  the "wall" object is simple and has no "act" method:

      function Wall(){}


  first attempt a creating a world:

      var world = new World(plan, {"#": Wall,
                                   "o": BouncingCritter});

      console.log(world.toString());
