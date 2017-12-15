Eloquent JavaScript
Project 1 - Electronic lifetimes


Define a world with a "plan"

      var plan = ["############################",
                  "#      #    #      o      ##",
                  "#                          #",
                  "#          #####           #",
                  "##         #   #    ##     #",
                  "###           ##     #     #",
                  "#           ###      #     #",
                  "#   ####                   #",
                  "#   ##       o             #",
                  "# o  #         o       ### #",
                  "#    #                     #",
                  "############################"];


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
  // this outputted string is will be very similar to the plan that was started with at the beginning of the project

      var world = new World(plan, {"#": Wall,
                                   "o": BouncingCritter});

      console.log(world.toString());
        ############################
        #      #    #      o      ##
        #                          #
        #          #####           #
        ##         #   #    ##     #
        ###           ##     #     #
        #           ###      #     #
        #   ####                   #
        #   ##       o             #
        # o  #         o       ### #
        #    #                     #
        ############################


"THIS" IN A FUNCTION:
When a functin isn’t called as a method, this will refer to the global object.
This is a bit of a flaw in ES5, but fixed in ES6?
There are workarounds. A common pattern is to say var self = this and from then on refer to self,
which is a normal variable and thus visible to inner functions.
Another solution is to use the bind method, which allows us to provide
an explicit this object to bind to.

    var test = {
      prop: 10,
      addPropTo: function(array) {
        return array.map(function(elt) {
          return this.prop + elt;
        }.bind(this));
      }
    };
    console.log(test.addPropTo([5]));

The function passed to map is the result of the bind call and thus has
its this bound to the first argument given to bind—the outer functin’s this value
(which holds the test object).

Most standard higher-order methods on arrays, such as forEach and map,
take an optional second argument that can also be used to provide a this
for the calls to the iteration function.
So you could express the previous example in a slightly simpler way:

    var test = {
      prop: 10,
      addPropTo: function(array) {
        return array.map(function(elt) {
          return this.prop + elt;
        }, this); // ← no bind, note the comma
      }
    };
    console.log(test.addPropTo([5]));
    // → [15]

This works only for higher-order functions that support such a context parameter.
When they don’t, you’ll need to use one of the other approaches.

In our own higher-order functions, we can support such a context parameter
by using the call method to call the functin given as an argument.
For example, here is a forEach method for our Grid type,
which calls a given functin for each element in the grid that isn’t null or undefined:

    Grid.prototype.forEach = function(f, context) {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var value = this.space[x + y * this.width];
          if (value != null) {
            f.call(context, value, new Vector(x, y));
          }
        }
      }
    };


ANIMATING THE CRITTERS:

writing a "turn" method that will go over the grid using the forEach method defined above
looking for objects with an act method.
When it finds one, "turn" calls that method to get an action and perform that action if valid.

But need to keep track of which critters have already moved in an array:

    World.prototype.turn = function() {
      var acted = [];
      this.grid.forEach(function(critter, vector) {
        // if the critter has an "act"  && is not in the array "acted" of critters who already moved:
        if (critter.act && acted.indexOf(critter) == -1) {
          // now add them to the "acted" array
          acted.push(critter);
          // perform their action
          this.letAct(critter, vector);
        }
      }, this);
    };

We use the second parameter to the grid’s forEach method
to be able to access the correct this inside the inner functin.
The letAct method contains the actual logic that allows the critters to move.

The "View" object knows about the world and the critters postion in that world

      World.prototype.letAct = function(critter, vector) {
        var action = critter.act(new View(this, vector));
        // for now, only perform is action is "move"
        if (action && action.type == "move") {
          // check if distination is a valid direction
          var dest = this.checkDestination(action, vector);
          // also if destinatio is an empty space ("null")
          if (dest && this.grid.get(dest) == null) {
            // set spot where critter just was to now be empty "null"
            this.grid.set(vector, null);
            // move the critter to the new destination
            this.grid.set(dest, critter);
          }
        }
      };

      // method to check if destination is a valid direction, used above
      World.prototype.checkDestination = function(action, vector) {
        if (directions.hasOwnProperty(action.direction)) {
          var dest = vector.plus(directions[action.direction]);
          if (this.grid.isInside(dest)) {
            return dest;
          }
        }
      };



      function View(world, vector) {
        this.world = world;
        this.vector = vector;
      }
      // the "look" method figures out what coords we are trying to look at
      View.prototype.look = function(dir) {
        var target = this.vector.plus(direction[dir]);
        // check if they are inside the world grid
        if (this.world.grid.isInside(target)) {
          // return that character that sits there
          return charFromElement(this.world.grid.get(target));
        } else {
          // if outside the grid, simply return a wall "#"
          return "#";
        }
      };
      View.prototype.findAll = function(ch) {
        var found = [];
        for (var dir in directions) {
          if (this.look(dir) == ch) {
            found.push(dir);
          }
        }
        return found;
      };
      View.prototype.find = function(ch) {
        var found = this.findAll(ch);
        if (found.length == 0) {
          return null;
        }
        return randomElement(found);
      };


MAKING THE WORLD MOVE:

this method below simple prints out 5 copies of the world one at a time:

      for (i = 0; i < 5; i++) {
        world.turn();
        console.log(world.toString());
      }


To better view this, the courses sandbox provides an animateWorld functin:

      animateWorld(world);



CONTINUE FROM COFFEE SHOP:

controlling direction of critters movement:

a critter thats follows a wall: WallFlower
define an operation (dirPlus(dir, n))   n = notch?
each notch is 45 degrees, so for n = 4 = 4 x 45 degrees = 180 degrees

where dirPlus("n", 1) means turn clockwise 1 unit (45 degrees) from "north" which will = "ne".
where dirPlus("s", -2) means turn counter-clockwise 2 units (-90 degrees) from "south" which will = "e".

In this behavior, the "act" method only has to look at the surroundings,
starting from the left side going clockwise, for the first empty space, and move in that direction:

      function dirPlus(dir, n) {
        var index = directionNames.indexOf(dir);
        return directionNames[(index + n + 8) % 8];
      }

      function WallFollower() {
        this.dir = "s";
      }

      WallFollower.prototype.act = function(view) {
        var start = this.dir;
        // if statement to prevent critter from getting stuck in middle of empty space:
        // does the spot at -135 (behind and left) have something there? (not empty?)
        // if there is something there, make the direction be to -90 degrees of current direction (go left)
        // this basically acts as though the critter just passed an object
        if (view.look(dirPlus(this.dir, -3)) != " ") {
          // this start is required to keep note and check further down, to prevent critter going in circles indefinitely
          start = this.dir = dirPlus(this.dir, -2);
        }
        // while there is something directly ahead (not empty), turn 45 degrees right
        while (view.look(this.dir) != " ") {
          this.dir = dirPlus(this.dir, 1);
          // if direction is now the same as the start (stored above), stop.
          // critter must be walled in
          if (this.dir == start) { break; }
        }
        // direction decided, now move forward
        return {type: "move", direction: this.dir};
      };


ADDING CONCEPTS OF FOOD AND REPRODUCTION:

Food = "energy" which decreases which each action, and increases by eating things
when a creature has enough energy, it undergoes mytosis

Also add plants as source of food that do not move keep growing.

need a different version of the letAct method, to do this
Use INHERITANCE to create LifeLikeWorld which is a prototype based off of the original World prototype
now LifeLikeWorld will provide a new letAct method that will override the original one.


      function LifeLikeWorld(map, legend) {
        World.call(this, map, legend);
      }
      LifeLikeWorld.prototype = Object.create(World.prototype);

      var actionTypes = Object.create(null);

      LifeLikeWorld.prototype.letAct = function(critter, vector) {
        var action = critter.act(new View(this, vector));
        // first check if an action was returned at all
        // then check if handler for this action exists
        // then check if that handler returned true (if it successfully handled the action)
        // the .call(this...) gives handled access to the world with the "this" binding.
        var handled = action && action.type in actionTypes && actionTypes[action.type].call(this, critter, vector, action);
        // if action didnt work for w/e reason, (handled = false),
        // then default action is for critter to just sit still and lose 0.2 energy
        if (!handled) {
          critter.energy -= 0.2;
          // critter dies if energy drops to 0:
          if (critter.energy <= 0) {
            // remove critter from the grid
            this.grid.set(vector, null);
          }
        }
      };



The grow method for plants:  always succeeds and adds 0.5 energy

      actionTypes.grow = function(critter) {
         critter.energy += 0.5;
         return true;
       };


  More advanced movement:

       actionTypes.move = function(critter, vector, action) {
         var dest = this.checkDestination(action, vector);
         // first check if destionation is valid
         // check if critter has enough energy
         // check if destination has something there (not empty or "null")
         if (dest == null || critter.energy <=1 || this.grid.get(dest) != null) {
           // false = take no action
           return false;
         }
         // pass criteria, so take action:
         critter.energy -= 1;
         // original spot where critter was now becomes empty
         this.grid.set(vector, null);
         // critter moves to new spot
         this.grid.set(dest, critter);
         return true;
       };


critter eating action:

      actionTypes.eat = function(critter, vector, action) {
        var dest = this.checkDestination(action, vector);
        // check if a valid destination square?
        // check if destination is not an empty space
        var atDest = dest != null && this.grid.get(dest);
        // destination has an object, now check if that object has energy (is edible):
        if (!atDest || atDest.energy == null) {
          return false;
        }
        // attacking critter gains the energy from the victim:
        critter.energy += atDest.energy;
        // the victim critter is removed from the map:
        this.grid.set(dest, null);
        return true;
      } ;


Reproduction through mytosis:

      actionTypes.reproduce = function(critter, vector, action) {
        // create hypothecial baby on critter's own origin character:
        var baby = elementFromChar(this.legend, critter.originChar);
        // check if there is a valid empty destination
        var dest = this.checkDestination(action, vector);
        // check if destination is valid and empty
        // check if criter has enough energy to have baby
        if (dest == null || critter.energy <= 2 * baby.energy || this.grid.get(dest) != null) {
          return false;
          // no baby happens
        }
        // reporduciton happens, and costs critter 2 x energy of newborn critter:
        critter.energy -= 2 * baby.energy;
        // baby is placed on the grid:
        this.grid.set(dest, baby);
        return true;
      };


Need new critters that have energy property:

      function Plant() {
        // plant energy level starts between 3 and 7: (this is so they don't all reproduce on the same turn)
        this.energy = 3 + Math.random() * 4;
      }
      Plant. prototype.act = function(view) {
        // when plant reaches 15 energy and there is empty space nearby, reproduce to that empy space
        if (this.energy > 15) {
          var space = view.find(" ");
          if (space) {
            return {type: "reproduce", direction: space};
          }
        }
        // keep growing until it reaches max of 20 energy
        if (this.energy < 20) {
          return {type: "grow"};
        }
      };


      function PlantEater() {
        // starting energy level of critter:
        this.energy = 20;
      }
      PlantEater.prototype.act = function(view) {
        // look for empty space around critter
        var space = view.find(" ");
        // if critter has enough energy and empty space, reproduce to that empty space
        if (this.energy > 60 && space) {
          return {type: "reproduce", direction: space};
        }
        // look for plant in vicinity:
        var plant = view.find("*");
        // if there is one, eat it
        if (plant) {
          return {type: "eat", direction: plant};
        }
        // if there is an empty space, move towards that space
        if (space) {
          return {type: "move", direction: space};
        }
      };



      // NEW WORLD WITH PLANTS AND HERBAVORES:

      var valley = new LifelikeWorld(
          ["############################",
           "#####                 ######",
           "##   ***                **##",
           "#   *##**         **  O  *##",
           "#    ***     O    ##**    *#",
           "#       O         ##***    #",
           "#                 ##**     #",
           "#   O       #*             #",
           "#*          #**       O    #",
           "#***        ##**    O    **#",
           "##****     ###***       *###",
           "############################"],
          {"#": Wall,
           "O": PlantEater,
           "*": Plant}
        );
