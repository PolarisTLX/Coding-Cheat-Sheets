/*
https://www.hackerrank.com/contests/microverse-fast-track/challenges/grading/problem

HackerLand University has the following grading policy:

Every student receives a  in the inclusive range from  to .
Any  less than  is a failing grade.
Sam is a professor at the university and likes to round each student's  according to these rules:

If the difference between the  and the next multiple of  is less than , round  up to the next multiple of .
If the value of  is less than , no rounding occurs as the result will still be a failing grade.
For example,  will be rounded to  but  will not be rounded because the rounding would result in a number that is less than .

Given the initial value of  for each of Sam's  students, write code to automate the rounding process. For each , round it according to the rules above and print the result on a new line.

Input Format

The first line contains a single integer denoting  (the number of students).
Each line  of the  subsequent lines contains a single integer, , denoting student 's grade.

Constraints

Output Format

For each  of the  grades, print the rounded grade on a new line.

Sample Input 0

4
73
67
38
33
Sample Output 0

75
67
40
33
Explanation 0

image

Student  received a , and the next multiple of  from  is . Since , the student's grade is rounded to .
Student  received a , and the next multiple of  from  is . Since , the grade will not be modified and the student's final grade is .
Student  received a , and the next multiple of  from  is . Since , the student's grade will be rounded to .
Student  received a grade below , so the grade will not be modified and the student's final grade is .

*/


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

function solve(grades){
    // Complete this function

    // create empty array to store final grades
    var returnedGrades = [];

    // loop through all integers provides in the grades argument
    for (i in grades) {
        // condition 1: if less than 38. Do nothing to that grade and push it to the final array as is.
        if (grades[i] < 38) {
            returnedGrades.push(grades[i]);

        // condition 2: if the grade is already a multiple of 5. Do nothing to that grade and push it to final array as is.
        } else if (grades[i] % 5 == 0) {
            returnedGrades.push(grades[i]);

        } else {

            // grade is not multiple of 5, and is > 38. Check if the difference to the "NEXT" multiple of 5 is >= 3:

            if (Math.ceil(grades[i]/5)*5 - grades[i] >= 3) {
                // condition 3: the difference is >= 3. Do nothing to that grade and push it to final array as is.
                returnedGrades.push(grades[i]);
            } else {
                // condition 4: the difference is not >= 3. Therefore find the "NEXT" multiple of five, and push that new grade to                        final array.
                returnedGrades.push(Math.ceil(grades[i]/5)*5);
            }
        }
    }
    return returnedGrades;
}

function main() {
    var n = parseInt(readLine());
    var grades = [];
    for(var grades_i = 0; grades_i < n; grades_i++){
       grades[grades_i] = parseInt(readLine());
    }
    var result = solve(grades);
    console.log(result.join("\n"));

}
