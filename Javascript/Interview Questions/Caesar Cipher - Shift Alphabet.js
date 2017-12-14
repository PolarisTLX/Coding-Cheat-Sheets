Julius Caesar protected his confidential information by encrypting it in a cipher. Caesar's cipher rotated every letter in a string by a fixed number, k, making it unreadable by his enemies. Given a string, s, and a number, k, encrypt  and print the resulting string.

Note: The cipher only encrypts letters; symbols, such as -, remain unencrypted.

Input Format

The first line contains an integer, n , which is the length of the unencrypted string. 
The second line contains the unencrypted string, s. 
The third line contains the integer encryption key, k, which is the number of letters to rotate.

Constraints 
1<= n <= 100
0 <= k <= 100   <---- THIS IS IMPORTANT TO SOLVE ALL TEST CASES!!!
 
s is a valid ASCII string and doesn't contain any spaces.

Output Format

For each test case, print the encoded string.

Sample Input

11
middle-Outz
2
Sample Output

okffng-Qwvb
Explanation

Each unencrypted letter is replaced with the letter occurring k spaces after it when listed alphabetically. 
Think of the alphabet as being both case-sensitive and circular; if k rotates past the end of the alphabet, it loops back to the beginning (i.e.: the letter after z is a, and the letter after Z is A).

Selected Examples: 
m (ASCII 109) becomes o (ASCII 111). 
i (ASCII 105) becomes k (ASCII 107). 
 remains the same, as symbols are not encoded. 
O (ASCII 79) becomes Q (ASCII 81). 
z (ASCII 122) becomes b (ASCII 98); because z is the last letter of the alphabet, a (ASCII 97) is the next letter after it in lower-case rotation.

/////////////// this portion is custom code to work with a webinterface, can ignore ////////////////////

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

function main() {
    var n = parseInt(readLine());
    var s = readLine();
    var k = parseInt(readLine());
    
    // if k is a number that is greater then the lengths of the alphabet, subtract(or add) 26 from/to it until it is <= 26 
    while (k > 26) {
        k -= 26;        
    }
    while (k < 0) {
        k += 26;       
    }    

    var lettersUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lettersLower = "abcdefghijklmnopqrstuvwxyz";
    
    var newString = "";
    
    for (var i in s) {
        
        var sourceLetters = "";
        
        // if i in string is a letter A-Z:        
        if (lettersUpper.indexOf(s[i]) > -1) {            
            sourceLetters = lettersUpper;
        }
        // if i in string is a letter a-z: 
        if (lettersLower.indexOf(s[i]) > -1) {            
            sourceLetters = lettersLower;
        }
        
        // if sourceLetters was assigned (it was not a special character):
        if (sourceLetters.length > 0) {
            
            var index = sourceLetters.indexOf(s[i]);
            
            // Special condition 1: k is negative and it crosses below 0, so need to add 26 to the index, 
            // and concatenate the letter at that index to the newString.
            if (index+k < 0) {
                newString += sourceLetters[(index+k)+26];
                
            // Special condition 2: k is positive and it crosses passed the end, so need to subtract 26 from the index 
            // and concatenate the letter at that index to the newString.
            } else if (index+k > 25) {
                newString += sourceLetters[(index+k)-26];
                
            // normal condition: simply contatenate the letter at that index+k to the newString
            } else {
                newString += sourceLetters[index+k];
            }           
            
        // else it is a special character, and simply concatenate that to the newString as is.    
        } else {
            newString += s[i];
        }       
    }
    console.log(newString);    
}
