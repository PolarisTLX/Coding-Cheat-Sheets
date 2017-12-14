/*  SOCK MERCHANT PROBLEM
https://www.hackerrank.com/contests/microverse-fast-track/challenges/sock-merchant/problem
John works at a clothing store and he's going through a pile of socks to find the number of matching pairs. More specifically, he has a pile of  loose socks where each sock  is labeled with an integer, , denoting its color. He wants to sell as many socks as possible, but his customers will only buy them in matching pairs. Two socks,  and , are a single matching pair if they have the same color ().

Given  and the color of each sock, how many pairs of socks can John sell?

Input Format

The first line contains an integer, , denoting the number of socks. 
The second line contains  space-separated integers describing the respective values of .

Constraints

Output Format

Print the total number of matching pairs of socks that John can sell.

Sample Input
9
10 20 20 10 10 30 50 10 20

Sample Output
3


Explanation

sock.png

As you can see from the figure above, we can match three pairs of socks. Thus, we print  on a new line.
*/

/////////////// this portion below is custom code to work with a webinterface, can ignore ////////////////////

process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function sockMerchant(n, ar) {
    // Complete this function
    
    // create an object that has a key for each color
    // then increase the value for each color by one for each occurence
    var allSocks = ar.reduce(function (object, color) {
                            if (typeof object[color] == 'undefined') {
                               object[color] = 1;
                            } else {
                               object[color] += 1;
                            }
                            return object
                            }, {});
    
    //NOTE  apparently the reduce function above can be  written as just a ternary:    acc[curr] ? acc[curr]++ : acc[curr] = 1;
    
    
    // create a array that stores all the values for each kind color
    // SPECIAL NOTE  Object.values()  should have worked here to replace the 5 lines of code below, but not all browsers support it?
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values
    var allMatchingSocks = [];
        
    for(var key in allSocks) {
          var value = allSocks[key];
        allMatchingSocks.push(value);
    }

    // For each value, each 2 makes 1 pair
    var totalPairs = 0;
    
    for (colors in allMatchingSocks) {
       totalPairs += Math.floor((allMatchingSocks[colors]/2));
       // Math.floor accounts for 1 remaining sock not adding to the total count of pairs 
    }   
    
    return totalPairs;
}

function main() {
    var n = parseInt(readLine());
    ar = readLine().split(' ');
    ar = ar.map(Number);
    var result = sockMerchant(n, ar);
    process.stdout.write("" + result + "\n");

}
