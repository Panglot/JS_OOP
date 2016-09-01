/**
 * Created by Panglot on 31-Aug-16.
 */
/* globals module, document, HTMLElement, console */
function solve(inputArray) {
    var i, sum = 0, currentElement;

    if(inputArray === undefined){
        throw "Error: Empty array. No parameters passed";
    }
    else if(inputArray.length === 0){
        return null;
    }

    for (i = 0; i<inputArray.length; i+=1){
        if(isNaN(inputArray[i])) {
            throw "Error: There are elements in the array that are not convertible to number.";
        }
            currentElement = Number(inputArray[i]);
            sum+=currentElement;
    }

    return sum;
}

console.log(solve([1,'2','5']));