REMOVE ALL COMMENTS FROM JS CODE:

function stripComments(code) {
  //return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
  // (fixed example here, explained below)
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}

comment1 = "x = 10;// ten!";
comment2 = "1 + /* 2 */3";
comment3 = "1 /* a */+/* b */ 1";

console.log(stripComments(comment1));  // x = 10
console.log(stripComments(comment2));  // 1 + 3
console.log(stripComments(comment3));  // 1  1   <-- PROBLEM


The [^]* part the expression does some RegExp backtracking, will first match as much as it can.
If that causes the next part of the pattern to fail, it moves back one character and tries again from there.


The repetition operators (+, *, ?, {}) are "greedy":
Because they match as much as they can and backtrack from there.
If you put a "?" after them (+?, *?, ??, {}?), they become non-greedy,
because they start by matching as little as possible,
matching more only when the remaining pattern does not fil the smaller match.

// so now the same function with an extra "?" in the RegExp:
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}

comment3 = "1 /* a */+/* b */ 1";
console.log(stripComments(comment3));
// 1 + 1  (proper)
// (instead of   " 1  1 " like above)
