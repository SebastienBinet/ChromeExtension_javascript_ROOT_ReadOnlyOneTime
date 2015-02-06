"use strict";
if(1) console.log("0   " + getTimeNow() + "ms");
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
    if(1) console.log("autoReschedulingPeriodicGreying starting");
    if(1) console.log("1   " + getTimeNow() + "ms");
   
    // get an array of all elements in the page.
    FullArray = getAllUsefulElements();
    
    
    
    
    if(1) console.log("1+  " + getTimeNow() + "ms");

    // get storage text
    var  allTextFromStorage = getAllTextFromStorage();
    var qty = howManyPagesAreCurrentlyOpenedOnThisSite();
    if(2) console.log(" 2  " + getTimeNow() + "ms, nb pages opened=" + qty + ", local storage size=" + allTextFromStorage.length);
    
    // parse all elements and grey them if they are found in storage 
    for (i = 0; i< FullArray.length; i++) {
        // get text of one element
        var element_i = FullArray[i];
        var text_element_i = element_i.innerText;
        
        // check if the text of this element is not empty and found in the Storage
        var found = ((text_element_i.length > 0) && (allTextFromStorage.indexOf(text_element_i) >= 0));
        
        // if found, put it in grey
        if (found) {
            setElementWithRootStyle(element_i);
        }

        if(0) console.log(">>>[" + i + "] = " + element_i + ":" + text_element_i + "<<<");
    }
    
    // prepare for next iteration
    if(1) console.log("  3 " + getTimeNow() + "ms");
    setTimeout(autoReschedulingPeriodicGreying, 100);
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

    if(1) console.log("   4" + getTimeNow() + "ms");
    
    for (i = 0; i< FullArray.length; i++) {
        // get text of one element
        var element_i = FullArray[i];
        var text_element_i = element_i.innerText;
        stringToAdd += text_element_i;
    }        
    if(1) console.log("   5" + getTimeNow() + "ms");
    addThisToStorage(stringToAdd);
    if(1) console.log("   6" + getTimeNow() + "ms");
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
        console.log("x:" + x + ", y:" + y );
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
    if(1) console.log("0++ " + getTimeNow() + "ms");
    //resetStorage();
    incrementNumberOfOpenPagesOnThisSite();
    setRulesForMarking();
//    greyAllElements();
    
//    var temp11 = getAllUsefulElements();
//    var temp22 = analyseArrayOfAllElements(temp11);
   if(1) console.log("0+++" + getTimeNow() + "ms");
    autoReschedulingPeriodicGreying();
});
    
    
 
    if(1) console.log("0+  " + getTimeNow() + "ms");


