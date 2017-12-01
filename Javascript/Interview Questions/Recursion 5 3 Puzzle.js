PUZZLE:
By starting from the number 1 and repeatedly either adding 5 or multiplying by 3.
Write a function that, given a number, tries to find a sequence of such additions and multiplications
that produce that number? For example, the number 13 could be reached by first multiplying by 3 and then adding 5 twice,
whereas the number 15 cannot be reached at all.

Recursive solution:

function findSolution(target) {

  function find(current, history) {  // NOTE this function is just described here, it does nothing until it actually called on the last line
    if (current == target)
      return history;
    else if (current > target)
      return null;
    else
      return find(current + 5, "(" + history + " + 5)") ||
             find(current * 3, "(" + history + " * 3)");
             // here if the first option returns "null", then it does the 2nd one
  }
  return find(1, "1") || "null";  // if there is no solution, return "null"
}

console.log(findSolution(24));
// → (((1 * 3) + 5) * 3)

Note that this program doesn’t necessarily find the shortest sequence of operations. It is satisfied when it finds any sequence at all.

Example of number 13 to better understand how this function works:
The solution is 3 + 5 + 5.
or   "(((1 * 3) + 5) + 5)"

All the calls/steps are:

find(1, "1")
  find(6, "(1 + 5)")
    find(11, "((1 + 5) + 5)")
      find(16, "(((1 + 5) + 5) + 5)")
        too big, try * 3
      find(33, "(((1 + 5) + 5) * 3)")
        too big, go back and try * 3 on previous step
    find(18, "((1 + 5) * 3)")
      too big, go back and try * 3 on previous step
  find(3, "(1 * 3)")
    find(8, "((1 * 3) + 5)")
      find(13, "(((1 * 3) + 5) + 5)")
        found!
