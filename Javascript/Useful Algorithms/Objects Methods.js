The prototype relations of JavaScript objects form a tree-shaped structure, and at the root of this structure sits Object.prototype. It provides a few methods that show up in all objects,

such as .toString(), which converts an object to a string representation.

Many objects don’t directly have Object.prototype as their prototype, but instead have another object, which provides its own default properties.

Functions derive from Function.prototype, and arrays derive from Array.prototype. objects derive from Object.prototype

The Object.getPrototypeOf function obviously returns the prototype of an object.
You can use Object.create to create an object with a specific prototype.

    var protoRabbit = {
      speak: function(line) {
        console.log("The " + this.type + " rabbit says '" +
                    line + "'");
      }
    };
    var killerRabbit = Object.create(protoRabbit);
    killerRabbit.type = "killer";
    killerRabbit.speak("SKREEEE!");
    // → The killer rabbit says 'SKREEEE!'

The “proto” rabbit acts as a container for the properties that are shared by all rabbits. An individual rabbit object, like the killer rabbit, contains properties that apply only to itself—in this case its type—and derives shared properties from its prototype.

BUT!!!  A better way is to use "new", like  var Toyata = new car();

CONSTRUCTORS:
NOTE constructors are functions
A more convenient way to create objects that derive from some shared prototype is to use a constructor. In JavaScript, calling a function with the new keyword in front of it causes it to be treated as a constructor. The constructor will have its this variable bound to a fresh object, and unless it explicitly returns another object value, this new object will be returned from the call.
NOTE: The actual prototype of a constructor is Function.prototype since constructors are functions.

An object created with "new" is said to be an instance of its constructor.

    function Rabbit(type) {
      this.type = type;
    }

    var killerRabbit = new Rabbit("killer");
    var blackRabbit = new Rabbit("black");
    console.log(blackRabbit.type);
    // → black

To add a speak method to rabbits created with the Rabbit constructor, we can simply do this:

    Rabbit.prototype.speak = function(line) {
    console.log("The " + this.type + " rabbit says '" +
              line + "'");
    };
    blackRabbit.speak("Doom...");
    // → The black rabbit says 'Doom...'

When you add a property to a specific object, (whether that property is present in the prototype or not),
the property is added to ONLY that object.
If there is a property by the same name in the prototype,
this property will no longer affect the object.
The prototype itself is not changed.

    (code carries over from above)

    Rabbit.prototype.teeth = "small";
    console.log(killerRabbit.teeth);
    // → small
    console.log(killerRabbit.teeth);
    // → small
    killerRabbit.teeth = "long, sharp, and bloody";
    console.log(killerRabbit.teeth);
    // → long, sharp, and bloody
    console.log(blackRabbit.teeth);
    // → small
    console.log(Rabbit.prototype.teeth);
    // → small

Array.prototype.toString is NOT THE SAME as Object.prototype.toString

You can add a property to all objects if you give that property to their prototype origin:

    (code carries over from above)

    killerRabbit.dance();
    // → ERROR.

    Rabbit.prototype.dance = function() {
      console.log("The " + this.type + " rabbit dances!");
    };

    killerRabbit.dance();
    // → The killer rabbit dances!.

There is a problem here due to "enumerable" vs "nonenumerable" properties,
"enumerable" means you can run through / count through each item one by one
"nonenumerable" is new to JS since ES5 and means properties that dont show up when you do a "for...in" loop over the object
particularly when doing for/in loops (I ran in to this with the "history" object in the life-expectancy exercise)

All properties that we create by simply assigning to them are enumerable.
The standard properties in Object.prototype are all nonenumerable,
which is why they do not show up in such a for/in loop.

    var store = {};
    function storeStuff(thing, amount) {
      store[thing] = amount;
    }

    storeStuff("pizza", 12);
    storeStuff("elephant", 3);

    Object.prototype.nonsense = "hi";
    for (var name in store)
      console.log(name);
    // → pizza
    // → elephant
    // → nonsense
    console.log("nonsense" in store);
    // → true

The problem is there is no event called “nonsense” in our data set.
It is possible to define our own nonenumerable properties by using
the Object.defineProperty function,
which allows us to control the type of property we are creating.

    Object.defineProperty(Object.prototype, "hiddenNonsense",
                          {enumerable: false, value: "hi"});
    for (var name in store)
      console.log(name);
    // → pizza
    // → elephant
    console.log(store.hiddenNonsense);
    // → hi

So now the property is there, but it won’t show up in a loop.
Another problem:

    console.log("hiddenNonsense" in store);
    // → true

the "in" operator still tells us that it has this property,
even though it's just in the prototype/constructor?


To solve this and verify if the object actually has this property itself
(and not just the prototype it derives from)
We use "hasOwnProperty" instead of "in":

    console.log(store.hasOwnProperty("hiddenNonsense"));
    // → false


If you have concerns when looping about which properties will be included, write:

    for (var name in map) {
      if (map.hasOwnProperty(name)) {
        // ... this is an own property
      }
    }


If we want to create an object without a prototype to avoid some of this hassle
use Object.create(null):
the Object.create function, allows us to create an object with a specific prototype.
But you are also allowed to pass "null" as the prototype to create a fresh object with no prototype.

    var store = Object.create(null);
    store["pizza"] = 0.069;
    console.log("toString" in store);
    // → false
    console.log("pizza" in store);
    // → true

This way there is no longer the need for "hasOwnProperty"
because all the properties the object has are its own properties.
And now can safely use for/in loops,
