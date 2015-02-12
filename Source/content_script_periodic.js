"use strict";
if(0) console.log("0   " + getTimeNow() + "ms");
//console.log("Injection of content_script_periodic.js - started");
// This script is injected in all pages.

var ROOT_HIGHLIGHT = "10px solid rgba(211, 255, 230,0.2)";
var REVERT_HIGHLIGHT = "revert";
var TEMP_RED_SQUARE = "1px dashed red";
//var TEMP_RED_SQUARE_BOX = {
//    "box-sizing": "border-box",
//    "border": "1px 0px 1px 0px dashed red"
//    };

var TEMP_RED_SQUARE_BOX = {
    "background-color": "rgba(0, 255, 0, 0.3)"
    };
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


var FullArray; // full array of elements in this page


function getTimeNow() {
    return  (new Date()).getTime() % 65536;

}
function autoReschedulingPeriodicGreying() {
    if(0) console.log("autoReschedulingPeriodicGreying starting");
    if(0) console.log("1   " + getTimeNow() + "ms");
//#if 0
   
    // get an array of all elements in the page.
    FullArray = getAllUsefulElements();
    
    
    
    
    if(0) console.log("1+  " + getTimeNow() + "ms");

    // get storage text
    var  allTextFromStorage = getAllTextFromStorage();
    var qty = howManyPagesAreCurrentlyOpenedOnThisSite();
    if(0) console.log(" 2  " + getTimeNow() + "ms, nb pages opened=" + qty + ", local storage size=" + allTextFromStorage.length);
    
    // parse all elements and grey them if they are found in storage
    var i;
//    for (i = 0; i< FullArray.length; i++) {
        // get text of one element
//        var element_i = FullArray[i];
    
    // start at top, and parse until the end
    var element_body = $("body")[0];
    var element_i = element_body.children[0];

    while (element_i) {
        var next_element = null;
        var text_element_i = element_i.innerText;
        var afterThisElement_stopGoingDown = false;
        
        if (text_element_i != null) {
            // check that there is text in this element or in its children
            var positionOfLongAlphabeticStringInTree = text_element_i.search(/[A-Z]{2,}/i);
            var thereIsUsefulTextInThisTree = positionOfLongAlphabeticStringInTree >= 0;


            // check if there is enough consecutive characters (in this element and its children tree) to be considered a text element
            if (thereIsUsefulTextInThisTree) {
                // check if the text of this element is not empty and found in the Storage
                var isTreeAllFound = ((text_element_i.length > 0) && (allTextFromStorage.indexOf(text_element_i) >= 0));
                // if all text inside this node (includes all children tree) was found in storage
                if (isTreeAllFound) {
                    // check that there is long enough text directly in this element
                    var thereIsUsefulTextDirectly = false;
                    var iiii;
                    for (iiii = 0; iiii < element_i.childNodes.length; iiii++) {
                        if ((element_i.childNodes[iiii].nodeName === "#text") && (element_i.childNodes[iiii].wholeText.search(/[A-Z]{2,}/i) >= 0)) {
                            thereIsUsefulTextDirectly = true;
                        }
                    }
                    // last child if there is no child or if there is 0 child
                    var lastChild = (element_i && (!element_i.children || (element_i.children.length === 0)));
                    // if found and there are long enough text directly at this level, put it in grey
                    if(thereIsUsefulTextDirectly || lastChild) {
                        setElementWithRootStyleUsefulTextDirectly(element_i);
                        // we do not need to parse children, so try to go to next sibbling
                        afterThisElement_stopGoingDown = true;
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
    
    // prepare for next iteration
    if(0) console.log("  3 " + getTimeNow() + "ms");
    setTimeout(autoReschedulingPeriodicGreying, 100);
//#endif
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


function saveAllTextFromEveryElementsOfThisPage() {
    var  stringToAdd = "";

    if(0) console.log("   4" + getTimeNow() + "ms");
    
    for (i = 0; i< FullArray.length; i++) {
        // get text of one element
        var element_i = FullArray[i];
        var text_element_i = element_i.innerText;
        stringToAdd += text_element_i;
    }        
    if(0) console.log("   5" + getTimeNow() + "ms");
    addThisToStorage(stringToAdd);
    if(0) console.log("   6" + getTimeNow() + "ms");
}

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
    $("*").mouseleave(
        function(evt){
            evt.stopPropagation();
            leave_el(this);
        }
    );

    $("*").mousemove(function(event){
        var x = event.pageX;
        var y = event.pageY;
        if (0) console.log("x:" + x + ", y:" + y );
    });
    
    $(window).unload(function(){
        
        // was this the last page openned on that site?
        var isLast = isThisTheLastPageOnThisSite();
        if (isLast) {
            // reset the storage
            resetStorage();
        } else {
            // add the text of this page to the storage
            saveAllTextFromEveryElementsOfThisPage();
        }
        
        
        // in all cases, take note that this page is closing
        decrementNumberOfOpenPagesOnThisSite();
        
    });
}

$(document).ready(function(){
    if(0) console.log("0++ " + getTimeNow() + "ms");
    //resetStorage();
    incrementNumberOfOpenPagesOnThisSite();
    setRulesForMarking();
//    greyAllElements();
    
//    var temp11 = getAllUsefulElements();
//    var temp22 = analyseArrayOfAllElements(temp11);
   if(0) console.log("0+++" + getTimeNow() + "ms");
    autoReschedulingPeriodicGreying();
});
    
    
 
    if(0) console.log("0+  " + getTimeNow() + "ms");


