Building a language that will be called Egg.


PARSING:

A Parser is a program that reads a piece of text and produces a data structure,
that reflects the structure of the program contained in that text.
If a text does not form a valid program, the parser should complain and print an error.


Everything in Egg will be an expression.
An expression can be:
    -a variable
    -a number
    -a string
    -an application

Applications are used for functin calls,
but also for constructs like "if" and "while"

To keep the parser simple, strings in Egg will not support anything like " \ " (backslash escape).
-A string is a simple sequence of characters that are not double quotes wrapped in double quotes.
-A number is a simple sequence of digits.
-Variable names can consist of any character that is not whitesspace and is not a reserved word in the language.

Just like JS, applications are written by putting parentheses after an expression,
and having any number of arguments between those (), seperated by commas. (, , , ,).

    do(define(x, 10),
      if(>(x, 5),    // <- this is explained a bit further down
        print("large"),
        print("small")))

-In Egg, operators such as ">", are just normal variables, applied just like other functions.
(unlike in JS, where they have special meanings).

-Since syntax has no concept of a block, we need a "do" construct to represent multiple things in sequence.

-Each expression object with have "type" property to indicate the kind of expression it is,
and other properties to describe its content.

-Expression of type "value" will be for strings or numbers.
-Their property "value" will contain the string or number.

-Expressions of the type "word" will be for names (identifiers).
-Their property "name" that holds their identifier as a string.

-Expressions of type "apply" represent applications.
-Their property "operator" referes to the expression being applied.
-They can have a "args" property that refers to an array of argument expressions.


The ">(x, 5)"  above would be represented like this:

    {
      type: "apply",
      operator: {type: "word", name: ">"},
      args: [
        {type: "word", name: "x"},
        {type: "value", value: 5}
      ]
    }

This kind of data structure is called a "syntax tree".

Each object branches out. And expressions can contain expressions that themselves can contain expressions.

Because expressions contain other expressions, this problem is solves by writting a parser functin
that is recursive in a way that reflects the recursive nature of the language.


We define a functin parseExpression.
It takes a string as input and returns an object
containing the data structure for the expression at the start of the string,
along with the part of the string left after parsing this expression.

When parsing subexpressions, (example, the argument to an application),
this functincan be called again,  yielding the argument expressions as well as the text that remains.

This text may itself contain more arguments,
or may be the closing parentheses () that ends the list of arguments.

The first part of the parser:

    function parseExpression(program) {
      program = skipSpace(program);
      var match, expr;
      if (match = /^"([^"]*)"/.exec(program))
        expr = {type: "value", value: match[1]};
      else if (match = /^\d+\b/.exec(program))
        expr = {type: "value", value: Number(match[0])};
      else if (match = /^[^\s(),"]+/.exec(program))
        expr = {type: "word", name: match[0]};
      else
        throw new SyntaxError("Unexpected syntax: " + program);

      return parseApply(expr, program.slice(match[0].length));
    }

    //to remove any whitespace at the beginning of the string:
    function skipSpace(string) {
      var first = string.search(/\S/);
      if (first == -1) return "";
      return string.slice(first);
    }

Because Egg allows any amount of whitespace between elements,
we have to cut the whitespace off the start of the string.
This is what the skipSpace functin helps with.

Then, parseExpression uses 3 regular expressions,
to spot (RegExp match) the 3 simple elements that Egg supports:
-strings,
-numbers      // <- THIS CANT BE RIGHT BASED ON ABOVE
-and words.
The parser constructs a different kind of data structure depending on which on matches.

Review:
"values" is either strings or numbers.
"words" are identifiers, in the form of strings.

("application" does not qualify as one of the 3 types?)

If the inputed program does not match one of the 3 types (via RegExp),
it is not a valid expression, and parser throws a SyntaxError.

Then we can cut off the part that we matched from the input program string and pass that,
along with the object for the expression, to the next part: "parseApply".
parseApply checks whether the expression is an application.
If it is, it parses a list of arguments in parethesis ().

    function parseApply(expr, program) {
      program = skipSpace(program);
      if (program[0] != "(")
        return {expr: expr, rest: program};

      program = skipSpace(program.slice(1));
      expr = {type: "apply", operator: expr, args: []};
      while (program[0] != ")") {
        var arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ",")
          program = skipSpace(program.slice(1));
        else if (program[0] != ")")
          throw new SyntaxError("Expected ',' or ')'");
      }
      return parseApply(expr, program.slice(1));
    }

If the next character in the (inputed?) program is not an "(" opening parenthesis,
this is not an application, so "parseApply" simply returns the expression it was given.

Otherwise, it skips that opening "("
and creates a syntax tree object for this application expression.
It then recursively calls "parseExpression", to parse each argument until a closing ")" is found.

The recursion is indirect, as "parseApply" and "parseExpression" call each other.

Because an application expression can itself be applied,
(ex: multiplier(2)(1)), "parseApply" must, (after it has parsed an application), call itself again,
to check whether another pair of "()" follows.


THIS IS ALL WE NEED TO PARSE "Egg".
We wrap it in a convenient "parse" functin that verifies that is has reached the end of an input string,
after parsing the expression (an Egg program is a single expression).
This gives us the programs data structure.

    function parse(program) {
      var result = parseExpression(program);
      if (skipSpace(result.rest).length > 0)
        throw new SyntaxError("Unexpected text after program");

      return result.expr;
    }

console.log(parse("+(a, 10)"));
    // {type: "apply",
    //  operator: {type: "word", name: "+"},
    //  args: [{type: "word", name: "a"},
    //         {type: "value", value: 10}]}


It works enough for our purposes.
Things it does NOT do well:
-doesnt give very helpful information when it fails
-doesnt store the line and column on which each expression starts (which would be helpful when reporting errors)



THE EVALUATOR:

The "Evaluator" is what runs the syntax tree for a program.
You provide it a syntax tree + an environment object that associates names with values,
and it will evaluate the expresion that the tree represents,
and return the value that this produces.


    function evaluate(expr, env) {
      switch(expr.type) {
        case "value":
          return expr.value;

        case "word":
          if (expr.name in env)
            return env[expr.name];
          else
            throw new ReferenceError("Undefined variable: " + expr.name);

        case "apply":
          if (expr.operator.type == "word" && expr.operator.name in specialForms)
            return specialForms[expr.operator.name](expr.args, env);
          var op = evaluate(expr.operator, env);
          if (typeof op != "function")
            throw new TypeError("Applying a non-function.");
          return op.apply(null, expr.args.map(function(arg) {
            return evaluate(arg, env);
          }));
      }
    }
    var specialForms = Object.create(null);

The "evaluator" has code for each of the expression types.
An expression that is a literal value, simply produces its value.
Ex: Expression of "100"  simply evaluates to the number 100.

For a variable, we must check whether it is actually defined in the environment,
and if it is, fetch the variables value.



Applications are more complicated.
If they are a special form like "if",
we do not evaluate anything and simply pass the argument expressions + the environment,
to the functin that handles this form.
If it is a normal call, we evaluate the operator, check that is a functin,
and call it with the result that comes from evaluating the arguments.


"Egg"s functin values will be represented with plain JavaScript functin values.
(This will be elaborated later, when a special form called "fun" is defined).


"evaluate" is also recursive similarly to "parser".
It is possible to integrate the two "evaluate" + "parser" together,
where the evaluate is done within "parser",
but this would make it less readable.

THIS IS ALL THAT IS NEEDED TO INTERPRET "Egg".

But to do something useful with the language,
we need to define a few "special forms" and add some useful values to the environment.


SPECIAL FORMS

The "specialForms" object is used to define special syntax in Egg.
It associates words with functions that evaluate these special forms.
It starts out empty, so we will now add some forms:

For the "if" contruct.
It needs exactly 3 arguments, and is similar to the ternary operator (x ? y : z):

    specialForms["if"] = function(args, env) {
      if (args.length != 3)
        throw new SyntaxError("Bad number of args to if");

      // ternary operator (x ? y : z):
      if (evaluate(args[0], env) !== false)
        return evaluate(args[1], env);
      else
        return evaluate(args[2], env);
    };

The "if" construct expects exactly 3 arguments in a ternary operator fasion.
(x ? y : z):
If the first provided argument, args[0] "x", is not "false",
If then evaluates the second, args[1] "y".
If it is false, then it will evaluate the third argument, args[2] "z".

The value it produces will be  "y" or "z".

Unlike JavaScript, "Egg" only teats "false" as false.
Where as JS also treats other "falsy things" like 0 or an empty string also as "false".


"if" needs to a special form rather than a regular functin,
because all arguments to functions are evaluated before the functin is called.
But "if" should evaluate EITHER "y" or "z" depending on if "x" is "false".


The "while" form is similar:

    specialForms["while"] = function(args, env) {
      if (args.length != 2)
        throw new SyntaxError("Bad number of args to while");

      while (evaluate(args[0], env) !== false)
        evaluate(args[1], env);

      //NOTE Since "undefined" does nothing in "Egg", we return false.
      // for lack of a meaningful result.
      return false;
    };


Another basic one that we need is "do",
which executes all its arguments from top to bottom.
Its value is the value produced by the last argument:
(Dont quite understand this one properly)

    specialForms["do"] = function(args, env) {
      var value = false;
      args.forEach(function(arg) {
        value = evaluate(arg, env);
      });
      return value;
    };


A form called "define" is also needed to be able to create variables and give them new values.
It expects a word as its first argument
+ a second argument that is an expression that produces the value to assign to that word.

Because it is an expression like everything else, it must return a value.
So we make it return the value that was assigned.
(This is like JS  "=" operator ?).

    specialForms["define"] = function(args, env) {
      if (args.length != 2 || args[0].type != "word")
        throw new SyntaxError("Bad use of define");
      var value = evaluate(args[1], env);
      env[args[0].name] = value;
      return value;
    };


THE ENVIRONMENT

The environment "env" accepted by "evaluate" is an object with properties,
whose names correspond to variable names,
and whose values correspond to the values that those variables are bound to.
Now we wil define an environment object that represents the global scope.

To be able to use the "if" construct above, we must have access to Boolean values.
Since there is only 2 Boolean values, "true" or "false",
we dont need special syntax for them.
We just bind these two variables to the "true" and "false".

    var topEnv = Object.create(null);

    topEnv["true"] = true;
    topEnv["false"] = false;


We can now evaluate a simple expression that uses a Boolean.
This expression negates a Boolean value?

    var prog = parse("if(true, false, true)");
    console.log(evaluate(prog, topEnv));
    // false

Is it the idea of if(x ? y : z)?
So x = true, thus y is returned, and y = false, so the returned value is y, false?
Might try in reverse order to see.

    var prog = parse("if(true, true, false)");
    console.log(evaluate(prog, topEnv));
    // true
    var prog = parse("if(false, false, true)");
    console.log(evaluate(prog, topEnv));
    // true
    var prog = parse("if(false, true, false)");
    console.log(evaluate(prog, topEnv));
    // false

My theory was correct!




To make basic arithmatic and comparison operators work,
we will add some functin values to the environment.
To keep the code short, we use "new Function" to synthesize a bunch of operators in a loop,
instead of defining them all individually.

    ["+", "-", "*", "/", "==", "<", ">"].forEach(function(op) {
      topEnv[op] = new Function("a, b", "return a " + op + " b;");
    });

"op" is each item in the array, one at time.
So first is makes:
return a + b;
return a - b;
return a * b;
return a / b;
.
.


We also want a way to output variables, cause thats very useful,
so we will wrap console.log in a functin and call it "print". LIKE PYTHON!!!

    topEnv["print"] = function(value) {
      console.log(value);
      return value;
    };


Now we have enough elementary tools to write simple programs.

Now this "run" function provides a convevient way to write and run these tools.
It creates a fresh environment and parses and evaluates the strings we give it
as a single program.

    function run() {
      var env = Object.create(topEnv);
      var program = Array.prototype.slice.call(arguments, 0).join("\n");
      return evaluate(parse(program), env);
    }

The "Array.prototype.slice.call" is a trick to turn array-like objects (such as arguments),
into a real array so that we can use .join() on it. (.join() only works on arrays).
It takes all the arguments given to run, and treats them as the lines of a program.


    run("do(define(total, 0),",
        "   define(count, 1),",
        "   while(<(count, 11),",
        "         do(define(total, +(total, count)),",
        "            define(count, +(count, 1)))),",
        "   print(total))");

// 55


This just computes the sum of the numbers 1 to 10, that weve seen before,
But expressed in Egg!
It is clearly uglier than the equivalent in JS,
but not bad for a language implemented in less than 150 lines of code.

//CODE WORKS UP TO HERE.
