"use strict";
if(0) console.log("0   " + getTimeNow() + "ms");
//console.log("Injection of content_script_periodic.js - started");
// This script is injected in all pages.

var ROOT_PERIOD_MS = 200;
var ROOT_BACKGROUND_COLOR_LAST_CHILD = "rgba(185, 220, 200, 0.9)";
var currentRootColorForReadElements ; //= ROOT_BACKGROUND_COLOR_LAST_CHILD;
var currentRootGreyModeForReadElements ; //= 'Background Single Solid Color';
var currentRootSelectionModeId;
var currentRootNbWordMatchId;
var ROOTconfig = get_ROOT_options();

//var ROOT_HIGHLIGHT = "10px solid rgba(211, 255, 230,0.2)";
//var REVERT_HIGHLIGHT = "revert";
//var TEMP_RED_SQUARE = "1px dashed red";
//var TEMP_RED_SQUARE_BOX = {
//    "box-sizing": "border-box",
//    "border": "1px 0px 1px 0px dashed red"
//    };

//var TEMP_RED_SQUARE_BOX = {
//    "background-color": "rgba(0, 255, 0, 0.3)"
//    };
//var TEMP_RED_SQUARE_BOX = {
//    "border-style": "solid",
//    "border-color": "red",
////    "border-top-width": "1px",
////    "border-bottom-width": "1px",
//    "border-left-width": "5px",
//    "border-right-width": "5px"
//    };




//var MIN_SIZE_FOR_MATCH = 8;
//var JUMPS_WHEN_FAST_FINDING = Math.floor(MIN_SIZE_FOR_MATCH / 2);
//var storageLength = -1;

var MIN_PERCENT_ZONE_COVERED_TO_BE_CONSIDERED_AS_READ = 60;


var maxX  = -1;
var maxY  = -1;
var currX = -1;
var currY = -1;
var previousCurrX = -1;
var previousCurrY = -1;
var currWinPosX = -1;
var currWinPosY = -1;
var previousCurrWinPosX = -1;
var previousCurrWinPosY = -1;


function getTimeNow() {
    return  (new Date()).getTime() % 65536;

}


function removeDotDotDots(textIn) {
    var temp1 = textIn;
    var temp2 = temp1.replace(/\.{3,}/, "");
    while (temp2.length < temp1.length) {
        temp1 = temp2;
        // execute this block if still able to remove dots 
        temp2 = temp1.replace(/\.{3,}/, "");
    };
    return temp2;
}


// check that there is enough text in this element or in its children.
function isThereEnoughValidTextInThisElement(el) {
    var areBasicSentenceCriteriaMet = false;
    var elHasText = el.innerText != null;
    if (elHasText) {
        var positionOfLongAlphabeticStringInTree = el.innerText.search(/[A-Z]{2,}/i);
        var thereIsUsefulTextInThisTree = positionOfLongAlphabeticStringInTree >= 0;
        var spacesArray = el.innerText.match(/\s+/g);

        if (spacesArray != null) {
            var nbWords = spacesArray.length + 1;
            areBasicSentenceCriteriaMet = thereIsUsefulTextInThisTree && nbWords > currentRootNbWordMatchId;
        }
    }
    return areBasicSentenceCriteriaMet;
}

// check that there is text directly in this element.
function isThereValidTextDirectlyInThisElement(el) {
    var thereIsUsefulTextDirectly = false;
    var iiii;
    for (iiii = 0; iiii < el.childNodes.length; iiii++) {
        if ((el.childNodes[iiii].nodeName === "#text") && (el.childNodes[iiii].wholeText.search(/[A-Z]{2,}/i) >= 0)) {
            thereIsUsefulTextDirectly = true;
        }
    }
    return thereIsUsefulTextDirectly;
}


function parseAllPageAndGrey() {
    
    ROOTconfig = get_ROOT_options();
    if (ROOTconfig != null) {
        if(0) console.log("Config color is currently : " + ROOTconfig.RootColor);
        currentRootColorForReadElements = ROOTconfig.RootColor;     
        currentRootGreyModeForReadElements = ROOTconfig.RootGreyMode;
        currentRootSelectionModeId = ROOTconfig.RootSelectionMode;
        currentRootNbWordMatchId = ROOTconfig.RootNbWordMatch;
    } else {
        if(1) console.log("Config color is currently undefined (not got yet from the storage) ");
    }
    
      // parse all elements and grey them if they are found in storage
    var i;
    
     // get storage text
    var  allTextFromStorage = getAllTextFromStorage();
//    var qty = howManyPagesAreCurrentlyOpenedOnThisSite();
//    if(0) console.log(" 2  " + getTimeNow() + "ms, nb pages opened=" + qty + ", local storage size=" + allTextFromStorage.length);

    // start at top, and parse until the end
    var element_body = $("body")[0];
    var element_i = element_body.children[0];

    while (element_i) {
        
        var next_element = null;
        var text_element_i = element_i.innerText;
        var afterThisElement_stopGoingDown = false;
        
        // first reset style for this el
        resetElementStyle(element_i);
            
        if (text_element_i != null) {
            
            // check that there is text in this element or in its children.
            var areBasicSentenceCriteriaMet = isThereEnoughValidTextInThisElement(element_i);

            // If the basic sentence criterias are met
            if (areBasicSentenceCriteriaMet) {
                
                // remove "..." when checking for match
                text_element_i = removeDotDotDots(text_element_i);
                 
                // check if the text of this element is not empty and found in the Storage
                var isTreeAllFound = ((text_element_i.length > 0) && (allTextFromStorage != null) && (allTextFromStorage.indexOf(text_element_i) >= 0));
                // if all text inside this node (includes all children tree) was found in storage
                if (isTreeAllFound) {
                    // check that there is long enough text directly in this element
                    var thereIsUsefulTextDirectly = isThereValidTextDirectlyInThisElement(element_i);
                    // last child if there is no child or if there is 0 child
                    var lastChild = (element_i && (!element_i.children || (element_i.children.length === 0)));
                    // if found and there are long enough text directly at this level, put it in grey
                    if(thereIsUsefulTextDirectly || lastChild) {
                        setElementWithRootStyleUsefulTextDirectly(element_i, ROOTconfig);
// is this true?                        // we do not need to parse children, so try to go to next sibbling
//                        afterThisElement_stopGoingDown = true;
                    } else {
                        setElementWithRootStyleUsefulNoTextDirectly(element_i);
                    }
                }
            }
            
            // get the next element to analyze
            while (next_element == null ) {
                if (afterThisElement_stopGoingDown) {
                    // try to go to next at the same level
                    if (element_i.nextElementSibling != null) {
                        // found at same level
                        next_element = element_i.nextElementSibling;
                    } else {
                        // need to go up
                        element_i = element_i.parentElement;
                     }
                } else {
                    // try to go down
                    if (element_i.firstElementChild != null) {
                        // go down
                        next_element = element_i.firstElementChild;
                    } else {
                        // try to go to next at the same level
                        if (element_i.nextElementSibling != null) {
                            // found at same level
                            next_element = element_i.nextElementSibling;
                        } else {
                            // need to go up
                            element_i = element_i.parentElement;
                            afterThisElement_stopGoingDown = true;
                        }
                    }
                } // end else
                // if at body level, prepare to exit all
                if (element_i == element_body) {
                    // came back at body level, so exit all
                    next_element = element_body;
                    element_i = null;
                }
            } // end while
            // if not preparing to exit, prepare for going back to while check
            if (element_i != null) {
                // normal situation
                element_i = next_element;
            }
        } // end if
        if(0) console.log(">>>[" + i + "] = " + element_i + ":" + text_element_i + "<<<");
    } // end while
}

function isThisElementASurfaceWithANonZeroArea(el) {
    var isIt = false;
    var pos = getPosInfo(el);
    // if there is a zone in this element
    if (pos.right > 0 && pos.bottom > 0) {
        var el_width           = pos.right  - pos.left;
        var el_height          = pos.bottom - pos.top;
        var el_surface         = el_width * el_height;
        if (el_surface > 0) {
            isIt = true;
        }
    }
    return isIt;
}




function isThisElementConsideredAsInReadZone(el) {
    var isIt = false;
   
    // The check to mark is configurable
    if (ROOTconfig && ROOTconfig.RootSelectionMode) {
        if (ROOTconfig.RootSelectionMode.indexOf("Every Element Completely At Left And Above The Current Mouse Position In The whole Document") >= 0) {
            isIt = isMostOfThisElementLeftAndAboveCurrentMousePosition(el);
        } else {
            if(1) console.log("ERROR 543522, should never get here, because this function is useful only when in this making mode")
        }
    }
    return isIt;
}

function isElementBeingShiftedOut(el) {
    var isIt = false;
    var pos = getPosInfo(el);
    if(0) console.log("element bottom:" + pos.bottom + "window page y offset:" + currWinPosY + "mouse y:" + currY);
    var elIsSplitByTopOfWindow = pos.top < currWinPosY && pos.bottom > currWinPosY;
    var elBottomIsNearTheTop = pos.bottom < currWinPosY + 150;
    var userIsScrollingDown = currWinPosY > previousCurrWinPosY;
//    if (userIsScrollingDown) {
//        console.log("scolling down");
//    }
//    if ((pos.bottom < currWinPosY + 75) && (pos.bottom >= currWinPosY) && userIsScrollingDown) {
    if ( elIsSplitByTopOfWindow && elBottomIsNearTheTop && userIsScrollingDown) {
        isIt = true;
    }
    return isIt;
}

function isCursorVerticallyInsideThisElementArea(el) {
    var pos = getPosInfo(el);
    var isIt = (pos.left <= currX) && (pos.right >= currX); 
    return isIt;
}


function isMostOfThisElementLeftAndAboveCurrentMousePosition(el) {
    var isIt = false;
//            var elWidth = el.clientWidth;
//            var elHeight = el.clientHeight;
    var pos = getPosInfo(el);
     //      some sanity check // previously is there is a zone in this element
    if (pos.right >= 0 && pos.bottom >= 0) {
        var el_width           = pos.right  - pos.left;
        var el_height          = pos.bottom - pos.top;
        var limX               = (currX < pos.right) ? currX : pos.right;
        var el_covered_x       = limX - pos.left;
            el_covered_x       = (el_covered_x > 0) ? el_covered_x : 0;
        var limY               = (currY < pos.bottom) ? currY : pos.bottom;
        var el_covered_y       = limY - pos.top;
            el_covered_y       = (el_covered_y > 0) ? el_covered_y : 0;
        var el_surface         = el_width * el_height;
        var el_covered_surface = el_covered_x * el_covered_y;
            el_covered_surface = (el_covered_surface > 0) ? el_covered_surface : 0;
        // if there is enough of that zone covered
        if (el_covered_surface >= MIN_PERCENT_ZONE_COVERED_TO_BE_CONSIDERED_AS_READ/100 * el_surface) {
            isIt = true;
        }
    }
    return isIt;
}


//// parse all elements and put a border around them if they are marked as read
//function checkIfThisElementAndItsChildrenAreInReadZoneAndDisplayIt(el) {
//    
//    var retAllInReadZone = true;
//    
//    // check if there are children
//    var firstChild = el.firstElementChild;
//    if (firstChild != null) {
//        // Case there are children
//        // Check if all children in read zone (start with first child)
//        if (checkIfThisElementAndItsChildrenAreInReadZoneAndDisplayIt(firstChild)) {
//            // Case all children are in read zone
//            // Check if this element is also in read zone
//            var thisElIsRead = isMostOfThisElementInReadZone(el);
//            if (thisElIsRead) {
//                // Case this element and all its children are in read zone
//                // check if this element has a surface (non-zero area)
//                if (isThisElementASurfaceWithANonZeroArea(el)) {
//                    // Display it as read
//                    displayAsInReadZone(el);
//                }
//            } else {// else
//                // Case this element in not in read zone
//                // Return "this element is not in read zone"
//                retAllInReadZone = false;
//            }
//        } else { // else of "Check if all children in read zone"
//            // Case not all children are in read zone
//            // Return "this element is not in read zone"
//            retAllInReadZone = false;
//        } // "Check if all children in read zone"
//    } else { // else of "check if there are children"
//        // Case there are not children
//        // Check if most of this element is in the read zone
//        var thisElIsRead = isMostOfThisElementInReadZone(el);
//        if (thisElIsRead) {
//            // Case most of this element is in the read zone
//            // check if this element has a surface (non-zero area)
//            if (isThisElementASurfaceWithANonZeroArea(el)) {
//                // Display it as read
//                displayAsInReadZone(el);
//            }
//        } else {
//            // Case not enough of this element is in the read zone
//            // Return "this element is not in read zone"
//            retAllInReadZone = false;
//        }
//    } // "check if there are children"
//    
//    
//    // if there is a next sibling, process it
//    var nextSiblingToThisEl = el.nextElementSibling;
//    if (nextSiblingToThisEl) {
//        var allSiblingAreInReadZone = checkIfThisElementAndItsChildrenAreInReadZoneAndDisplayIt (nextSiblingToThisEl);
//        if (! allSiblingAreInReadZone) {
//            // Case not all siblings at this level are in the read zone
//            // Return "not all element are not in read zone"
//            retAllInReadZone = false;
//        }
//    }
//    
//    // at this point, all children are analyzed, and all next siblings are analyzed.
//    return retAllInReadZone;
//}
//

function checkThisElementAndItsChildren_AndIfItIsAreInCurrentReadZoneAndSaveIt(el, currText) {
    var retAllInReadZone = {
        isThisElInCurrentReadZone: true,
        newText: currText
    };
    
    // check if there are children
    var firstChild = el.firstElementChild;
    if (firstChild != null) {
        // Case there are children
        // Check if all children in read zone (start with first child)
        var ret001 = checkThisElementAndItsChildren_AndIfItIsAreInCurrentReadZoneAndSaveIt(firstChild, retAllInReadZone.newText);
        retAllInReadZone.newText = ret001.newText;
        if (ret001.isThisElInCurrentReadZone) {
            // Case all children are in read zone
            // Check if this element is also in read zone
            var thisElIsRead = isThisElementConsideredAsInReadZone(el);
            if (thisElIsRead) {
                // Case this element and all its children are in read zone
                // check if this element has a surface (non-zero area)
                if (isThisElementASurfaceWithANonZeroArea(el)) {
                    // Case nonZeroArea
                    // Check if there is innerText
                    var inText = el.innerText;
                    if (inText != null) {
                        // case there is inner text
                        // check if there is useful characters to save
                        var enoughChars = (inText.search(/[A-Z]{2,}/i) >= 0);
                        if (enoughChars === true) {
                            // Case there are enough chars, we need to store the text
                            // check if already in storage
                            var alreadyInStorage = (retAllInReadZone.newText.indexOf(inText) >= 0);
                            if (!alreadyInStorage) {
                                retAllInReadZone.newText += inText;
                            }
                        }
                    }
                }
            } else {// else
                // Case this element in not in read zone
                // Return "this element is not in read zone"
                retAllInReadZone.isThisElInCurrentReadZone = false;
            }
        } else { // else of "Check if all children in read zone"
            // Case not all children are in read zone
            // Return "this element is not in read zone"
            retAllInReadZone.isThisElInCurrentReadZone = false;
        } // "Check if all children in read zone"
    } else { // else of "check if there are children"
        // Case there are not children
        // Check if most of this element is in the read zone
        var thisElIsRead = isThisElementConsideredAsInReadZone(el);
        if (thisElIsRead) {
            // Case most of this element is in the read zone
            // check if this element has a surface (non-zero area)
            if (isThisElementASurfaceWithANonZeroArea(el)) {
                // Case nonZeroArea
                // Check if there is innerText
                var inText = el.innerText;
                if (inText != null) {
                    // case there is inner text
                    // check if there is useful characters to save
                    var enoughChars = (inText.search(/[A-Z]{2,}/i) >= 0);
                    if (enoughChars === true) {
                        // Case there are enough chars, we need to store the text
                        // check if already in storage
                        var alreadyInStorage = (retAllInReadZone.newText.indexOf(inText) >= 0);
                        if (!alreadyInStorage) {
                            retAllInReadZone.newText += inText;
                        }
                    }
                }
           }
        } else {
            // Case not enough of this element is in the read zone
            // Return "this element is not in read zone"
            retAllInReadZone.isThisElInCurrentReadZone = false;
        }
    } // "check if there are children"
    
    
    // if there is a next sibling, process it
    var nextSiblingToThisEl = el.nextElementSibling;
    if (nextSiblingToThisEl) {
        var ret002 = checkThisElementAndItsChildren_AndIfItIsAreInCurrentReadZoneAndSaveIt (nextSiblingToThisEl, retAllInReadZone.newText);
        retAllInReadZone.newText = ret002.newText;
        var allSiblingAreInReadZone = ret002.isThisElInCurrentReadZone;
        if (! allSiblingAreInReadZone) {
            // Case not all siblings at this level are in the read zone
            // Return "not all element are not in read zone"
            retAllInReadZone.isThisElInCurrentReadZone = false;
        }
    }
    
    // at this point, all children are analyzed, and all next siblings are analyzed.
    return retAllInReadZone;
}
    
//function parseAllPAgeAndDisplayReadZone() {
//    var firstUsefulElement = $("body *").not("script")[0];
//    checkIfThisElementAndItsChildrenAreInReadZoneAndDisplayIt(firstUsefulElement);
//}


function parseAllPageAndSaveTextInCurrentReadingZone() {
        
        
    var textToPutInStorage;
    if (ROOTconfig && ROOTconfig.RootSelectionMode) {
        if (ROOTconfig.RootSelectionMode.indexOf("Every Element Completely At Left And Above The Current Mouse Position In The whole Document") >= 0) {
            var firstUsefulElement = $("body *").not("script")[0];
            // sanity check
            if (firstUsefulElement != null) {
                var ret003;
                var currentTextInStorage = getAllTextFromStorage();
                ret003 = checkThisElementAndItsChildren_AndIfItIsAreInCurrentReadZoneAndSaveIt(firstUsefulElement, currentTextInStorage);
                textToPutInStorage = ret003.newText;
            }
        } else if (ROOTconfig.RootSelectionMode.indexOf("Top is invisible and bottom is very high in screen") >= 0) {
            var arrayOfSimpleElements = getAllUsefulElements();
            // start with current text in storage, then add after it
            textToPutInStorage = getAllTextFromStorage();
            if (arrayOfSimpleElements != null) {
                for (var iii = 0; iii < arrayOfSimpleElements.length; iii++) {
                    var el = arrayOfSimpleElements[iii];
                    var isThereTextDirectly = isThereValidTextDirectlyInThisElement(el);
                    var areBasicSentenceCriteriaMet = isThereEnoughValidTextInThisElement(el);
                    var isShifted = isElementBeingShiftedOut(el);
                    var isVert = isCursorVerticallyInsideThisElementArea(el)

                    // check if we put this el in storage
                    var isItInZone = (isThereTextDirectly && areBasicSentenceCriteriaMet && isShifted && isVert);
                    if (isItInZone) {
                        // remove the dots
                        var inText = el.innerText;
                        inText = removeDotDotDots(inText);
                        if(textToPutInStorage.indexOf(inText) < 0) {
                            // it is not already in storage
                            // so add this text
                            textToPutInStorage += inText;
                        }
                    }
                }
            }
        }
        replaceStorage(textToPutInStorage);
    }
}

function autoReschedulingPeriodicGreying() {
    if(0) console.log("autoReschedulingPeriodicGreying starting");
    if(1) console.log("1   " + getTimeNow() + "ms");
    previousCurrX = currX;
    previousCurrY = currY;
    previousCurrWinPosY = currWinPosY;
    currWinPosY = window.pageYOffset

//    parseAllPAgeAndDisplayReadZone();
    parseAllPageAndSaveTextInCurrentReadingZone();
    parseAllPageAndGrey();
    if(1) console.log("  3 " + getTimeNow() + "ms");
    setTimeout(autoReschedulingPeriodicGreying, ROOT_PERIOD_MS);
}

//function saveElementToStorage( el ) {
//    if (el) {
//        addThisToStorage(el.innerText);
//    }
//}

var hoverInfo = {
    elementUnderMouse : null,
    elementBackgroundColor : "",
    elementMargin : "",
    elementPadding : "",
    enteringTimeMs : 0
};


//function saveAllTextFromEveryElementsOfThisPage() {
//    var  stringToAdd = "";
//
//    if(0) console.log("   4" + getTimeNow() + "ms");
//    
//    // get an array of all elements in the page.
//    var FullArray = getAllUsefulElements();
//    
//    for (i = 0; i< FullArray.length; i++) {
//        // get text of one element
//        var element_i = FullArray[i];
//        var text_element_i = element_i.innerText;
//        stringToAdd += text_element_i;
//    }        
//    if(0) console.log("   5" + getTimeNow() + "ms");
//    addThisToStorage(stringToAdd);
//    if(0) console.log("   6" + getTimeNow() + "ms");
//}

//
//$("body *").not("script").css({"border": ROOT_HIGHLIGHT});
//

//function hovering_in( el ) {
//    if( el != null) {
//        hoverInfo.elementUnderMouse = el;
//        hoverInfo.elementBackgroundColor = $(el).css("border");
//        var d = new Date();
//        hoverInfo.enteringTimeMs = d.getTime();
//    // ne marche pas!   el.css({"border": "solid red"});
////    $("body *").not("script").css({"border": ROOT_HIGHLIGHT});
//        var oneColor = "rgb(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + ")";
//        $(el).css({"border": oneColor});
////    $(el).css("border": TEMP_RED_SQUARE);
//    }
//
//}
//function hovering_in_el( el ) {
//    hoverInfo.elementUnderMouse = el;
//    var d = new Date();
//    hoverInfo.enteringTimeMs = d.getTime();
//    // ne marche pas!   el.css({"border": "solid red"});
////    $("body *").not("script").css({"border": ROOT_HIGHLIGHT});
//    if( el != null) {
//        var oneColor = "rgb(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + ")";
//        $(el).css({"border": oneColor});
////    $(el).css({"border": TEMP_RED_SQUARE});
//    }
//
//}

function enter_el(el) {
    // first, remove previous element
    if (hoverInfo.elementUnderMouse && (hoverInfo.elementUnderMouse != null) && (hoverInfo.elementBackgroundColor !== "")){
        $(hoverInfo.elementUnderMouse).css("border",  hoverInfo.elementBackgroundColor);
        $(hoverInfo.elementUnderMouse).css("margin",  hoverInfo.elementMargin);
        $(hoverInfo.elementUnderMouse).css("padding", hoverInfo.elementPadding);
     }
    if( el != null) {
//        var oneColor = "rgb(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + ")";
//        $(el).css({"border": oneColor});
        
        // save info for later undo
        hoverInfo.elementUnderMouse = el;
        hoverInfo.elementBackgroundColor = $(el).css("border");
// TODO        hoverInfo.elementMargin  = $(el).css("margin");
// TODO        hoverInfo.elementPadding = $(el).css("padding");

        // change the style
//        $(el).css(TEMP_RED_SQUARE_BOX);
//        $(el).css({"border": TEMP_RED_SQUARE});
        // ajust margin/padding
        if (hoverInfo.elementMargin > 0) {
            $(el).css("margin", hoverInfo.elementMargin -1);
        } else {
            if (hoverInfo.elementPadding > 0) {
                $(el).css("padding", hoverInfo.elementPadding -1);
            }
        }
            
        
    }
   
}
function leave_el(el) {
    if( hoverInfo.elementUnderMouse != null) {
//        var oneColor = "rgb(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + ")";
//        $(el).css({"border": oneColor});
        $(hoverInfo.elementUnderMouse).css("border", hoverInfo.elementBackgroundColor);
    }
                   
    // sanity
    if (el != hoverInfo.elementUnderMouse) {
        console.log("ERROR tfgt7sudftg");
    }
   
}

function hovering_out( el ) {
    var d = new Date();
    var currentTimeMs = d.getTime();
    // check if quitting the same element
    if (el == hoverInfo.elementUnderMouse) {
        // check if stayed enough long
        if ((currentTimeMs - hoverInfo.enteringTimeMs) > 1000 /* ms */ ) {
            // TODO addThisToStorage(el.innerText);
        }
        else {
            hoverInfo.elementUnderMouse = null;
        }
    } else {
        hoverInfo.elementUnderMouse = null;
    }
    // ne marche pas!   el.css({"border": REVERT_HIGHLIGHT})
}


function setRulesForMarking() {
// no marche pas bien    
//    $("p").hover(
//        function(){
//            $("p").css("background-color", "yellow");
//        },
//        function(){
//            saveElementToStorage(event.relatedTarget);
//        }
//    );
    
//    $("*").hover(
//        function(){
////            hovering_in(event.relatedTarget);
//            hovering_in_el(this);
//        },
//        function(){
//            hovering_out(event.relatedTarget);
//        }
//    );

//    $("span").hover(
//        function(){
//            hovering_in(event.relatedTarget);
//        },
//        function(){
//            hovering_out(event.relatedTarget);
//        }
//    );
//
//        $("a").hover(
//        function(){
//            hovering_in(event.relatedTarget);
//        },
//        function(){
//            hovering_out(event.relatedTarget);
//        }
//    );

    
    $("*").mouseenter(
        function(evt){
            evt.stopPropagation();
            enter_el(this);
        }
    );
    
    $("body").mouseleave(function(evt) {
        currX = -1;
        currY = -1;
    });

    $("*").not("body").mouseleave(
        function(evt){
    //        evt.stopPropagation();
            leave_el(this);
        }
    );

    $("*").mousemove(function(event){
        currX = event.pageX;
        currY = event.pageY;
        maxX = currX > maxX ? currX : maxX;
        maxY = currY > maxY ? currY : maxY;
        if (0) console.log("x:" + currX + ", y:" + currY +" maxX:" + maxX + ", maxY:" + maxY );
    });
    
    $(window).unload(function(){
        
//        // was this the last page opened on that site?
//        var isLast = isThisTheLastPageOnThisSite();
//        if (isLast) {
//            // reset the storage
//            resetStorage();
//        } else {
//            // add the text of this page to the storage
//            saveAllTextFromEveryElementsOfThisPage();
//        }
//        
//        
//        // in all cases, take note that this page is closing
//        decrementNumberOfOpenPagesOnThisSite();
        
    });
}

$(document).ready(function(){
    if(0) console.log("0++ " + getTimeNow() + "ms");
    //resetStorage();
//    incrementNumberOfOpenPagesOnThisSite();
    setRulesForMarking();
//    greyAllElements();
    
//    var temp11 = getAllUsefulElements();
//    var temp22 = analyseArrayOfAllElements(temp11);
   if(0) console.log("0+++" + getTimeNow() + "ms");
    autoReschedulingPeriodicGreying();
});
    
    
 
    if(0) console.log("0+  " + getTimeNow() + "ms");


