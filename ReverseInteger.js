// Test code
var aVal = -2147483648;

var rev = reverse(aVal);
console.log("Reverse is:", rev);
aVal = 1563847412;
rev = reverse(aVal);
console.log("Reverse is:", rev);
aVal = -2147483412;
rev = reverse(aVal);
console.log("Reverse is:", rev);

function reverse(input) {
    let inputString = String(input);

    // isNeg value will later differentiate loop iteration counts between negative and positive input
    var isNeg = false;

    //var checkValidParse = ['9', '0', '0', '7', '1', '9', '9', '2', '5', '4', '7', '4', '0', '9', '9', '2'];
    // This is the maximum (and minimum) integer value that can be reversed. Each character represents an index
    // into an array which we will later use to check if integer overflow has occured on the reverse function
    var checkValidParse = ['2', '1', '4', '7', '4', '8', '3', '6', '5', '1'];

    // we'll append the characters from inputString in reverse order to copyStr
    let copyStr = "";
    var stopVal = 0;

    // Add a negative to the copyStr if the number passed in is negative. Set the stop value to 1 because
    // once we starting filling copyStr we don't want to add the negative symbol twice. 
    if (inputString.startsWith("-")) {
        copyStr += "-";
        isNeg = true;
        stopVal = 1;
    }

    // Reverse the inputString with input integers using copyStr string. 
    var start = inputString.length - 1;
    for (start; start >= stopVal; start--) {
        copyStr += inputString.charAt(start);
    }

    // make sure you're parsing a valid integer. If the count of characters in the string is greater than
    // the length of the checkValidParse array, we know it's going to overflow, so return 0.
    // wf boolean will be used to determine if integer overflow occured so we can return 0.
    var wf = false;
    if (isNeg == false) {
        // Edge case where we're given an integer not in the range of valid integers. Return 0 because
        // we already know there's too many digits to reverse this integer in 32 bits. 
        if (copyStr.length > checkValidParse.length) {
            return 0;
        }
        else if (copyStr.length == checkValidParse.length) {
            for (var x = 0; x < checkValidParse.length; x++) {
                if (copyStr.charAt(x) == checkValidParse[x]) {
                    continue;
                }
                else if (copyStr.charAt(x) < checkValidParse[x]) {
                    wf = true;
                    break;
                }
                else {
                    break;
                }
            }
            // If wf was never set to true, we know that the each copyStr digit was greater than 
            // the max digit combination specified in checkValidParse. Therefore, integer overflow has occured. 
            if (wf == false) {
                return 0;
            }
        }
    }
    
    // Check the copyStr contents with a leading negative character. Make sure we're 
    // not exceeding the integer bounds so we can later parse the string to an int. 
    else if (isNeg == true) {
        if ((copyStr.length - 1) > checkValidParse.length) {
            return 0;
        }
        else if ((copyStr.length - 1) == checkValidParse.length) {
            var loopStart = 1;
            for (var x = 0; x < checkValidParse.length; x++) {
                if (copyStr.charAt(loopStart) == checkValidParse[x]) {
                    loopStart = loopStart + 1;
                    continue;
                }
                else if (copyStr.charAt(loopStart) < checkValidParse[x]) {
                    wf = true;
                    break;
                }
                else {
                    break;
                }
            }
            if (wf == false) {
                return 0;
            }
        }
    }
    var retValue = parseInt(copyStr, 10);
    return retValue;
}