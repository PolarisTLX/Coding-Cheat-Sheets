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
Constructors are functions that can be used with the new operator to create new objects.
The new object’s prototype will be the object found in the prototype property of the constructor function.
Constructors names usually start with a capital letter.

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
the Object.create function(){}, allows us to create an object with a specific prototype.
But you are also allowed to pass "null" as the prototype to create a fresh object with no prototype.

    var store = Object.create(null);
    store["pizza"] = 0.069;
    console.log("toString" in store);
    // → false
    console.log("pizza" in store);
    // → true

This way there is no longer the need for "hasOwnProperty"
because all the properties the object has are its own properties.
And now can safely use for/in loops.


IMPORTANT:
The standard Object.keys function(){} returns an array of property names in an object.


PLYMORPHISM:
One of the CORE PRINCIPALS of Object Oriented Programming (OOP).
It is the practice of designing objects to share behaviors
and to be able to override shared behaviors with specific ones.
Polymorphism takes advantage of inheritance in order to make this happen.

Example: When you call the String functin, which converts a value to a string,
on an object, it will call the .toString() method on that object to try to create a meaningful string to return.

Some of the standard prototypes define their own version of .toString()
so they can create a string that contains more useful information than "[object Object]".
When a piece of code is written to work with objects that have a certain interface—
in this case, a .toString() method, any kind of object that happens to support this interface
can be plugged into the code, and it will just work.

Polymorphic code can work with values of different shapes,
as long as they support the interface it expects.


POLYMORPHISM TABLE EXAMPLE made into its own file


GETTERS AND SETTERS:

With JavaScript we can specify properties that, from the outside,
look like normal properties but secretly have methods associated with them.

In an object literal, the "get" or "set" notation for properties allows you to specify
a functin to be run when the property is read("get") or written("set").

var pile = {key: value, get(){}, set(){}};
var pile = {key: value, get property(){code when evoked}, set property(value given){code when evoked}};

    var pile = {
      elements: ["eggshell", "orange peel", "worm"],
      get height() {
        return this.elements.length;
      },
      set height(value) {
        console.log("Ignoring attempt to set height to", value);
      }
    };

    console.log(pile.height);  // THIS IS "GET"
    // → 3
    pile.height = 100;         // THIS IS "SET"
    // → Ignoring attempt to set height to 100


When a "get" is defined but no "set", writing (setting) to the property is simply ignored.


You can also add such a property to an existing object, for example a prototype,
using the Object.defineProperty function (which we previously used to create nonenumerable properties).

    Object.defineProperty(TextCell.prototype, "heightProp", {
      get: function() { return this.text.length; }
    });

    var cell = new TextCell("no\nway");
    console.log(cell.heightProp);
    // → 2
    cell.heightProp = 100;   //there is no "set" so nothing happens
    console.log(cell.heightProp);
    // → 2
You can use a similar set property, in the object passed to defineProperty, to specify a setter method.


ENCAPSULATION:
Distinguishing between internal complexity and external interface.
INTERFACE: can be a method/functin that is called on to intereact with a more complex object

One of several concepts for objects in object oriented programming,
as the interface of an object is usually simpler in complexity then its internal content

Its can be a useful thing to do with objects is to specify an interface for them
and tell everybody that they are supposed to talk to your object only through that interface.
The rest of the details that make up your object are now encapsulated, hidden behind the interface.

Once you are talking in terms of interfaces, who says that only one kind of object may implement this interface?
Having different objects expose the same interface
and then writing code that works on any object with the interface is called polymorphism.
It is very useful.


INHERITANCE:
To avoid writting a whole new constructor with all three methods,
we can do something clever, because prototypes may themselves have prototypes:

Inheritance allows us to build slightly different data types from existing data types with relatively little work.

RTextCell becomes basically equivalent to a TextCell,
except that its draw method contains a different functin.

NOTE:  inheritance is often confused with polymorphism.
inheritance fundamentally ties types together, and can creat tangle in your code.
You should see it as a slightly dodgy trick that can help you define new types with little code
A preferable way to extend types is through composition (see UnderlinedCell in the Polymorphic Table exercise).



THE INSTANCE OF OPERATOR:
Find out if an object is derived/inherited from another constructor.

It is occasionally useful to know whether an object was derived from a specific constructor.
For this, JavaScript provides a binary operator called instanceof.


    console.log(new derivedObject("argument") instanceof originConstructor);
    // true or false
    console.log(new RTextCell("A") instanceof RTextCell);
    // → true
    console.log(new RTextCell("A") instanceof TextCell);
    // → true
    console.log(new TextCell("A") instanceof RTextCell);
    // → false
    console.log([1] instanceof Array);
    // → true
