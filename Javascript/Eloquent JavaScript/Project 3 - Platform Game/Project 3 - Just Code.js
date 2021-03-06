
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




class Coin {
  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  get type() { return "coin"; }

  static create(pos) {
    let basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}

Coin.prototype.size = new Vec(0.6, 0.6);




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

//This is everything that is required to create an instance of Level.

let simpleLevel = new Level(simpleLevelPlan);
console.log(simpleLevel.width, "by", simpleLevel.height);
// 22 by 9






//Now to display the levels on the screen and model time and motion:

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


class DOMDisplay {
  constructor(parent, level) {
    this.dom = elt("div", {class: "game"}, drawGrid(level));
    this.actorLayor = null;
    parent.appendChild(this.dom);
  }

  clear() { this.dom.remove(); }
}


const scale = 20;


function drawGrid(level) {
  return elt("table", {
    class: "background",
    style: `width: ${level.width * scale}px`
  }, ...level.rows.map(row =>
    elt("tr", {style: `height: ${scale}px`},
        ...row.map(type => elt("td", {class: type})))
  ));
}


.background    {  background: rgb(52, 166, 251);
                  table-layout: fixed;
                  border-spacing: 0;              }
.background td {  padding: 0; }
.lava          {  background: rgb(255, 100, 100); }
.wall          {  background: white; }



function drawActors(actors) {
   return elt("div", {}, ...actors.map(actor => {
     let rect = elt("div", {class: `actor ${actor.type}`});
     rect.style.width = `${actor.size.x * scale}px`;
     rect.style.height = `${actor.size.y * scale}px`;
     rect.style.left = `${actor.pos.x * scale}px`;
     rect.style.top = `${actor.pos.y * scale}px`;
   }));
}

.actor { position: absolute; }

.coin { background: rgb(241, 229, 89); }
.player { background: rgb(64, 64, 64); }


DOMDisplay.prototype.drawState = function(state) {
    if (this.actorLayer) {
      this.actorLayer.remove();
    }
    this.actorLayer = this.dom.appendChild(drawActors(state.actors));
    this.dom.className = `game ${state.status}`;
    this.scrollPlayerIntoView(state);
};

.lost player { background: rgb(160, 64, 64); }
.won player { box-shadow: -4px -7px 8px white, 4px -7px 8px white; }

.game {
  overflow: hidden;
  max-width: 600px;
  max-height: 450px;
  position: relative;
}


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

// We can now display our tiny level:

    // <link rel="stylesheet" href="css/game.css">
    // // this is to load a CSS file into a page.
    // // in this case the file game.css that contains the styles necessary for our game.
    //
    // <script>
    //   let simpleLevel = new Level(simpleLevelPlan);
    //   let display = new DOMDisplay(document.body, simpleLevel);
    //   display.drawState(State.start(simpleLevel));
    // </script>

//CODE WORKS UP TO HERE
