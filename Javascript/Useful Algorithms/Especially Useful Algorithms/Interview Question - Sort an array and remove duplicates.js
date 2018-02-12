function simplify(array) {
    // sort the provided array using built-in .sort() method:
    var sortedArray = array.sort()
    // created new empty array:
    var newArray = [];
    // loop through every item in the sortedArray:
    for (var i in sortedArray) {
        // while looping, if the current item does not currently exist in "newArray" (indexOf() == -1), add it (newArray.push()):
        if (newArray.indexOf(sortedArray[i]) == -1) {
            newArray.push(sortedArray[i]);
        }
    }
    return newArray;
}
