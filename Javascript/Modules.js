Module with JS, at least ES5, is limited.

Problems with global scope variables,
most other languages have more levels of scopes.

Functions are the only thing in JS that create a new scope.

SIMPLE TRIVIAL MODULE EXAMPLE:

var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function dayName(number) {
  return names[number];
}

console.log(dayName(1));  // Monday

the functin dayName() is part of this modules interface, but the variable "names" is not.

To prevent "names" from being a global scope variable we can do this:

var dayNames = function() {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return function(number) {
    return names[number];
  };
}();

console.log(dayNames(3));   // Wednesday

Now "names" is a local variable in an unnamed functin.
This functin is created an immediatly called.


Using a similar pattern to isolate code from the outside world entirely as well:

(function() {
  function square(x) {
    return x * x;
  }
  var hundred = 100;

  console.log(square(hundred));
})();
//10000

This code simply outputs the square of 100.
The module is wrapped in a functin to prevent the variables it uses internally from being in the global scope.
In a real world example a module like this could add a method to some prototype or sets up a widget on a webpage.

Wrapping the whole module in a pair of () is a quirk of JavaScript syntax.
It is to trick to force the functin to be interpreted as an expression.
If an "expression" starts with the keyword "function", it is a functin expresion.
But if a "statement" starts with functin, it is a functin "decleration", which requires a name,
and cannot be called by writting parentheses after it (because its not an expression).


OBJECTS AS INTERFACES:

Now we want to add another functin to our day-of-the-week module,
that goes from day name to a number.

We cant simply return the functin anymore,
We must wrap the two functions in an object.

var weekDay = function() {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return {
    name: function(number) { return names[number]; },
    number: function(name) { return names.indexOf(name); }
  };
}();

console.log(weekDay.name(weekDay.number("Sunday")));
// Sunday


When you have bigger modules, gathering all the exported values into an object at the end of the functin
becomes awkward as many of those exported functins are likely to be big.
You would prefer to write them somewhere else, near related internal code.

A good alternative is to declare an object (usually named "exports"),
and add properties to that whenever we are defining something that needs to be exported.

This next example, the module functin takes its interface object as an argument,
(this.weekDay = {})
allowing code outside of the functin to create it and store it in a variable.
(Outside of a functin, "this" refers to the global scope object.)


(function(exports) {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  exports.name = function(number) {
    return names[number];
  };
  exports.number = function(name) {
    return names.indexOf(name);
  };
})(this.weekDay = {});   //<- the interface object as an argument and store in a variable

console.log(weekDay.name(weekDay.number("Saturday")));
// Saturday

This pattern is commonly used in JavaScript modules intended for the browser.
The module "claims" (?) a single global variable and wraps its code in a functins
in order to have its own private namespace.
But this pattern still causes problems if multiple modules happen to claim the same name,
or if you want to load two versions of a module alongside each other.

To fix this we want to DETACH FROM THE GLOBAL SCOPE:
Some re-arranging we can allow one module to directly ask for the interface object of another module,
and avoiding the global scope.

This involves a "require" functin,
and give it a module name, will load that modules file and return the appropriate interface value.

"require" needs two things:
1 - we want a functin "readFile", which returns the content of a given file string.
(this is not part of vanilla ES5 JavaScript, but in things like Node.js or the browser.)
2- Need to to able to actually execute this string as JavaScript code.



//CONTINUE IN COFFEE & CODE
EVALUATING DATA AS CODE:

The operator "eval" is one way to take data (a string of code) and run it in your corrent program.
It will execute a string of code in the current scope.
But this is usually a bad idea because it breaks some of the properties of scopes.

function evalAndReturnX(code) {
  eval(code);
  return x;
}
console.log(evalAndReturnX("var x = 2"));
// 2

A BETTER WAY OF TAKING DATA INOT YOUR CODE:
is to use the "Function" constructr, which takes 2 arguments:
-a string containing a list of argument names (with "," in between)
-a string containing the functins body.

var myVar = new Function("list, of, arguments", "function body");

Example:
var plusOne = new Function("n", "return n + 1;");
console.log(plusOne(4));
// 5

This what we need for our modules, we can wrap a modules code in a functin,
with that functions scope becoming the modules scope.



REQUIRE:

A minimal implimentation example of "require",
which has a couple problems (explained further below):

//this example will not work on it's own
    function require(name) {
      var code = new Function("exports", readFile(name));
      var exports = {};
      code(exports);
      return exports;
    }
    console.log(require("weekDay").name(1));


The "new Function" constructr wraps the module code in a functin,
this means we dont have to write a wrapping namespace functin in the module file itself.
And since we dont make "exports" as an argument to the module functin,
the module does not need to declare "exports".
This removes a lot of clutter from the module.


    var names = ["Sunday", "Monday", "Tuesday", "Wednesday",
                 "Thursday", "Friday", "Saturday"];

    exports.name = function(number) {
      return names[number];
    };
    exports.number = function(name) {
      return names.indexOf(name);
    };

With this pattern, a module usually starts with a few variable declerations that load the modules it depends on.

(THIS IS OBSERVED IN REACT AND ANGULAR!!!!!)

    var weekDay = require("weekDay");
    var today = require("today");

    console.log(weekDay.name(today.dayNumber()));


BUT THIS SIMPLISTIC IMPLEMENTATION OF "require" HAS A COUPLE PROBLEMS:
-It will load and run a module every time it is "required",
when there are many calls,  it takes up a lot of time and energy.
-It is not possible to a module to directly export a value other than the "exports" object, such as a functin.
Example: if a module wants to "export" only the constructr of the object type it defines.
In this format it cannot because "require" always uses the "exports" object it creates as the exported value.


THE TRADITIONAL SOLUTION FOR THIS - "CommonJS Modules" :
-provide modules with another vairable, "module",
which is an object that has a property "exports".
This property initially points at the empty object created by "require",
but can be overwritten with another value in order to export something else.

THE "CommonJS Modules" SYSTEM:

    function require(name) {
      if (name in require.cache) {
        return require.cache[name];
      }
      var code = new Function("exports, module", readFile(name));
      var exports = {}, module = {exports: exports};
      code(exports, module);

      require.cache[name] = module.exports;
      return module.exports;
    }
    require.cache = Object.create(null);

This module system now uses a single global variable ("require"),
to allow modules to find and use each other without going through the global scope.

This system is built into Node.js.



SLOW-LOADING MODULES:

CommonJS module style is a bit too involved for writting JavaScript for the browser.
This is because reading a file (module) from the Web is a lot slower than reading from a HDD.
While a script is running in the browser, nothing else can happen to the website.
This would cause many long delays and freezes for every "require" call that fetched something from a web server.

SOLUTION 1:  BROWSERFY / WEBPACK
One way to avoid this is to run a program like "Browserfy" on your code before yhou serve it on a webpage.
"Webpack" is similar / a competitor.
This will look for calls to "require", resolve all the dependencies and gather the needed code into a single big file,
the website then simply loads this 1 file to get all the modules it needs.

SOLUTION 2 -  ASYNCHRONOUS MODULE DEFINITION (AMD) MODULE SYSTEM:
This code is a lot harder to follow than the "require" functin.
This solution allows the webpage to continue working while the files are being fetched, and loads the dependencies in the background.

Wrap the code that makes the module in a functin,
so that the module loader can first load its dependencies in the background,
then call the functin, initializing the module when the dependencies have been loaded.

Example:
    define(["weekDay", "today"], function(weekDay, today) {
      console.log(weekDay.name(today.dayNumber()));
    });

The "define" functin is the main detail of this approach.
It first takes an array of module names and then functin that takes and argument for each dependency.
It will load the dependencies in the background, allowing the page to continue working while the files are being fetched.
Once all dependencies are loaded, "define" will call the functin it was given,
with the interfaces of those dependencies as arguemnts.

The modules that are loaded this way must contain a call to "define".
The value used as their interface is whatever was returned by the functin passed to "define".

Ex - the "weekDay" module again, but in this system:
    define([], function() {
      var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      return {
        name: function(number) { return names[number]; },
        number: function(name) { return names.indexOf(name); }
      };
    });

Showing a minimal implimentation of "define" involves pretending we have a functin called "backgroundReadFile".
This functin takes a filename and a functin and calls the functin with the content of the file
as soon as it has finished loading it.  (Chapter 17 goes more into this functin).


To keep track of modules while they are being loaded, "define" will use objects that describe the state of modules,
telling us whether they are available yet, and providing their interfaces when they are.


The "getModule" functin, when given a name, will return such an object,
and ensure that the module is scheduled to be loaded.
It uses a cache object to avoid loading the same module twice.

    var defineCache = Object.create(null);
    // the above is to avoid loading the same module twice.
    var currentMod = null;

    function getModule(name) {
      if (name in defineCache) {
        return defineCache[name];
      }
      var module = {exports: null,
                    loaded: false,
                    onLoad: []};
      defineCache[name] = module;
      backgroundReadFile(name, function(code) {
        currentMod = module;
        new Function("", code)();
      });
      return module;
    }


We also assume the loaded file contains a single call to "define".
The "currentMod" variable is used to tell this call about the module object that is currently being loaded,
so that it can update this object when it finshes loading.
(This is looked at a bit further down)


The "define" functin uses "getModule" to fetch / create the module objects
for the current modules dependencies.
Its job is to schedule the "moduleFunction" to be run whenever the dependencies are loaded,
"moduleFunction" is the functin that contains the modules actual code.

For this purpose, it defines a functin "whenDepsLoaded",
that is added to the "onLoad" array of all dependencies that are not yet loaded.
This functin "whenDepsLoaded" immediately returns if there are still unloaded dependencies,
so it will only do actual work once every dependencies have all finished loading.
In case there are no dependencies to be loaded, it is also called immediately, from "define" itself.


    function define(depNames, moduleFunction) {
      var myMod = currentMod;
      var deps = depNames.map(getModule);

      deps.forEach(function(mod) {
        if (!mod.loaded) {
          mod.onLoad.push(whenDepsLoaded);
        }
      });

      function whenDepsLoaded() {
        if (!deps.every(function(m) { return m.loaded; })) {
          return;
        }

        var args = deps.map(function(m) { return m.exports; });
        var exports = moduleFunction.apply(null, args);
        if (myMod) {
          myMod.exports = exports;
          myMod.loaded = true;
          myMod.onLoad.forEach(function(f) { f(); });
        }
      }
      whenDepsLoaded();
    }

When all dependencies are available, "whenDepsLoaded" calls ther functin that holds the module,
giving it the interfaces of the dependencies as arguments.

The first thing "define" does is store the value that currentMod had when it was called in a variable myMod.
Note that "getModule" stored the corresponding module object in "currentMod" just before evaluating the code for a module.
This allows "whenDepsLoaded" to store the return value of the module functin in that modules "exports" property,
set the modules "loaded" property to "true",
and call all the functions that are waiting for the module to load.

This code is a lot harder to follow than the "require" functin and does follow a simple, predictable path.
Instead, multiple operations are set up to happen at some unspecified time in the future, which makes the execution obscure and difficult to follow.

a real AMD implementation is quite a lot more clever and robust about resolving module names to actual URLs.
RequireJS.org provides a popular implementation of this style of module loader.

//END OF COFFEE & CODE  SESSION


INTERFACE DESIGN:
PREDICTABILITY - COMPOSABILITY - LAYERED INTERFACES

Predictability: try to follow convention so users can predict the way your interface will work
and avoid having to spend a lot of time figuring out how it works.
Avoid being unecessarily clever.

Composability: try to use simplest data structures possible.
Make functions do a single, clear thing only. To make them "pure" functions.
The module should be easily composed with other code (by following common convention).

Example: a spell-checker:

-Option 1: If made to operate directly on whichever complicated data structures the editor uses
and directly call internal functions in the editor.
This module could not be used with any other programs.

-Option 2: define a spell-checking interface that just requires you pass a simple string
and it will return the position in the string where it found a possible misspelling,
along with an array of suggested corrections.
This interface could also be composed with other systems because strings and arrays are always available in JavaScript.


Layered Interfaces:  You want to reduce complexity, however,
when a user wants to do complicated things with your module, they should be able to.
A good solution often is to offer two interfaces:
A detailed deep-level one + a simple surface-level one.


SUMMARY:
Modules provide structure to larger programs by seperating the code into different files and namespaces.
Giving these modules well-defined interfaces makes them easier to use and reuse.
Also makes it possible to use them again later for other projects.

JavaScript is not very helpful for modules unlike other languages,
but the flexible functions and objects it provides make it possible to define nice modules.

Functin scopes can be used as internal namespaces for the module.
Objects can be used to store sets of exported values.

There are two commonly-used approaches to modules in JavaScript:

"CommonJS Modules":
-revolves around a "require" functin that fetches a module by name and returns its interface.

AMD (ASYNCHRONOUS MODULE DEFINITION):
- uses a "define" functin that takes an array of module names and a functin,
after loading the modules, runs the functins with their interfaces as arguments.
This code is a lot harder to follow than the "require" functin and does follow a simple, predictable path.



EXERCISES:

MONTHS NAMES:

Write a simple module system similar to the weekDay module that can convert month numbers (zero-based, as in the Date type),
to names and can convert names back to numbers.
Give it its own namespace since it will need an internal array of month names.
Use plain JavaScript, without any module loader systems.


Recall that months in the Date type in JS are quirky, in that they are numbered 0-11.

var month = function() {
  var names = ["January", "February", "March", "April", "May", "June", "July",
               "August", "September", "October", "November", "December"];
  return {
    name: function(number) { return names[number];},
    number: function(name) { return names.indexOf(name);}
  };
// };
}();   //NOTE  Needs the final () brackets (immeditaly invoked) or it will not work.

TESTS:
console.log(month.name(2));   // March
console.log(month.number("November"));  //10


Solution structure:

// a function is expressed:
// the variable name "month" is what stores the interface,
// as in   month.name(2),  or month.number("November").
var month = function() {
  // wraps the variable that holds the array of data needed:
  var names = ["January", "February", "March", "April", "May", "June", "July",
               "August", "September", "October", "November", "December"];

  // returns an object that holds both functions so they can be exported:
  return {
    name: function(number) { return names[number];},
    number: function(name) { return names.indexOf(name);}
  };
  // immidiately invoked
}();



A RETURN TO ELECTRONIC LIFE:
Converting that project into a version that is seperated into modules.

You dont want a module for each functin and type.
Just like a book does not make each page a new chapter.
Instead choose which functions and types you want to group together.

The size of the project will also determine how many modules are a good number.
Dont want to open 10 files for a tiny project.

You can choose to have some functions become internal to their module,
and thus inaccessible to other modules.


Recommended grouping:

Module "grid":
  -Vector
  -Grid
  -directions
  -directionNames

Module "World":
  -(randomElement)
  -(elementFromChar)
  -(charFromElement)
  -View
  -World
  -LifelikeWorld
  -directions [reexported]

Module "simple_ecosystem"
  (randomElement) [duplicated]
  (dirPlus)
  Wall
  BouncingCritter
  WallFollower

Module "ecosystem"
  Wall [duplicated]
  Plant
  PlantEater
  SmartPlantEater
  Tiger


Reexported the "directions" array from the "grid" module from "world",
so that modules built on that (the ecosystems) don’t have to know or worry about the existence of the grid module.

Also duplicated two generic and tiny helper values ("randomElement" and "Wall"),
since they are used as internal details in different contexts,
and do not belong in the interfaces for these modules.



CIRCULAR DEPENDENCIES:

Most module system prohibit a scenario where Module A depends on Module B, And Module B also depdends back on Module A.

CommonJS modules allow a limited form:
as long as the modules do not replace their default "exports" object with another value,
and start accessing each others interfaces ONLY after they finish loading.

A way in which this feature could be implemented:
The trick is to add the "exports" object of a module to "require"s cache BEFORE running the module.
This prevents the module from being able to override module.exports as it doesnt have a chance to do so.
so we do not know whether it may want to export some other value.
After loading, the cache object is overridden with module.exports, which may be a different value.

But if in the course of loading the module, a second module is loaded that asks for the first module,
its default "exports" object, which is likely still empty by this point, will be in the cache,
and the second module will receive a reference to it.
If it doesnt try to do anything with the object until the first module has finished loading,
things will work.
