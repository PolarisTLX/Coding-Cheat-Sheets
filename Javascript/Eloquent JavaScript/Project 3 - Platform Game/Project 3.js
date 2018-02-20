CHAPTER 16 - PROECT 3 of ELOQUENT JAVASCRIPT (3RD EDITION)

The game will consist of a fixed background, laid out like a grid.
The moving elements will be overlaid on top of that grid.
Each field/square on that grid will either be empty, solid or lava.
Moving elements will be: player, coins or lava.

The player needs to collect all the coins in each level.
If player touches lava, the level is restarted to be tried again.

To allow movement to be fluid and smooth, the position of moving elements may be fractional.

We create DOM elements and use styling to give them color, size and position.

The background can be presented as a table since it is an unchanging grid of squares.
The moving elements can be absolutely positioned elements.

Another way this game could be done is through the <canvas> tag,
which uses pixels instead of DOM elements, but that is for a later chapter.


LEVELS:

Since everything will start out on a grid, we can use long strings,
where each character represents an element.


The plan for a small level might look like this:

      var simpleLevelPlan = `
      ......................
      ..#................#..
      ..#..............=.#..
      ..#.........o.o....#..
      ..#.@......#####...#..
      ..#####............#..
      ......#++++++++++++#..
      ......##############..
      ......................`;


Empty space = .
Walls = #
Coins = O
Player = @
Lava =  +
Swaying stationary lava = "="
Vertical moving lava = |
Dripping lava = v


READING A LEVEL:

NOTE THIS IS ES6 and USING "classes", need to go back and review this.

This class stores a "level" as an object.
The argument provided to it is a string that defines a level.


class Level {
  constructor(plan) {
    let rows = plan.trim().split("\n").map(r => r.split(""));
    // the trim method removes whitespace at the start and end of the string.

    //the remaining string is split on newline characters "\n"
    // and the lines are split on the empty string.
    // which will split after every character and produce an array of characters.
    // So "rows" becomes an array, each item in that array is 1 rowm which is an array being an arrays of characters,
    // each row (array of characters) is one horizontal line of the level.

    // the level's height is "rows.length" (the number of rows)
    // the level's width is "rows[0].length" (the length of one of the rows)
    this.height = rows.length;
    this.width = rows[0].length;

    // we must separate the moving elements from the background level.
    // These will be called "actors"
    // and will be stored in an array of objects.
    this.startActors = [];

    // The background will be an array of arrays of strings,
    // holding "empty", "wall" or "lava"
    this.rows = rows.map((row, y) => row.map((ch, x) => {
      // to do this we map over the rows, then over the content of each row.
      // recall the 2nd argument in .map() is the array index.
      // so the index of rows is the vertical "y"
      // and the index of any individual row, is the horizontal "x"

      // we can also tell the coordinate of any character by their x and y.
      // top left = 0,0 coord.  and each square is 1 x 1 size.

      // The levelChars object is used to interpret characters in the level.
      // it holds a string for background characters,
      // or a class for the moving actor elements.
      let type = levelChars[ch];
      // if the type is an actor class, the .create() creates an object
      // and this is added to "startActors" with .push()
      if (typeof type == "string") return type;
      this.startActors.push(type.create(new Vec(x, y), ch));
      // the coordinates of an actor is stored as a object "Vec" which has x & y properties
      return "empty";
      // it returns "empty" for background squares.
    }));
  }
}



As different moving elements, actors, dissappear from the game, such as going being collected,
we keep trakc of this with a "State" class:

class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    // status is set to "lost" or "won" when the game has ended:
    this.status = status;
  }

  static start(level) {
    return new State(level, level.startActors, "playing");
  }

  get player() {
    return this.actors.find(a => a.type == "player");
  }
}
// This is a persistant data structure?
// updating the game state creates a new state, and leaves the old one intact?


ACTORS / MOVING ELEMENTS

Actor objects represent the current position and state of a given moving element.
The interface for this actors object holds 4 properties (and other methods):
Properties:
- "pos" property is the coordinates of the top left corner of the element.
- "size" property is the size of the element.
- "type" property is string for the type of actor: player, coin or lava.

Methods:
-"update" method is used to compute the new state and position after a given time step,
moving in response to the arrow keys, or swaying for the lavam
then it returns a new updated actor object.

-"create" method is used by the level constructr to create an actor from a character symbol in the level plan.
It is given the coordinates and the character type,
this is needed because the "Lava" class has several different kinds or characters/symbols.



The "Vec" Class which is used for 2-D values, such as position and size of the actors:

class Vec {
  contructor(x, y) {
    this.x = x; this.y = y;
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  times(factor){
    return new Vec(this.x * factor, this.y * factor);
  }
}

The "time" method in the "Vec" class will be useful when we need to multiply a speed vector
by a time interval to get the distance travelled during that time.


The types of actors all get their own class since they have different behaviors.
They also each need "update" methods, but we will add those later.

The Player class has a current speed property to simulate momentum and gravity.

class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() { return "player"; }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)),
                      new Vec(0, 0));
  }
}

// this is stored on prototype because the size is always the same for all instances of "Player"
Player.prototype.size = new Vec(0.8, 1.5);

Because a player is 1.5 squares tall, its initial position
is set to be 0.5 squares above the position where the @ symbol was written in the level.

The "size" property is the same for all instances of "Player",
so we want to store it on the prototype, instead of on the instances of the class.
(could have created a getter like type, but that would create and return a new Vec object everytime the property is read, which would be wasteful.)
And strings, since they are immutable, dont have to be recreated every time they are evaluated? Not sure how that fits in.

For "Lava" actor, it needs to be initialized differently for each type of lava charactor/symbol.

Dynamic lava moves along at current speed until it hits and obstacle.
Then if it is "dripping" and has a reset property, it will jump back to its start position.
If it does not, it will be "bouncing" type, and will invert its speed and go in the other direction.

The create method looks at which character/symbol that the "Level" constructr passes,
and creates the proper type of lava actor.

    class Lava {
      constructor(pos, speed, reset) {
        this.pos = pos;
        this.speed = speed;
        this.reset = reset;
      }

      get type() { return "lava"; }

      static create(pos, ch) {
        // swaying lava:
        if (ch == "=") {
          return new Lava(pos, new Vec(2, 0));
          // vertical moving lava:
        } else if (ch == "|") {
          return new Lava(pos, new Vec(0, 2));
          // dripping lava:
        } else if (ch == "v") {
          return new Lava(pos, new Vec(0, 3), pos);
        }
      }
    }

    Lava.prototype.size = new Vec(1, 1);


Coins pretty much just sit in one place. They are given a wobble or slight vertical bouncing motion.
To track this, a base postion + a wobble property that tracks the phase of the bouncing motion.
These together determine the positiong of the coin (and stored in the "pos" property).


class Coin {
  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  get type() { return "coin"; }

  static create(pos) {
    let basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, base Pos, Math.random() * Math.PI * 2);
  }
}

Coin.protype.size = new Vec(0.6, 0.6);

The Math.sin functin is useful for modeling a wave or bounce movement,
because it follows a y-coordinate that goes up and down.

To avoid all coins moving at the exact same pattern, the start is randomized with Math.random().


The "Level" constructr consults a map of all the characters/symbols which is stored in a object called "levelChars":

const levelChars = {
  ".": "empty",
  "#": "wall",
  "@": Player,
  "o": Coin,
  "+": "lava",
  "=": Lava,
  "|": Lava,
  "v": Lava
};

This is everything that is required to create an instance of Level.

let simpleLevel = new Level(simpleLevelPlan);
console.log(simpleLevel.width, "by", simpleLevel.height);
// 22 by 9


Now to display the levels on the screen and model time and motion:
