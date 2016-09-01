/**
 * Created by Panglot on 31-Aug-16.
 */
/* globals module, document, HTMLElement, console */
function solve(inputArray) {
    var i,
        limit = inputArray.length,
        outputArray = [];

    for(i = 0; i<limit; i+=1){
        if(primeCheck(inputArray[i])){
            outputArray.push(inputArray[i]);
        }
    }

    console.log("All primes in the given array: " + outputArray.join(', '));


    function primeCheck(numberToCheck) {
        var i,
            limit = Math.sqrt(numberToCheck);

        for (i = 2; i <= limit; i += 1) {
            if (Number.isInteger(numberToCheck / i)) {
                return false;
            }
        }

        return true;
    }
}

solve([1,2,3,4,5,6,7,8,9,10,11,12,13,14]);