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
And to make sure that anything that sticks out of the elements box is not visible,
we use this CSS to give the games DOM element a maximum size:
We also give the outer element a relative position,
so that the actors inside are positioned relative to the top-left corner.

    .game {
      overflow: hidden;
      max-width: 600px;
      max-height: 450ps;
      position: relative;
    }


In the scrollPlayerIntoView method, we find the players position
and update the wrapping element''s scroll position.
We change the scroll position by manipulating that element''s "scrollLeft" and "scrollTop" properties
when the player is too close to the edge.

    DOMDisplay.prototype.scrollPlayerIntoView = function(state) {
      let width = this.dom.clientWidth;
      let height = this.dom.clientWidth;
      let margin = width / 3;

      // The viewport:
      let left = this.dom.scrollLeft, right = left + width;
      let top = this.dom.scrollTop, bottom = top + height;

      let player = state.player;
      let center = player.pos.plus(player.size.times(0.5)).times(scale);

      if (center.x < left + margin) {
        this.dom.scrollLeft = center.x - margin;
      } else if (center.x > right - margin) {
        this.dom.scrollLeft = center.x + margin - width;
      }
      if (center.y < top + margin) {
        this.dom.scrollTop = center.y - margin;
      } else if (center.y > bottom - margin) {
        this.dom.scrollTop = center.y + margin - height;
      }
    };

The way to find the center of the player is done by adding the top-left corner and half its size.
Then we have to multiply it by the display scale to get it in pixel coordinates.

Then a series of checks verifies that the player position isnt outside of the allowed range.
Note that this will sometimes set nonsense scroll coordinates, such as < 0 or beyond the scrolable area.
But the DOM will contrain them to acceptable values.
Setting "scrollLeft" to -10 will just be turned into 0.

It would be simpler to just always have the player always be in the exact center,
but that would be very visually unpleasing.


We can now display our tiny level:

    <link rel="stylesheet" href="css/game.css">
    // this is to load a CSS file into a page.
    // in this case the file game.css that contains the styles necessary for our game.

    <script>
      let simpleLevel = new Level(simpleLevelPlan);
      let display = new DOMDisplay(document.body, simpleLevel);
      display.drawState(State.start(simpleLevel));
    </script>


// END OF COFFEE and CODE


MOTION AND COLLISION:

Split time into small steps, and for each step, move the actors by a distance
corresponding to their speed multiplied by the size of the time step in seconds.

discussions on collisions that Ive already learned before...

This method tells us whether an a rectangle (by its position and size),
touches a grid element of the given type:

    Level.prototype.touches = function(pos, size, type) {
      /* this figures out the background grid squares that an actor touches.
         note that an actor may not fit perfectly on top of 1 square,
         but may be partially on one and partially on the other, touching both.
         all of the squares touched is calculated with Math.floor and Math.ceil. */
      var xStart = Math.floor(pos.x);
      var xEnd = Math.ceil(pos.x + size.x);
      var yStart = Math.floor(pos.y);
      var yEnd = Math.ceil(pos.y + size.y);

      /* loop over the block of background grid squares
         and return true when a matching square is found.
          Edges of the level are always a "wall" */
      for (var y = yStart; y < yEnd; y++) {
        for (var x = xStart; x < xEnd; x++) {
          let isOutside = x < 0 || x >= this.width ||
                          y < 0 || y >= this.height;
          let here = isOutside ? "wall" : this.rows[y][x];
          if (here == type) return true;
        }
      }
      return false;
    };


The state "update" method uses "touches" to figure out if the player is touching lava:

    // it is passed a time step and keys (which is a data structure which says which keys are being held down)
    State.prototype.update = function(time, keys) {
      // it first calls the update method on all actors, producing and array of updated actors.
      let actors = this.actors.map(actor => actor.update(time, this, keys));
      // the actors also get the time step, the keys and the state, from which to base their update from
      // note, only the player interacts with the keys.
      let newState = new State(this.level, actors, this.status);

      // if the game is already over (status != "playing"), just "return" as no need to continue further.
      if (newState.status != "playing") return newState;

      // check if the player is touching lava,
      // if so, status = "lost" and game is done, call return.
      let player = newState.player;
      if (this.level.touches(player.pos, player.size, "lava")) {
        return new State(this.level, actors, "lost");
      }

      // check if any other actors (like coins) are touching the player:
      // this is done with the overlap function, described below.
      // it loops through all the actors + the player,
      // overlap returns true if there is overlap with the player.
      for (let actor of actors) {
        if (actor != player && overlap(actor, player)) {
          // if overlap == true, the "collide" method updates the state.
          newState = actor.collide(newState);
        }
      }
      return newState;
    };

    // this returns true if there is any overlap with the player.
    function overlap(actor1, actor2) {
      return actor1.pos.x + actor1.size > actor2.pos.x &&
             actor1.pos.x < actor2.pos + actor2.size.x &&
             actor1.pos.y + actor1.size.y > actor2.pos.y &&
             actor1.pos.y < actor2.pos.y + actor2.size.y;
    }


WHAT EACH KIND OF COLLISION DOES:
Touching the lava will change the game status to "lost".

    Lava.prototype.collide = function(state) {
      return new State(state.level, state.actors, "lost");
    };

Coins vanish when the player touches them.
The status gets changes to "won" when all coins have been touched.

    Coin.prototype.collide = function(state) {
      let filtered = state.actors.filter(a => a != this);
      let status = state.status;
      if (!filtered.some(a => a.type == "coin")) status = "won";
      return new State(state.level, filtered, status);
    };


ACTOR UPDATES

Each actor .update method takes as arguments:
the time step, the state object, and (for some) the keys object.

    Lava.prototype.update = function(time, state) {
      // new position calculated from adding the time step * current speed to the old position:
      let newPos = this.pos.plus(this.speed.times(time));
      // if there is no obstacle (.touches = false), it moves there,
      if (!state.level.touches(newPos, this.size, "wall")) {
        return new Lava(newPos, this.speed, this.reset);
      // if there is obstacle, the behavior depends on type of lava
      } else if (this.reset) {
        // dripping lava here? it has a reset position, it goes back to reset position after it hits sometime (mimicinc the next droplet?)
        return new Lava(this.reset, this.speed, this.reset);
      } else {
        // bouncing lava goes in oposite direction by doing speed * -1
        return new Lava(this.pos, this.speed.times(-1));
      }
    };


Coins ignore collision since they just wobble in their own square.
They use their "act" method to wobble.

    const wobbleSpeed = 8, wobbleDist = 0.07;

    Coin.prototype.update = function(time) {
      // wobble is tied to time:
      let wobble = this.wobble + time * wobbleSpeed;
      // Math.sin to find new oscillating positon:
      let wobblePos = Math.sin(wobble) * wobbleDist;
      // the position is then calculated from its base position and an offset based on the wobblePos:
      return new Coin(this.basePos.plus(new Vec(0, wobblePos)), this.basePos, wobble);
    };


Player motion is handled seperately per axis,
because touching the floor should not prevent sideways movement and vice versa.


    const playerXSpeed = 7;
    const gravity = 30;
    const jumpSpeed = 17;

    Player.prototype.update = function(time, state, keys) {
      // HORIZONTAL MOVEMENT
      let xSpeed = 0;
      if (keys.ArrowRight) {
        xSpeed += playerXSpeed;
      }
      if (keys.ArrowLeft) {
        xSpeed -= playerXSpeed;
      }

      let pos = this.pos;
      // calc how much player moved horizontally, based on time and speed:
      let movedX = pos.plus(new Vec(xSpeed * time, 0));
      // if there are no obstables (.touches = false):
      if (!state.level.touches(movedX, this.size, "wall")) {
        pos = movedX;
      }

      // VERTICAL MOVEMENT
      let ySpeed = this.speed.y + time * gravity;
      // calc how much player moved vertically, based on time, speed and gravity:
      let movedY = pos.plus(new Vec(0, ySpeed * time));
      // if there are no obstables (.touches = false):
      if (!state.level.touches(movedY, this.size, "wall")) {
        pos = movedY;
        // if touching a floor, and pressing the up key, move up, or jump
        // RECALL THAT "UP" MEANS NEGATIVE Y VALUES!!!
      } else if (keys.ArrowUp && ySpeed > 0) {
        ySpeed = -jumpSpeed;
        // in other cases, the player bumped into something, so set speed to 0:
      } else {
        ySpeed = 0;
      }
      return new Player(pos, new Vec(xSpeed, ySpeed));
    };


TRACKING THE KEYS:

For this game, we want the effect of key-presses to stay active as long as they are held down.
We will set up a key handler that stores the current state of the left, right and up keys.
We also need to apply .preventDefault() so that they dont cause scrolling.

This functin is given an array of key names, and returns an object that
tracks the current position of those keys, registering "keydown" and "keyup" events.
When the key code in the event is present in the set of codes it is tracking, updates the object.


    function trackKeys(keys) {
      let down = Object.create(null);
      function track(event) {
        if (keys.includes(event.key)) {
          down[event.key] == event.type == "keydown";
          event.preventDefault();
        }
      }
      addEventListener("keydown", track);
      addEventListener("keyup", track);
      return down;
    }

    const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

Both event types are covered by the one handler functin.
It looks at the object''s type property to determine if the keystate should be updated
to true (for "keydown") or false (for "keyup").


RUNNING THE GAME:

The game is animated with the "requestAnimationFrame" functin.
But the interface is quite primitive and would recall we call it after every frame.

We will define a helper functin that wraps those boring parts in a convenient interface
where we can just call "runAnimation", provide it a functin that expects a time difference as argument,
and draws a single frame.  When the frame function returns the value "false", the animation stops.


    function runAnimation(frameFunc) {
      let lastTime = null;
      function frame(time) {
        if (lastTime != null) {
          let timeStep = Math.min(time - lastTime, 100) / 1000;
          if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

The maximum frame step is set to 100 miliseconds.
When the browser window is not open, the calls to requestAnimationFrame are suspended.
The difference between "lastTime" and "time" will be the time the page was not open.
This prevents really weird behavior.
It also converts time steps to seconds instead of miliseconds to be easier to think about.


The functin "runLevel" takes a "Level" object, a constructr for a display and returns a promise.
It displays the level in document.body, and lets the user play it.
After a level is finished, it creates a 1 second delay (so the user can see what happened),
then clears the display, stops the animation, and resolves the promise to the game''s end status.

    function runLevel(level, Display) {
      let display = new Display(document.body, level);
      let state = State.start(level);
      let ending = 1;
      return new Promise(resolve => {
        runAnimation(time => {
          state = state.update(time, arrowKeys);
          display.drawState(state);
          if (state.status == "playing") {
            return true;
          } else if (ending > 0) {
            ending -= time;
            return true;
          } else {
            display.clear();
            resolve(state.status);
            return false;
          }
        });
      });
    }


When the player dies, the current level is restarted,
When the player wins, they move onto the next level.
This functin "runGame" takes care of this,
it takes a array of level plans, which are each strings and displays a constructr.

    async function runGame(plans, Display) {
      for (let level = 0; level < plan.length;) {
        let status = await runLevel (new Level(plans[level]), Display);
        if (status == "won") {
          level++;
        }
        console.log("You've won! (beaten all the levels?)");
      }
    }


Because "runLevel" is written to return a promise,
"runGame" can be written using an async functin.
It also returns a promise, which resolves when the user finished the game / all levels.

The levels strings are set in a file called "game_levels.js".


<link rel="stylesheet" href="css/game.css">

<body>
  <script>
    runGame(GAME_LEVELS, DOMDisplay);
  </script>
</body>


END OF MAIN GAME PROJECT

ADDITIONAL EXERCISES


Confirmed with book author that the code for the 3rd edition needs some corrections for this project.
Will have to come back at a later time to finish and get it working.
