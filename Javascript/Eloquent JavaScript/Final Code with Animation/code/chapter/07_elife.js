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

var world = new World(plan, {"#": Wall,
                             "o": BouncingCritter});
//   #      #    #      o      ##
//   #                          #
//   #          #####           #
//   ##         #   #    ##     #
//   ###           ##     #     #
//   #           ###      #     #
//   #   ####                   #
//   #   ##       o             #
//   # o  #         o       ### #
//   #    #                     #
//   ############################

Grid.prototype.forEach = function(f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.space[x + y * this.width];
      if (value != null)
        f.call(context, value, new Vector(x, y));
    }
  }
};

World.prototype.turn = function() {
  var acted = [];
  this.grid.forEach(function(critter, vector) {
    if (critter.act && acted.indexOf(critter) == -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
};

World.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  if (action && action.type == "move") {
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null);
      this.grid.set(dest, critter);
    }
  }
};

World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest))
      return dest;
  }
};

function View(world, vector) {
  this.world = world;
  this.vector = vector;
}
View.prototype.look = function(dir) {
  var target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target))
    return charFromElement(this.world.grid.get(target));
  else
    return "#";
};
View.prototype.findAll = function(ch) {
  var found = [];
  for (var dir in directions)
    if (this.look(dir) == ch)
      found.push(dir);
  return found;
};
View.prototype.find = function(ch) {
  var found = this.findAll(ch);
  if (found.length == 0) return null;
  return randomElement(found);
};

function dirPlus(dir, n) {
  var index = directionNames.indexOf(dir);
  return directionNames[(index + n + 8) % 8];
}

function WallFollower() {
  this.dir = "s";
}

WallFollower.prototype.act = function(view) {
  var start = this.dir;
  if (view.look(dirPlus(this.dir, -3)) != " ")
    start = this.dir = dirPlus(this.dir, -2);
  while (view.look(this.dir) != " ") {
    this.dir = dirPlus(this.dir, 1);
    if (this.dir == start) break;
  }
  return {type: "move", direction: this.dir};
};

function LifelikeWorld(map, legend) {
  World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);

var actionTypes = Object.create(null);

LifelikeWorld.prototype.letAct = function(critter, vector) {
  var action = critter.act(new View(this, vector));
  var handled = action &&
    action.type in actionTypes &&
    actionTypes[action.type].call(this, critter,
                                  vector, action);
  if (!handled) {
    critter.energy -= 0.2;
    if (critter.energy <= 0) {
      //console.log("Energy = " + critter.energy + ". Critter dies");
      this.grid.set(vector, null);
    }
  }
};

actionTypes.grow = function(critter) {
  critter.energy += 0.5;
  return true;
};

actionTypes.move = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  if (dest == null ||
      critter.energy <= 1 ||
      this.grid.get(dest) != null)
    return false;
  critter.energy -= 0.75;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  //after moving, incease number of movements by 1:
  //NOTE!!! must be CRITTER.numMoves, not THIS.numMoves
  critter.numMoves += 1;
  //console.log(critter.numMoves);
  return true;
};

actionTypes.eat = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  var atDest = dest != null && this.grid.get(dest);
  if (!atDest || atDest.energy == null)
    return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

//plants reproduce slower (- 2 * baby.energy) for balance
actionTypes.reproducePlant = function(critter, vector, action) {
  var baby = elementFromChar(this.legend,
                             critter.originChar);
  var dest = this.checkDestination(action, vector);
  if (dest == null ||
      critter.energy <= 2 * baby.energy ||
      this.grid.get(dest) != null)
    return false;
  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};
actionTypes.reproduceAnimal = function(critter, vector, action) {
  var baby = elementFromChar(this.legend,
                             critter.originChar);
  var dest = this.checkDestination(action, vector);
  if (dest == null ||
      critter.energy <= 2 * baby.energy ||
      this.grid.get(dest) != null)
    return false;
  critter.energy -= baby.energy;
  this.grid.set(dest, baby);
  return true;
};

function Plant() {
  this.energy = 3 + Math.random() * 3;
}
Plant.prototype.act = function(view) {
  if (this.energy > 20) {
    var space = view.find(" ");
    if (space)
      return {type: "reproducePlant", direction: space};
  }
  if (this.energy < 20)
    return {type: "grow"};
};

function PlantEater() {
  this.energy = 20;
}
PlantEater.prototype.act = function(view) {
  var space = view.find(" ");
  if (this.energy > 60 && space)
    return {type: "reproduceAnimal", direction: space};
  var plant = view.find("*");
  if (plant)
    return {type: "eat", direction: plant};
  if (space)
    return {type: "move", direction: space};
};


function SmartPlantEater() {
  // starting energy level of critter:
  this.energy = 20;
  this.numMoves = 0;
}
SmartPlantEater.prototype.act = function(view) {
  // look for empty space around critter
  var space = view.find(" ");
  // if critter has enough energy and empty space, reproduce to that empty space
  // NOTE: updated to only reproduce if has been less than 10 moves since last eating
  if (this.energy > 60 && space && this.numMoves < 10) {
    console.log("reproducing");
    return {type: "reproduceAnimal", direction: space};
  }
  // look for plant in vicinity:
  var plant = view.find("*");
  // if there is one, and has moved more than 1, eat it
  if (plant && this.numMoves > 1) {
    console.log("Eating");
    this.numMoves = 0;
    //NOTE!!! in this function, use "this."  not "critter."
    return {type: "eat", direction: plant};
  }
  // if there is an empty space, move towards that space
  if (space) {
    return {type: "move", direction: space};
  }

};



//new criter that steals some of the movement direction from BouncingCritter to be less endless wandering
function WisePlantEater() {
  // starting energy level of critter:
  this.energy = 20;
  // start off in a random direction, like "BouncingCritter"
  // generate a random direction of n,s,e,w
  this.direction = randomElement(directionNames);
  this.numMoves = 0;
};

WisePlantEater.prototype.act = function(view) {
  // console.log(this.numMoves);
  // console.log(this.direction);

  //same as SmartPlantEater:

  // if critter has enough energy and empty space, reproduce to that empty space
  // look for empty space around critter
  var space = view.find(" ");
  // NOTE: updated to only reproduce if has been less than 10 moves since last eating
  if (this.energy > 50 && space && this.numMoves < 10) {
    console.log("Herbivore Reproducing");
    return {type: "reproduceAnimal", direction: space};
  }

  // look for plant in vicinity:
  var plant = view.find("*");
  // if there is one, and has moved more than 1, eat it
  if (plant && this.numMoves > 0) {
    console.log("Herbivore Eating");
    this.numMoves = 0;
    //NOTE!!! in this function, use "this."  not "critter."
    return {type: "eat", direction: plant};
  }

  //this movement has been modified to be more like BouncingCritter:

  // to prevent a return of "null" if critter is somehow trapped with no empty spaces
  if (view.look(this.direction) != " ") {
    this.direction = view.find(" ") || "s";
  }
  // if critter has not encountered anything after 5 moves, change to new random direction
  if (this.numMoves > 5) {
    // console.log("Changing direction");
    this.direction = randomElement(directionNames);
    // console.log("new direction is: " + this.direction);
    this.numMoves = 0;
  }
  if (this.energy <= 0) {
    console.log("Herbavore dies");
  }
  return {type: "move", direction: this.direction};

};






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
   "O": WisePlantEater,
   "*": Plant}
);
// var valley = new LifelikeWorld(
//   ["############################",
//    "#                          #",
//    "#                          #",
//    "#                          #",
//    "#                          #",
//    "#                          #",
//    "#            O             #",
//    "#                          #",
//    "#                          #",
//    "#                          #",
//    "#                          #",
//    "#                          #",
//    "############################"],
//   {"#": Wall,
//    "O": WisePlantEater,
//    "*": Plant}
// );


//NOW with Predators:


function Tiger() {

  // starting energy level of critter:
  this.energy = 40;
  // start off in a random direction, like "BouncingCritter"
  // generate a random direction of n,s,e,w
  this.direction = randomElement(directionNames);
  this.numMoves = 0;
};

Tiger.prototype.act = function(view) {

  // if Tiger has enough energy and empty space, reproduce to that empty space
  // look for empty space around critter
  var space = view.find(" ");
  // NOTE: updated to only reproduce if has been less than 10 moves since last eating
  if (this.energy > 100 && space && this.numMoves < 10) {
    console.log("Tiger Reproducing");
    return {type: "reproduceAnimal", direction: space};
  }

  // look for plant in vicinity:
  var prey = view.find("O");
  // if there is one, and has gone more than 2 moves since last meal, eat it
  if (prey && this.numMoves > 3) {
    console.log("Tiger Eating");
    this.numMoves = 0;
    //NOTE!!! in this function, use "this."  not "critter."
    return {type: "eat", direction: prey};
  }

  // to prevent a return of "null" if critter is somehow trapped with no empty spaces
  if (view.look(this.direction) != " ") {
    this.direction = view.find(" ") || "s";
  }
  // if critter has not encountered anything after 5 moves, change to new random direction
  if (this.numMoves > 5) {
    // console.log("Changing direction");
    this.direction = randomElement(directionNames);
    // console.log("new direction is: " + this.direction);
    this.numMoves = 0;
  }
  if (this.energy < 1) {
    console.log("Tiger dies");
  }
  return {type: "move", direction: this.direction};

};


var huntingGrounds = new LifelikeWorld(
  ["####################################################",
   "#                 ####         ****              ###",
   "#   *  @  ##                 ######         OO    ##",
   "#   *    ##        O O                 ****       *#",
   "#         *                           #######     *#",
   "#        ***  *         ****                     **#",
   "#* **  #  *  ***       ####                      **#",
   "#* **  #      *               #   *              **#",
   "#     ##  O                   #  ***          ######",
   "#*            @       #           *        O  #    #",
   "#*                       ###                    ** #",
   "###          ****          ***                  ** #",
   "#       O                        @         O       #",
   "#   *     ##          ##               ###      *  #",
   "#   **         #              *       #####  O     #",
   "##  **  O   O  #  #    ***  ***        ###      ** #",
   "###               #   *****                    ****#",
   "####################################################"],
  {"#": Wall,
   "@": Tiger,
   "O": WisePlantEater,
   "*": Plant}
);

// var huntingGrounds = new LifelikeWorld(
//   ["############################",
//    "#                          #",
//    "#                          #",
//    "#                          #",
//    "#                          #",
//    "#  *********************   #",
//    "#            O             #",
//    "#  *********************   #",
//    "#                          #",
//    "#                          #",
//    "#                          #",
//    "#                          #",
//    "############################"],
//    {"#": Wall,
//     "O": WisePlantEater,
//     "*": Plant}
// );
