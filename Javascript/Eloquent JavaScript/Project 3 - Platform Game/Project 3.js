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
