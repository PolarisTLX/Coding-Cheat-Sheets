http://www.eriktrautman.com/posts/ruby-explained-blocks-procs-and-lambdas-aka-closures

Blocks and Procs are both a type of "closure". A closure is basically a formal, computer-science-y way of saying "a chunk of code that you can pass around but which hangs onto the variables that you gave it when you first called it". It's the blanket term used to refer to blocks and Procs and...

There are two other similar closures to be aware of but about which you certainly don't need to be an expert because they're used in less typical applications. The first of these is a lambda. If Procs are sort of a more-fleshed-out version of blocks, then lambdas are sort of a more-fleshed-out version of Procs. They are one step closer to being actual methods themselves, but still technically count as anonymous functions. If you're coming from Javascript, anonymous functions shouldn't be anything new to you.


.
.
.

The second additional closure is called a Method because, well, it's the closest of the four (blocks, Procs, lambdas, and Methods) to an actual method. Which it is. "Method"'s (capitalized because they're actually a class of their own) are really just a convenient way to pass a normal method to another normal method by wrapping the symbol of its name in the word method()

.
.
.


Blocks are unnamed little code chunks you can drop into other methods. Used all the time.

Procs are identical to blocks but you can store them in variables, which lets you pass them into functions as explicit arguments and save them for later. Used explicitly sometimes.

Lambdas are really full methods that just havent been named. Used rarely.

Methods are a way of taking actual named methods and passing them around as arguments to or returns from other methods in your code. Used rarely.

Closure is just the umbrella term for all four of those things, which all somehow involve passing around chunks of code.
