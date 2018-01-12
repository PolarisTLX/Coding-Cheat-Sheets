Building a language that will be called Egg.


PARSING:

A Parser is a program that reads a piece of text and produces a data structure,
that reflects the structure of the program contained in that text.
If a text does not form a valid program, the parser should complain and print an error.


Everything in Egg will be an expression.
An expression can be a variable, a number, a string or an application.

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

-Each expression object with have "type" property to indicate the kind of expression it is, and other properties to describe its content.

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
to spot (RegExp match) the 3 simple elements that Egg supports: strings, numbers and words.
The parser constructs a different kind of data structure depending on which on matches.

If the inputed program does not match one of the 3 types (via RegExp),
it is not a valid expression, and parser throws a SyntaxError.

Then we can cut off the part that we matched from the input program string and pass that,
along with the object for the expression, to the next part: "parseApply".
parseApply checks whether the expression is an application.
If it is, it parses a list of arguments in parethesis ().

    function parseApply (expr, program) {
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
        return end[expr.name]
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
