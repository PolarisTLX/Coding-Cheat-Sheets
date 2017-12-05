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

Constructors
NOTE constructors are functions
A more convenient way to create objects that derive from some shared prototype is to use a constructor. In JavaScript, calling a function with the new keyword in front of it causes it to be treated as a constructor. The constructor will have its this variable bound to a fresh object, and unless it explicitly returns another object value, this new object will be returned from the call.
NOTE: The actual prototype of a constructor is Function.prototype since constructors are functions.

An object created with new is said to be an instance of its constructor.

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
