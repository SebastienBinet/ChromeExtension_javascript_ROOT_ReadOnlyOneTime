/* gestureRecognition.js */

/*global $, jQuery, alert*/

/*jslint plusplus: true */
/*jslint devel: true */
/*jslint browser: true*/
/*jslint vars:true */

var GESTURE_RECOGNITION_PERIOD_MS = 50; // ms
//in progress - function oneCapture() {
//    this.toString = function() {
//        var retString = "";
//        if (x != null) {retString += x + ", ";} else { retString += "., ";}
//        if (isThereAnEraseGesture != null) {retString += isThereAnEraseGesture + ", ";} else { retString += "., ";}
//        if (averageLast3Reverses != null) {retString += averageLast3Reverses + ", ";} else { retString += "., ";}
//        if (minInLast3Reverses != null) {retString += minInLast3Reverses + ", ";} else { retString += "., ";}
//        if (maxInLast3Reverses != null) {retString += maxInLast3Reverses + ", ";} else { retString += "., ";}
//        if (x != null) {retString += x;}
//        if (x != null) {retString += x;}
//        return retString;
//    };
//}

var REVERSE_THRESHOLD = 100; // to detect that we reversed the mouse direction, we need to travel at least 100 pixels in the new direction.
var last20Captures = [];
//last20Captures.prototype.toString() {}

var validateDetection; // function forward declaration
var addThisMouseCoordinate; // function  forward declaration
var getMouseGestureStatus; // function  forward declaration




validateDetection(
    "543hjk345",
    [
        // "(" - cursor, 
        //       "2" - how many reverses in last 20 captures, 
        //          "true" - is there are at least 3 reverse in last 20 captures,
        //             "1101" - if there are at least than 3, value of the average, starting with 3rd reverse up to now (+- 5 is ok)
        //                 "1000" - if there are at least than 3, min since 3rd reverse up to now
        //                     "2000" - if there are at least than 3, max since 3rd reverse up to now
        //  (          
        //   \
        //    )
        //   /             mouse
        //  (
        //   \
        //   |
        //    \
        //
        //
        //   .       
        //    .
        //    .            average on last 3 reverses
        //   .
        //   .
        //    .
        //
        //  >    <
        //  >     <
        //  >     <
        //   >    <       range in last 3 reverses
        //   >    <
        //   >   <
        //
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
                                                                                                                    {x: 2000, qtyR: 0, was3R: false, av: -1, min: -1, max: -1},
        //                                                                  900  925  950  975  1000 1025 1050 1075 1100 1125 1150 1175 1200 1225 1250 1275 1300
        {x: 1025, qtyR: 1, was3R: false, av:   -1, min:  -1, max:   -1},//                               /
        {x:  950, qtyR: 1, was3R: false, av:   -1, min:  -1, max:   -1},//               (
        {x: 1000, qtyR: 1, was3R: false, av:   -1, min:  -1, max:   -1},//                          \
        {x: 1075, qtyR: 2, was3R: false, av:   -1, min:  -1, max:   -1},//                                         \              
        {x: 1100, qtyR: 2, was3R: false, av:   -1, min:  -1, max:   -1},//                                              )
        {x: 1050, qtyR: 2, was3R: false, av:   -1, min:  -1, max:   -1},//                                    /
        {x:  975, qtyR: 3, was3R: true,  av: 1025, min: 950, max: 1100},//                    /         .
        {x:  925, qtyR: 3, was3R: true,  av: 1012, min: 925, max: 1100},//          (                  .
        {x: 1000, qtyR: 3, was3R: true,  av: 1012, min: 925, max: 1100},//                          \ .
        {x: 1025, qtyR: 3, was3R: true,  av: 1012, min: 925, max: 1100},//                             . \
        {x: 1050, qtyR: 4, was3R: true,  av: 1025, min: 925, max: 1100},//                               .    \
        {x: 1050, qtyR: 4, was3R: true,  av: 1025, min: 925, max: 1100},//                               .    |
        {x: 1050, qtyR: 4, was3R: true,  av: 1030, min: 925, max: 1100},//                                .   |
        {x: 1050, qtyR: 4, was3R: true,  av: 1030, min: 925, max: 1100},//                                .   |
        {x: 1050, qtyR: 4, was3R: true,  av: 1035, min: 925, max: 1100},//                                 .  |
        {x: 1050, qtyR: 4, was3R: true,  av: 1035, min: 925, max: 1100},//                                 .  |
        {x: 1050, qtyR: 4, was3R: true,  av: 1035, min: 925, max: 1100},//                                 .  |
        {x: 1050, qtyR: 4, was3R: true,  av: 1035, min: 925, max: 1100},//                                 .  |
        {x: 1050, qtyR: 2, was3R: true,  av: 1035, min: 925, max: 1100},//                                  .  |
        {x: 1050, qtyR: 2, was3R: false, av:   -1, min:  -1, max:   -1},//                                  . |
        {x: 1050, qtyR: 2, was3R: false, av:   -1, min:  -1, max:   -1},//                                  . |
        {x: 1050, qtyR: 2, was3R: false, av:   -1, min:  -1, max:   -1},//                                  . |
        {x: 1050, qtyR: 1, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 1, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 1, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 0, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 0, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 0, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 0, was3R: false, av:   -1, min:  -1, max:   -1}//                                     |
    ]
);


function validateDetection(id, testVector) {
    "use strict";
    var i;
    var errorWasDetected = false;
    document.writeln("<br> starting test with id: " + id + "<br> ");

    for (i = 0; i < testVector.length; i++) {
        addThisMouseCoordinate(testVector[i].x);
        var status = getMouseGestureStatus();
        if (status.isThereAnEraseGesture !== testVector[i].was3R) {
            document.writeln("<br>ERROR 65465. for element #" + i + ", expected value was:   " + testVector[i].was3R + ", but received " + status.isThereAnEraseGesture + " instead.");
            errorWasDetected = true;
        }
        if ((status.averageLast3Reverses < testVector[i].av - 5) || (status.averageLast3Reverses > testVector[i].av + 5)) {
            document.writeln("<br>ERROR uytuty. for element #" + i + ", expected average was:" + testVector[i].av + ", but received " + status.averageLast3Reverses + " instead.");
            errorWasDetected = true;
        }
        if (status.minInLast3Reverses !== testVector[i].min) {
            document.writeln("<br>ERROR 456rtu. for element #" + i + ", expected minLast was:" + testVector[i].min + ", but received " + status.minInLast3Reverses + " instead.");
            errorWasDetected = true;
        }
        if (status.maxInLast3Reverses !== testVector[i].max) {
            document.writeln("<br>ERROR 9rt97y. for element #" + i + ", expected maxLast was:" + testVector[i].max + ", but received " + status.maxInLast3Reverses + " instead.");
            errorWasDetected = true;
        }
    }
    document.writeln("<br> finishing test with  id: " + id + "<br> ");

}


function helper_valueIfNotNullElseMinus1(x) {
    "use strict";
    if (x !== null) {
        return x;
    } else {
        return -1;
    }
}

function addThisMouseCoordinate(x) {
    "use strict";
    // drop oldest value
    var currentLength = last20Captures.length;
    if (currentLength === 20) {
        last20Captures.shift();
    }
    
    last20Captures.push({
        x: x,
        isThereAnEraseGesture: false,
        averageLast3Reverses: -1, // average Last 3 Reverses
        minInLast3Reverses: -1,
        maxInLast3Reverses: -1
    });
    var newLength = last20Captures.length;
//    last20Captures[newLength - 1].x = x;
    console.log(">>>>>add>> x:" + x);
    var index;
    var qtyReverse = 0;
    var isThereAReverseCausedByThisCapture;
    var somme = 0;
    var extremePositionThatThisMovementHasReached = last20Captures[0].x;
    var currentlyInAMoveToRight = true;
    var averageLast3Reverses = -1;
    
    // identify the number of reverse
    for (index = 0; index < newLength; index++) {
        var xAtThisIndex = last20Captures[index].x;
        isThereAReverseCausedByThisCapture = false;
//        if (areWeLookingForANewMax && (xAtThisIndex > immediateMovingWindowMax)) {
//            // we are moving the immediate window right
//            immediateMovingWindowMax = xAtThisIndex;
//            immediateMovingWindowMin = xAtThisIndex - 100;
//            areWeLookingForANewMin = true;
//            areWeLookingForANewMax = false;
//            qtyReverse++;
//            isThereAReverseCausedByThisCapture = true;
//        } else if (areWeLookingForANewMin && (xAtThisIndex < immediateMovingWindowMin)) {
//            // we are moving the immediate window left
//            immediateMovingWindowMin = xAtThisIndex;
//            immediateMovingWindowMax = xAtThisIndex + 100;
//            areWeLookingForANewMin = false;
//            areWeLookingForANewMax = true;
//            qtyReverse++;
//            isThereAReverseCausedByThisCapture = true;
//        }
        // Check which direction we were previously moving
        if (currentlyInAMoveToRight) {
             // We were lately mostly moving to the right
            // Check if we can say that we have now started moving left
            if (xAtThisIndex < extremePositionThatThisMovementHasReached - REVERSE_THRESHOLD) {
                // We have changed direction, now starting a move period to the left
                currentlyInAMoveToRight = false;
                qtyReverse++;
                isThereAReverseCausedByThisCapture = true;
                // we now consider that position as the extreme that we have travelled in that new direction up to now
                extremePositionThatThisMovementHasReached = xAtThisIndex;
            } else {
                // We consider that we are still mostly moving to the right
                // Check if we are even farter then the previous extrem right position reached during that move
                if (xAtThisIndex > extremePositionThatThisMovementHasReached) {
                    // we are even farter than the last max, so we now consider this position as the extrem
                    extremePositionThatThisMovementHasReached = xAtThisIndex;
                }
            }
        } else {
            // We were lately mostly moving to the left
            // Check if we can say that we have now started moving right
            if (xAtThisIndex > extremePositionThatThisMovementHasReached + REVERSE_THRESHOLD) {
                // We have changed direction, now starting a move period to the right
                currentlyInAMoveToRight = true;
                qtyReverse++;
                isThereAReverseCausedByThisCapture = true;
                // we now consider that position as the extreme that we have travelled in that new direction up to now
                extremePositionThatThisMovementHasReached = xAtThisIndex;
            } else {
                // We consider that we are still mostly moving to the left
                // Check if we are even farter then the previous extrem left position reached during that move
                if (xAtThisIndex < extremePositionThatThisMovementHasReached) {
                    // we are even farter than the last min, so we now consider this position as the extrem
                    extremePositionThatThisMovementHasReached = xAtThisIndex;
                }
            }
        }
        last20Captures[index].qtyReverse = qtyReverse;
        last20Captures[index].isThereAReverseCausedByThisCapture = isThereAReverseCausedByThisCapture;
        console.log("   [" + index + "]=" + xAtThisIndex + ", newLength:" + newLength + ", " + "extrem:" + extremePositionThatThisMovementHasReached + ", to right?:" + currentlyInAMoveToRight + ", " + qtyReverse + ", " + isThereAReverseCausedByThisCapture);
        console.log("");
    }
    
    // if thre is at least 3 reverse in the last 20 captures, process them
    if (qtyReverse >= 3) {
        var qtyReverseTemp = 0;
        var qtyCaptureInLast3Reverses = 0;
        var minInLast3Reverses = last20Captures[newLength - 1].x;
        var maxInLast3Reverses = last20Captures[newLength - 1].x;
        for (index = newLength - 1; index >= 0 && qtyReverseTemp < 3; index--) {
            if (last20Captures[index].isThereAReverseCausedByThisCapture) {
                qtyReverseTemp++;
            }
            qtyCaptureInLast3Reverses++;
            somme += last20Captures[index].x;
            
            if (last20Captures[index].x <= minInLast3Reverses) {
                minInLast3Reverses = last20Captures[index].x;
            } else if (last20Captures[index].x >= maxInLast3Reverses) {
                maxInLast3Reverses = last20Captures[index].x;
            }
            console.log("   index:" + index + " qty:" + qtyReverseTemp + ", somme" + somme + ", min:" + minInLast3Reverses + ", max:" + maxInLast3Reverses);
        }
        
        // compute average
        averageLast3Reverses = somme / qtyCaptureInLast3Reverses;
        console.log("  avrg:" + averageLast3Reverses);
        
        // store info in array
        last20Captures[newLength - 1].isThereAnEraseGesture = (qtyReverse >= 3);
        last20Captures[newLength - 1].averageLast3Reverses  = helper_valueIfNotNullElseMinus1(averageLast3Reverses);
        last20Captures[newLength - 1].minInLast3Reverses    = minInLast3Reverses;
        last20Captures[newLength - 1].maxInLast3Reverses    = maxInLast3Reverses;
    }
//    console.log("  last20Captures[" + (newLength - 1) + "]:" + last20Captures[newLength - 1].toSource());
    console.log("  last20Captures[" + (newLength - 1) + "]:" + JSON.stringify(last20Captures[newLength - 1]));
        
}




function getMouseGestureStatus() {
    "use strict";
    var currentLength = last20Captures.length;
    var ret = {
        qtyReverse:            last20Captures[currentLength - 1].qtyReverse,
        isThereAnEraseGesture: last20Captures[currentLength - 1].isThereAnEraseGesture,
        averageLast3Reverses:  last20Captures[currentLength - 1].averageLast3Reverses,
        minInLast3Reverses:    last20Captures[currentLength - 1].minInLast3Reverses,
        maxInLast3Reverses:    last20Captures[currentLength - 1].maxInLast3Reverses
    };
    console.log("  ret:" + JSON.stringify(ret));
    return ret;
}



function autoReschedulingPeriodicGestureAnalysis() {
    "use strict";
    setTimeout(autoReschedulingPeriodicGestureAnalysis, GESTURE_RECOGNITION_PERIOD_MS);
}

$(document).ready(function () {
    "use strict";
    autoReschedulingPeriodicGestureAnalysis();
});
    
