/* gestureRecognition.js */

/*global $, jQuery, alert*/

/*jslint plusplus: true */
/*jslint devel: true */
/*jslint browser: true*/
/*jslint vars:true */

//var GESTURE_RECOGNITION_PERIOD_MS = 50; // ms

var SelfTestActivated = false;
var DEB = false; // is "DEB"ug log enabled? 
var NB_OF_ECHANTILLONS_TO_KEEP = 75; // at a little more than 10ms (+lag) each,
var MIN_RADIUS_FOR_CIRCLE_DETECTION = 25;

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
var currentlyTracingALongEnoughCircleGesture = false;
//last20Captures.prototype.toString() {}

var validateDetectionXonly; // function forward declaration
var validateDetectionXandY; // function forward declaration
var addThisMouseCoordinate; // function  forward declaration
var addThisMouseCoordinates; // function  forward declaration
var getMouseGestureStatus; // function  forward declaration



if (SelfTestActivated) {
var initial_nb_of_ech = NB_OF_ECHANTILLONS_TO_KEEP;
validateDetectionXonly(
    "543hjk345",
    20, // number of echantillons
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
        {x: 1050, qtyR: 2, was3R: true,  av: 1035, min: 925, max: 1100},//                                 .  |
        {x: 1050, qtyR: 2, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 2, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 2, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 1, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 1, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 1, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 0, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 0, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 0, was3R: false, av:   -1, min:  -1, max:   -1},//                                    |
        {x: 1050, qtyR: 0, was3R: false, av:   -1, min:  -1, max:   -1}//                                     |
    ]
);

function validateDetectionXonly(id, nbEchantillons, testVector) {
    "use strict";
    var i;
    var errorWasDetected = false;
    if (DEB) document.writeln("<br> starting test with id: " + id + "<br> ");

    NB_OF_ECHANTILLONS_TO_KEEP = nbEchantillons;

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
    if (DEB) document.writeln("<br> finishing test with  id: " + id + "<br> ");

    // After the validation, flush the last20Captures array
    last20Captures.length = 0;
    //restore the value;
    NB_OF_ECHANTILLONS_TO_KEEP = initial_nb_of_ech;
}

// smallest circle, center not moving   
validateDetectionXandY(
    "543hj34jh35",
    20, // number of echantillons
    [
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},

        {x: 2025, y: 2025, enoughCirclesDetected: false},
        {x: 2000, y: 2050, enoughCirclesDetected: false},
        {x: 1975, y: 2025, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2025, y: 2025, enoughCirclesDetected: false},
        {x: 2000, y: 2050, enoughCirclesDetected: false},
        {x: 1975, y: 2025, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: true},
        {x: 2000, y: 2000, enoughCirclesDetected: true},
        {x: 2000, y: 2000, enoughCirclesDetected: true},
        {x: 2000, y: 2000, enoughCirclesDetected: true},
        {x: 2000, y: 2000, enoughCirclesDetected: true},
        {x: 2000, y: 2000, enoughCirclesDetected: true},
        {x: 2000, y: 2000, enoughCirclesDetected: true},
        {x: 2000, y: 2000, enoughCirclesDetected: false}
    ]
);

// smallest circle, center moving to the right
validateDetectionXandY(
    "543hj34jh36",
    20, // number of echantillons
    [
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},
        {x: 2000, y: 2000, enoughCirclesDetected: false},

        {x: 2125, y: 2025, enoughCirclesDetected: false},
        {x: 2100, y: 2050, enoughCirclesDetected: false},
        {x: 2075, y: 2025, enoughCirclesDetected: false},
        {x: 2100, y: 2000, enoughCirclesDetected: false, debugBreak:true},
        {x: 2225, y: 2025, enoughCirclesDetected: false},
        {x: 2200, y: 2050, enoughCirclesDetected: false},
        {x: 2175, y: 2025, enoughCirclesDetected: false},
        {x: 2200, y: 2000, enoughCirclesDetected: true, debugBreak:true},
        {x: 2200, y: 2000, enoughCirclesDetected: true},
        {x: 2200, y: 2000, enoughCirclesDetected: true},
        {x: 2200, y: 2000, enoughCirclesDetected: true},
        {x: 2200, y: 2000, enoughCirclesDetected: true},
        {x: 2200, y: 2000, enoughCirclesDetected: true},
        {x: 2200, y: 2000, enoughCirclesDetected: true},
        {x: 2200, y: 2000, enoughCirclesDetected: false}
    ]
);

    
    
// bug check
validateDetectionXandY(
    "543hj34jh37",
    20, // number of echantillons
    [
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2000, y: 2005, enoughCirclesDetected: false},
        {x: 2010, y: 2004, enoughCirclesDetected: false},
        {x: 2020, y: 2006, enoughCirclesDetected: false},
        {x: 2030, y: 2004, enoughCirclesDetected: false},
        {x: 2040, y: 2006, enoughCirclesDetected: false},
        {x: 2050, y: 2004, enoughCirclesDetected: false},
        {x: 2060, y: 2006, enoughCirclesDetected: false},
        {x: 2070, y: 2004, enoughCirclesDetected: false},
        {x: 2080, y: 2006, enoughCirclesDetected: false},
        {x: 2090, y: 2004, enoughCirclesDetected: false},
        {x: 2100, y: 2006, enoughCirclesDetected: false},
        {x: 2110, y: 2004, enoughCirclesDetected: false},
        {x: 2120, y: 2006, enoughCirclesDetected: false},
        {x: 2130, y: 2004, enoughCirclesDetected: false}
    ]
);
    
function validateDetectionXandY(id, nbEchantillons, testVector) {
    "use strict";
    var i;
    var errorWasDetected = false;
    if (DEB) document.writeln("<br> starting test with id: " + id + "<br> ");

    NB_OF_ECHANTILLONS_TO_KEEP = nbEchantillons;

    for (i = 0; i < testVector.length; i++) {
        addThisMouseCoordinates(testVector[i].x, testVector[i].y, testVector[i].debugBreak);
        var isThereAnEraseGesture = getMouseCircleGestureStatus();
        if (isThereAnEraseGesture !== testVector[i].enoughCirclesDetected) {
            document.writeln("<br>ERROR i5465. for element #" + i + ", expected value was:   " + testVector[i].enoughCirclesDetected + ", but received " + isThereAnEraseGesture + " instead.");
            errorWasDetected = true;
        }
    }
    if (DEB) document.writeln("<br> finishing test with  id: " + id + "<br> ");

    // After the validation, flush the last20Captures array
    last20Captures.length = 0;
    //restore the value;
    NB_OF_ECHANTILLONS_TO_KEEP = initial_nb_of_ech;
}
    

}

SelfTestActivated = false;

function helper_valueIfNotNullElseMinus1(x) {
    "use strict";
    if (x !== null) {
        return x;
    } else {
        return -1;
    }
}

function addThisMouseCoordinates(x, y, debugBreak) {
    "use strict";
    if (DEB) console.log("x=" + x + ", y=" + y);
    // handle only when when mouse is inside the window
    if ((x >= 0) && (x >= 0)) {
        // add coordinates to buffer
        addCoordinatesToBuffer(x, y, debugBreak);
        // flush buffer if not moving anymore
        flushBufferIfNotMoving();
        // compute how many clockwise circles in buffer
        findIfThereWereRecentlyEnoughClockwiseTurns();
     } else {
        // When mouse is ouside the window, empty buffer
        last20Captures.length = 0;
    }
}

function addCoordinatesToBuffer(x, y, debugBreak) {
    // handle when buffer is already full
    if (DEB) console.log(">>>>>add>> x:" + x + "y:" + y);
    var currentLength = last20Captures.length;
    if (currentLength === NB_OF_ECHANTILLONS_TO_KEEP) {
        // drop oldest value
        last20Captures.shift();
    }
    last20Captures.push({x: x, y: y, debugBreak:debugBreak});
}

function flushBufferIfNotMoving() {
    var currentLength = last20Captures.length;
    var NUMBER_OF_SAMPLE_IN_WHICH_TO_LOOK_FOR_MOVE = 8
    // check if currently moving
    if (currentLength >= NUMBER_OF_SAMPLE_IN_WHICH_TO_LOOK_FOR_MOVE) {
        var sampleStartIndex = currentLength - NUMBER_OF_SAMPLE_IN_WHICH_TO_LOOK_FOR_MOVE;
        var sampleEndIndex = currentLength - 1;
        var lastSample = last20Captures[sampleEndIndex];
        var moveFoundInLastSamples = false;
        for (var sampleIndex = sampleStartIndex; sampleIndex < sampleEndIndex ; sampleIndex++) {
            moveFoundInLastSamples = moveFoundInLastSamples || (
                (last20Captures[sampleIndex].x > (lastSample.x + 2)) ||
                (last20Captures[sampleIndex].x < (lastSample.x - 2)) ||
                (last20Captures[sampleIndex].y > (lastSample.y + 2)) ||
                (last20Captures[sampleIndex].y < (lastSample.y - 2))
            );
        }

        if (!moveFoundInLastSamples) {
            // flush buffer because no recent move
            last20Captures.length = 0;
        }
    }
}

function findIfThereWereRecentlyEnoughClockwiseTurns() {
//    var thereWereEnoughTurns = false;
    var newLength = last20Captures.length;
    var maxFound = 0;
    // use every coordinate as a starting point to find enough turns
    for (var i = 0; i < newLength; i++) {
        var xiyi = {xi:last20Captures[i].x, yi:last20Captures[i].y};
        // try from each corner of the circle
        for (var startCondition = 0; startCondition < 4; startCondition ++) {
            // compute the estimated circle center for this starting condition (condition 0 means we start from the top of the circle)
            var xcyc = computeCenterIfStartingWithCondition(startCondition, xiyi);
            var conditionReached = 0;
            var values=">>>>";
            // scan the remaining coordinates to find if they form 2 complete circles with the minimum radius
            for (var j = i; j < newLength; j++) {
                var xjyj = {xj:last20Captures[j].x, yj:last20Captures[j].y};
                values +=  " [[when c:" + conditionReached + ", xc:" + xcyc.xc + ", yc:" + xcyc.yc + ",  xj:" + xjyj.xj + ", yj:" + xjyj.yj;
                // for this condition, compute sign-corrected delta primary direction ans sign-corrected delta secondary direction
                var signCorrectedDeltas = computeSignCorrectedDeltas(startCondition + conditionReached, xcyc, xjyj);
                
                // In secondary direction, check if going further backward
                if (signCorrectedDeltas.inSecondaryDirection < -MIN_RADIUS_FOR_CIRCLE_DETECTION) {
                    // we can take advantage of this -> Change the center
                    xcyc = setNewCenterInSecondaryDirectionLagging(startCondition + conditionReached, xcyc, xjyj);
                    values += " then ((sec< )) and <<new xc:>> " + xcyc.xc + ", yc:" + xcyc.yc;
                }
                
                // In primary direction, check if going further backward
                if (signCorrectedDeltas.inPrimaryDirection < -MIN_RADIUS_FOR_CIRCLE_DETECTION) {
                    // we can take advantage of this -> Change the center
                    xcyc = setNewCenterInPrimaryDirectionLagging(startCondition + conditionReached, xcyc, xjyj);
                    values += " then \\prim< // and <<new xc:>> " + xcyc.xc + ", yc:" + xcyc.yc;
                }
                
                // In primary direction, check if going enough forward to detect that the condition is reached
                if ((signCorrectedDeltas.inPrimaryDirection >= MIN_RADIUS_FOR_CIRCLE_DETECTION) &&
                    // and that we are still in the proper quadrant
                    (signCorrectedDeltas.inSecondaryDirection <= 0)) {
                    // we modify the center in the primary direction
                    xcyc = setNewCenterInPrimaryDirection(startCondition + conditionReached, xcyc, xjyj);
                    // we increment the count of conditions reached
                    conditionReached++;
                    values += " then ==prim> == and <<new xc:>> " + xcyc.xc + ", yc:" + xcyc.yc + ", QQ new c: QQ"  + conditionReached;
                }
//                if (checkIfCoordinateAdvanceStep(xcyc, xjyj, startCondition + conditionReached)) {
//                    conditionReached++;
//                }
//                values += "xj:" + xjyj.xj + ", yj:" + xjyj.yj + ", xc:" + xcyc.xc + ", yc:" + xcyc.yc + ", c:" + conditionReached + "--";
                values += "]] ";
            }
            
            if (DEB) console.log(values);
            
            if (conditionReached > maxFound) {
                maxFound = conditionReached;
            }
        }
    }
    if (DEB) console.log("max steps found:" + maxFound);
    
    currentlyTracingALongEnoughCircleGesture = false;
    // check if 8 quarter turns were found
    if (maxFound >= 8) {
////        thereWereEnoughTurns = true;
////    }
//        // check if still currently tracing the gesture (for last 8 samples)
//        var sampleStartIndex = newLength - 8;
//        var sampleEndIndex = newLength;
//        var lastSample = last20Captures[newLength - 1];
//        var moveFoundInLastSamples = false;
//        for (var sampleIndex = sampleStartIndex; sampleIndex < sampleEndIndex ; sampleIndex++) {
//            moveFoundInLastSamples = moveFoundInLastSamples || (
//                (last20Captures[sampleIndex].x > (lastSample.x + 2)) ||
//                (last20Captures[sampleIndex].x < (lastSample.x - 2)) ||
//                (last20Captures[sampleIndex].y > (lastSample.y + 2)) ||
//                (last20Captures[sampleIndex].y < (lastSample.y - 2))
//            );
//        }
//        
//        if (moveFoundInLastSamples) {
            currentlyTracingALongEnoughCircleGesture = true;
//        }

    }
}

// conditionIndex of 0 means that xiyi is the top of the circle
function computeCenterIfStartingWithCondition(conditionIndex, xiyi) {
    var retXcYc;
    switch (conditionIndex % 4) {
        case 0:
            retXcYc = {xc:(xiyi.xi                                  ), yc:(xiyi.yi + MIN_RADIUS_FOR_CIRCLE_DETECTION)};
            break;
        case 1:
            retXcYc = {xc:(xiyi.xi - MIN_RADIUS_FOR_CIRCLE_DETECTION), yc:(xiyi.yi                                  )};
            break;
        case 2:
            retXcYc = {xc:(xiyi.xi                                  ), yc:(xiyi.yi - MIN_RADIUS_FOR_CIRCLE_DETECTION)};
            break;
        case 3:
            retXcYc = {xc:(xiyi.xi + MIN_RADIUS_FOR_CIRCLE_DETECTION), yc:(xiyi.yi                                  )};
            break;
        default:
            console.log ("ERROR jj654j34j5j354jk");
            break;
    }
    return retXcYc;
}

function setNewCenterInPrimaryDirection(conditionIndex, previous_xcyc, xjyj) {
    var retXcYc;
    switch (conditionIndex % 4) {
        case 0: // prim=right, sec=down
            retXcYc = {xc:(xjyj.xj - MIN_RADIUS_FOR_CIRCLE_DETECTION), yc:(previous_xcyc.yc)                         };
            break;
        case 1: // prim=down, sec=left
            retXcYc = {xc:(previous_xcyc.xc)                         , yc:(xjyj.yj - MIN_RADIUS_FOR_CIRCLE_DETECTION)};
            break;
        case 2:
            retXcYc = {xc:(xjyj.xj + MIN_RADIUS_FOR_CIRCLE_DETECTION), yc:(previous_xcyc.yc)                         };
            break;
        case 3:
            retXcYc = {xc:(previous_xcyc.xc)                         , yc:(xjyj.yj + MIN_RADIUS_FOR_CIRCLE_DETECTION)};
            break;
        default:
            console.log ("ERROR jj654j34j5j354jl");
            break;
    }
    return retXcYc;    
}
function setNewCenterInPrimaryDirectionLagging(conditionIndex, previous_xcyc, xjyj) {
    var retXcYc;
    switch (conditionIndex % 4) {
        case 0: // prim=right, sec=down
            retXcYc = {xc:(xjyj.xj + MIN_RADIUS_FOR_CIRCLE_DETECTION), yc:(previous_xcyc.yc)                         };
            break;
        case 1: // prim=down, sec=left
            retXcYc = {xc:(previous_xcyc.xc)                         , yc:(xjyj.yj + MIN_RADIUS_FOR_CIRCLE_DETECTION)};
            break;
        case 2:
            retXcYc = {xc:(xjyj.xj - MIN_RADIUS_FOR_CIRCLE_DETECTION), yc:(previous_xcyc.yc)                         };
            break;
        case 3:
            retXcYc = {xc:(previous_xcyc.xc)                         , yc:(xjyj.yj - MIN_RADIUS_FOR_CIRCLE_DETECTION)};
            break;
        default:
            console.log ("ERROR jj654j34j5j354jm");
            break;
    }
    return retXcYc;    
}
function setNewCenterInSecondaryDirectionLagging(conditionIndex, previous_xcyc, xjyj) {
    var retXcYc;
    switch (conditionIndex % 4) {
        case 0: // prim=right, sec=down
            retXcYc = {xc:(previous_xcyc.xc)                        , yc:(xjyj.yj + MIN_RADIUS_FOR_CIRCLE_DETECTION)};
            break;
        case 1: // prim=down, sec=left
            retXcYc = {xc:(xjyj.xj - MIN_RADIUS_FOR_CIRCLE_DETECTION), yc:(previous_xcyc.yc)                        };
            break;
        case 2:
            retXcYc = {xc:(previous_xcyc.xc)                         , yc:(xjyj.yj - MIN_RADIUS_FOR_CIRCLE_DETECTION)};
            break;
        case 3:
            retXcYc = {xc:(xjyj.xj + MIN_RADIUS_FOR_CIRCLE_DETECTION), yc:(previous_xcyc.yc)                         };
            break;
        default:
            console.log ("ERROR jj654j34j5j354jn");
            break;
    }
    return retXcYc;    
}

function computeSignCorrectedDeltas(conditionIndex, xcyc, xjyj) {
    var retSignCorrectedDeltas = {inPrimaryDirection : 0, inSecondaryDirection : 0};
    var nonCorectedDeltaX = xjyj.xj - xcyc.xc;
    var nonCorectedDeltaY = xjyj.yj - xcyc.yc;
    switch (conditionIndex % 4) {
        case 0: // going to right: delta primary is positive if going to right. delta secondary is positive if going down 
            retSignCorrectedDeltas.inPrimaryDirection   =  nonCorectedDeltaX;
            retSignCorrectedDeltas.inSecondaryDirection =  nonCorectedDeltaY;
            break;
        case 1: // going down: delta primary is positive if going down. delta secondary is positive if going to left
            retSignCorrectedDeltas.inPrimaryDirection   =  nonCorectedDeltaY;
            retSignCorrectedDeltas.inSecondaryDirection = -nonCorectedDeltaX;
            break;
        case 2: // going to left: delta primary is positive if going to left. delta secondary is positive if going up
            retSignCorrectedDeltas.inPrimaryDirection   = -nonCorectedDeltaX;
            retSignCorrectedDeltas.inSecondaryDirection = -nonCorectedDeltaY;
            break;
        case 3: // going up: delta primary is positive if going up. delta secondary is positive if going to right
            retSignCorrectedDeltas.inPrimaryDirection   = -nonCorectedDeltaY;
            retSignCorrectedDeltas.inSecondaryDirection =  nonCorectedDeltaX;
            break;
        default:
            console.log ("ERROR 654hjk35jk3h6");
            break;
    }
    return retSignCorrectedDeltas;
}

function getMouseCircleGestureStatus() {
    "use strict";
    return currentlyTracingALongEnoughCircleGesture;
}


//// check for this condition if the trigger is reached.
////     for condition 0, it means that we try to detect that we are past below the "center"
//function checkIfCoordinateAdvanceStep(xcyc, xjyj, conditionIndex) {
//    var conditionWasMet = false;
//    switch (conditionIndex % 4) {
//        case 0:
//            conditionWasMet = (xjyj.xj >= (xcyc.xc + MIN_RADIUS_FOR_CIRCLE_DETECTION));
//            break;
//        case 1:
//            conditionWasMet = (xjyj.yj >= (xcyc.yc + MIN_RADIUS_FOR_CIRCLE_DETECTION));
//            break;
//        case 2:
//            conditionWasMet = (xjyj.xj <= (xcyc.xc - MIN_RADIUS_FOR_CIRCLE_DETECTION));
//            break;
//        case 3:
//            conditionWasMet = (xjyj.yj <= (xcyc.yc - MIN_RADIUS_FOR_CIRCLE_DETECTION));
//            break;
//        default:
//            console.log ("ERROR 654hjk35jk3h6");
//            break;
//    }
//    return conditionWasMet;
//}

////////////////////////////////////////////////////////////////////////////////////////////
////   X only   ////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

function addThisMouseCoordinate(x) {
    "use strict";
    // handle only when when mouse is inside the window
    if (x >= 0) {
        
        var tetete = x / 10;
        var tetetestring = "";
        for (var iiii = 0; iiii < tetete; iiii++) {
            tetetestring = tetetestring.concat(" ");
        }
        tetetestring = tetetestring.concat(".");
        console.log(tetetestring);
        
        // handle when buffer is already full
        var currentLength = last20Captures.length;
        if (currentLength === NB_OF_ECHANTILLONS_TO_KEEP) {
            // drop oldest value
            last20Captures.shift();
        }

        last20Captures.push({
            x: x,
            isThereAnEraseGesture: false,
            isTheMouseStillMoving: false,
            averageLast3Reverses: -1, // average Last 3 Reverses
            minInLast3Reverses: -1,
            maxInLast3Reverses: -1
        });
        var newLength = last20Captures.length;
    //    last20Captures[newLength - 1].x = x;
        if (DEB) console.log(">>>>>add>> x:" + x);
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
            if (DEB) console.log("   [" + index + "]=" + xAtThisIndex + ", newLength:" + newLength + ", " + "extrem:" + extremePositionThatThisMovementHasReached + ", to right?:" + currentlyInAMoveToRight + ", " + qtyReverse + ", " + isThereAReverseCausedByThisCapture);
            if (DEB) console.log("");
        }

        // if there is at least 3 reverse in the last 20 captures, process them
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
                if (DEB) console.log("   index:" + index + " qty:" + qtyReverseTemp + ", somme" + somme + ", min:" + minInLast3Reverses + ", max:" + maxInLast3Reverses);
            }
            console.log(" qty:" + qtyReverseTemp + ", somme" + somme + ", min:" + minInLast3Reverses + ", max:" + maxInLast3Reverses);

            // compute average
            averageLast3Reverses = somme / qtyCaptureInLast3Reverses;
            if (DEB) console.log("  avrg:" + averageLast3Reverses);

            // store info in array
            last20Captures[newLength - 1].isThereAnEraseGesture = (qtyReverse >= 3);
            last20Captures[newLength - 1].averageLast3Reverses  = helper_valueIfNotNullElseMinus1(averageLast3Reverses);
            last20Captures[newLength - 1].minInLast3Reverses    = minInLast3Reverses;
            last20Captures[newLength - 1].maxInLast3Reverses    = maxInLast3Reverses;
            
            // indicate if the mouse is still moving or if it has stayed at the same place for last 200ms
            if ((last20Captures[newLength - 1].x !== last20Captures[newLength - 2].x) && (last20Captures[newLength - 1].x !== last20Captures[newLength - 3].x)) {
                last20Captures[newLength - 1].isTheMouseStillMoving = true;
            }
        }
        //    if (DEB) console.log("  last20Captures[" + (newLength - 1) + "]:" + last20Captures[newLength - 1].toSource());
        if (DEB) console.log("  last20Captures[" + (newLength - 1) + "]:" + JSON.stringify(last20Captures[newLength - 1]));
    } else {
        // When mouse is ouside the window, remove oldest coordinate
        last20Captures.shift();
    }
        
}




function getMouseGestureStatus() {
    "use strict";
    var currentLength = last20Captures.length;
    if (currentLength > 0) {
        var ret = {
            qtyReverse:            last20Captures[currentLength - 1].qtyReverse,
            isThereAnEraseGesture: last20Captures[currentLength - 1].isThereAnEraseGesture,
            isTheMouseStillMoving: last20Captures[currentLength - 1].isTheMouseStillMoving,
            averageLast3Reverses:  last20Captures[currentLength - 1].averageLast3Reverses,
            minInLast3Reverses:    last20Captures[currentLength - 1].minInLast3Reverses,
            maxInLast3Reverses:    last20Captures[currentLength - 1].maxInLast3Reverses
        };
    } else {
        var ret = {
            qtyReverse:            0,
            isThereAnEraseGesture: false,
            isTheMouseStillMoving: false,
            averageLast3Reverses:  -1,
            minInLast3Reverses:    -1,
            maxInLast3Reverses:    -1
        };        
    }
    if (DEB) console.log("  ret:" + JSON.stringify(ret));
    return ret;
}



//function autoReschedulingPeriodicGestureAnalysis() {
//    "use strict";
//    //setTimeout(autoReschedulingPeriodicGestureAnalysis, GESTURE_RECOGNITION_PERIOD_MS);
//}

$(document).ready(function () {
    "use strict";
    //autoReschedulingPeriodicGestureAnalysis();
});
    
