/*global $, jQuery, alert*/
/*global resetElementStyle */


/*jslint plusplus: true */
/*jslint devel: true */
/*jslint browser: true*/
/*jslint vars:true */


//if(0) console.log("0&  " + getTimeNow() + "ms");
function getTimeNow() {
    "use strict";
    return (new Date()).getTime() % 65536;
}

//var ROOT_HIGHLIGHT = "2px solid rgba(211, 255, 230,0.2)"
var ROOT_BACKGROUND_COLOR_LAST_CHILD = "rgba(185, 220, 200, 0.9)";
var ROOT_BACKGROUND_COLOR_NOT_LAST_CHILD = "rgba(255, 200, 200, 0.1)";

//var ROOT_BACKGROUND_COLOR = "rgb(185, 200, 200)"
//var READ_SQUARE_BOX = "1px 0px 1px 0px dashed red";


//function greyAllElements() {
//    "use strict";
//    // works: log (1 seule fois) tout le text qu'il y a d'affiché
//    if(0) console.log("<br>" + $("body *").not("script").text());
//    
//    
//    
//    if(0) console.log("<br>================================");
//    
//}
    


//function getAllUsefulElements() {
//    "use strict";
////    var all = $("body *").not("script").text();
////    if (0) console.log("all = " + all);
//    var all = $("body *").not("script");
//    for (i = 0; i< all.length; i++) {
//        var element_i = all[i];
//        var text_element_i = element_i.innerText;
//        if(0) console.log(">>>[" + i + "] = " + element_i + ":" + text_element_i + "<<<");
//    }
//    return all;
//}


// get all elements in page that are important
function getAllUsefulElements() { // all the body, except the scripts 
    "use strict";
    var x = $("body *").not("script").toArray();
    
    return x;
}

function resetElementStyleAllElementsInPage() {
    "use strict";
    var arrayOfSimpleElements = getAllUsefulElements();
    if (arrayOfSimpleElements !== null) {
        var iii;
        for (iii = 0; iii < arrayOfSimpleElements.length; iii++) {
            var el = arrayOfSimpleElements[iii];
            resetElementStyle(el);
        }
    }
}

function resetElementStyle(el) {
    "use strict";
    
    if (el !== null) {
        var thisNode;
        thisNode = el.getAttributeNode("data-root-style-background-color");
        if (thisNode !== null) {
            var originalbackgroundColor = thisNode.value;
            el.style.backgroundColor = originalbackgroundColor;
        }
        thisNode = el.getAttributeNode("data-root-style-font-color");
        if (thisNode !== null) {
            var originalFontColor = thisNode.value;
            el.style.color = originalFontColor;
        }
    }
}

function setElementWithThisStyle(el, mode, color) {
    "use strict";
   
    if (el !== null &&  mode !== null && color !== null) {
        // save initial background color if not yet saved
        var initialBackgroundColorAttr = el.getAttributeNode("data-root-style-background-color");
        if (initialBackgroundColorAttr !== null) {
            var initialBackgroundColor     = initialBackgroundColorAttr.value;
        }
        var initialFontColorAttr       = el.getAttributeNode("data-root-style-font-color");
        if (initialFontColorAttr !== null) {
            var initialFontColor           = initialFontColorAttr.value;
        }
        
        if (initialBackgroundColor == null) {
            var backgroundColor = el.style.backgroundColor;
            el.setAttribute("data-root-style-background-color", backgroundColor);
        }
        // save previous font color if not yet saved
        if (initialFontColor == null) {
            var fontColor = el.style.color;
            el.setAttribute("data-root-style-font-color", fontColor);
        }
        
        if (mode.indexOf("Background Single Solid Color") >= 0) {
            // set new background color
            el.style.backgroundColor = color;
            // reset font color
            if (initialFontColor !== null) {
                el.style.color = initialFontColor;
            }
        } else if (mode.indexOf("Overlay Box Alpha With Actual Background Color") >= 0) {
            var dummy = 0;
        } else if (mode.indexOf("Font Solid Color") >= 0) {
            // set new background color
            el.style.color = color;
            // reset background color
            if (initialBackgroundColor !== null) {
                el.style.backgroundColor = initialBackgroundColor;
            }
        }
    }
//    el.style.borderRadius = "15px";
}


function setElementWithRootStyleUsefulTextDirectly(el, config) {
    "use strict";
    if ((el !== null) && (config !== null)) {
        setElementWithThisStyle(el, config.RootGreyMode, config.RootColor); // old bad:  currentRootGreyModeForReadElements, currentRootColorForReadElements);
//        el.style.backgroundColor = config.RootColor;
    }
}

function setElementWithBackgroundBlue(el) {
    "use strict";
    el.style.backgroundColor = "blue";
    el.style.borderRadius = "1px";
}
function setElementWithBackgroundRed(el) {
    "use strict";
    el.style.backgroundColor = "red";
    el.style.borderRadius = "1px";
}


function setElementWithRootStyleUsefulNoTextDirectly(el) {
    "use strict";
    var oneColor = "rgba(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ",0.01)";

//    el.style.backgroundColor = oneColor; //ROOT_BACKGROUND_COLOR_NOT_LAST_CHILD;
//    el.style.borderRadius = "25px";
}

//function displayAsInReadZone( el ) {
//    "use strict";
//    el.style.boxSizing = "border-box";
////    el.style.border = READ_SQUARE_BOX;
//    el.style.borderTop = "1px dashed lightgreen";
//    el.style.borderLeft = "1px dashed lightgreen";
//    el.style.borderRight = "1px dashed lightgreen";
//    el.style.borderBottom = "1px dashed lightgreen";
//}
