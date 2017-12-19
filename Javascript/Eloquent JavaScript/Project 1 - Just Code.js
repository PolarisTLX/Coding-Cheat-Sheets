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


function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};

var grid = ["top left",    "top middle",    "top right",
            "bottom left", "bottom middle", "bottom right"];

function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}
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



var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};


function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");


function BouncingCritter() {
  this.direction = randomElement(directionNames);
};

BouncingCritter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};


function elementFromChar(legend, ch) {
  if (ch == " ")
    return null;
  var element = new legend[ch]();
  element.originChar = ch;
  return element;
}

function World(map, legend) {
  var grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function(line, y) {
    for (var x = 0; x < line.length; x++)
      grid.set(new Vector(x, y),
               elementFromChar(legend, line[x]));
  });
}

function charFromElement(element) {
  if (element == null)
    return " ";
  else
    return element.originChar;
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

function Wall() {}

var world = new World(plan,
  {"#": Wall,
   "o": BouncingCritter}
);

//console.log(world.toString());
//works up to here



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
  var target = this.vector.plus(directions[dir]);
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


//ANIMATE 5 turns:
for (i = 0; i < 5; i++) {
  world.turn();
  console.log(world.toString());
}
// WORKS UP TO here



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


//ADDING CONCEPTS OF FOOD AND REPRODUCTION:


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



//The grow method for plants:  always succeeds and adds 0.5 energy

actionTypes.grow = function(critter) {
   critter.energy += 0.5;
   return true;
 };


//More advanced movement:

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


//critter eating action:

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


//Reproduction through mytosis:

// actionTypes.reproduce = function(critter, vector, action) {
actionTypes.reproducePlant = function(critter, vector, action) {
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
  // reporduciton happens, and costs critter -energy of newborn critter:
  // critter.energy -= 2 * baby.energy;
  critter.energy -= baby.energy;
  // baby is placed on the grid:
  this.grid.set(dest, baby);
  return true;
};


//Need new critters that have energy property:

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

var valley = new LifeLikeWorld(
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

//to animate 5 times:

/*NOTE PREVIOUS EXAMPLE:
for (i = 0; i < 5; i++) {
  world.turn();
  console.log(world.toString());
}
*/

//NOW THIS VALLEY EXAMPLE:
for (i = 0; i < 5; i++) {
  valley.turn();
  console.log(valley.toString());
}

// WORKS UP TO here
