Math.random creates a random number:

console.log(Math.random());
// → 0.36993729369714856
console.log(Math.random());
// → 0.727367032552138
console.log(Math.random());
// → 0.40180766698904335

To create a whole random number instead of a fractional one,
we can use Math.floor (which rounds down to the nearest whole number) on the result of Math.random.

console.log(Math.floor(Math.random() * 10));
// → 2

Multiplying the random number by 10 gives us a number greater than or equal to zero, and below 10.

Since Math.floor rounds down, this expression will produce, with equal chance, any number from 0 through 9.

Math.ceil rounds up.
Math.round returns the nearest whole number.



How does a computer produce a random number?:
To produce numbers that appear random,
the machine keeps a number (or a bunch of numbers) in its internal state.
Then, every time a random number is requested, it performs some complicated deterministic computations
on this internal state and returns part of the result of those computations.

The machine also uses the outcome to change its own internal state
so that the next “random” number produced will be different.
