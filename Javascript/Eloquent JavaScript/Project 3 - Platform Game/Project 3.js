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



As different moving elements, actors, dissappear from the game, such as coins being collected,
we keep track of this with a "State" class:

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


SPECIAL SECTION TO NOTE ABOUT ENCAPSULATION:
Encapsulation is not applied very much in the project for 2 reasons:
Problems with encapsulation:

1. Encapsulation takes extra effort and makes programs bigger,
it requires additional concepts and interfaces to be introduced.
To prevent confusion, keep program small if possible.

2. The various elements of this game are so closely tied together,
that if the behavior of one changed, it is unlikely that any of the others
would be able to stay the same.
Interfaces would need to have incorporated a lot of assumptions which makes them less effective,
and whenever you change one part of the system, youll have to worry about the way it impacts the other parts,
because their interfaces wouldnt cover the new situation.

Trying to encapsulate something that isnt an ideal/suitable boundary will end up wasting a lot of energy and time.
Youll notice your interfaces get awkwardly large and will need to be modified often as the program evolves.


// CONTINUE FROM COFFEE & CODE

The one thing that will be encapsulated will be the drawing subsystem,
since it will be used again in the next chapter (using <canvas>?)

DRAWING:

The encapsulation of the drawing code is done by defining a "display" object,
which displays a given level and current state.
The display type used here is called DOMDisplay, because it uses just simple DOM elements.

this helper functin creates an element and gives it some attributes + child nodes,
and it does so in a succinct way:

    function elt(name, attrs, ...children) {
      let dom = document.createElement(name);
      for (let attr of Object.keys(attrs)) {
        dom.setAttribute(attr, attrs[attr]);
      }
      for (let child of children) {
        dom.appendChild(child);
      }
      return dom;
    }

A display is created by giving it a parent element to which it should append itself and a level object.

    class DOMDisplay {
      constructor(parent, level) {
        this.dom = elt("div", {class: "game"}, drawGrid(level));
        this.actorLayor = null;
        parent.appendChild(this.dom);
      }

      clear() { this.dom.remove(); }
    }


Because our game is in 1 x 1 units in a grid, we use a constant "scale"
to give the number of pixels a single unit takes on the screen.

    const scale = 20;

The background level grid only needs to be drawn once, and as a <table> element.
While movable actors are re-drawn every time the display is updated with a given state.

The property "actorLayer" is used to track the element that holds the actors,
so that they can easily be removed and redrawn.


The gackground level drawn as a <table> element:

    function drawGrid(level) {
      return elt("table", {
        class: "background",
        style: `width: ${level.width * scale}px`
      }, ...level.rows.map(row =>
        elt("tr", {style: `height: ${scale}px`},
            ...row.map(type => elt("td", {class: type})))
      ));
    }

Each row of the grid is turned into a table row, <tr> element.
The strings in the grid are used as class names for the table cell elements <td>
The spread operator ("...") is used to pass arrays of child nodes to elt as separate arguments.


Now this CSS makes the table look like the background we want:

    .background    {  background: rgb(52, 166, 251);
                      table-layout: fixed;
                      border-spacing: 0;              }
    .background td {  padding: 0; }
    .lava          {  background: rgb(255, 100, 100); }
    .wall          {  background: white; }

Some of the details above are used to prevent unwanted default browser behavior.
We dont want the layout to depend on the content of its cells,
and we dont want there to be space pr padding between the cells.


 We draw each Actor by creating a DOM element for it
 and setting that elements position and size based on the actors properties.
 The units again need to be multiplied be "scale" to work with pixels.

     function drawActors(actors) {
       return elt("div", {}, ...actors.map(actor => {
         let rect = elt("div", {class: `actor ${actor.type}`});
         rect.style.width = `${actor.size.x * scale}px`;
         rect.style.height = `${actor.size.y * scale}px`;
         rect.style.left = `${actor.pos.x * scale}px`;
         rect.style.top = `${actor.pos.y * scale}px`;
       }));
     }

 To give an element more than one class, we separate the class names by spaces.
 We need to give the actors a position of "absolute" using CSS.

     .actor { position: absolute; }

 We also give the actors their colors:

     .coin { background: rgb(241, 229, 89); }
     .player { background: rgb(64, 64, 64); }


When the disaplyt is updated, the drawState method first removes the old actors,
then redraws them in their new positions.
We cant reuse DOM elements for actors, because that would require a lot more code
to make sure that we remove elements when their actors vanish.
And redrawing them is not that intensive since there are not that many.

    DOMDisplay.prototype.drawState = function(state) {
      if (this.actorLayer) {
        this.actorLayer.remove();
      }
      this.actorLayer = this.dom.appendChild(drawActors(state.actors));
      this.dom.className = `game ${state.status}`;
      this.scrollPlayerIntoView(state);
    };


We can style the "player" actor differently depending on if the level was won or lost,
by adding the levels current status as a class name to the wrapper,
using a CSS rule that takes effect only when the player has an ancestor element with a given class:

    .lost player { background: rgb(160, 64, 64); }
    .won player { box-shadow: -4px -7px 8px white, 4px -7px 8px white; }

So after toucing the lava, the player turns dark red.
When the player wins by collecting the last coin, we create a whie halow effect
by adding two blurred white shaddows on top left and top right of the player.



We use  "scrollPlayerIntoView" for when a level doesnt fit into the viewport.
It makes sure that the viewport is scrolled so that player is near the center.

 
