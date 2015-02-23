if(0) console.log("0&  " + getTimeNow() + "ms");
function getTimeNow() {
    return  (new Date()).getTime() % 65536;

}

//var ROOT_HIGHLIGHT = "2px solid rgba(211, 255, 230,0.2)"
var ROOT_BACKGROUND_COLOR_LAST_CHILD = "rgba(185, 220, 200, 0.9)";
var ROOT_BACKGROUND_COLOR_NOT_LAST_CHILD = "rgba(255, 200, 200, 0.1)";

//var ROOT_BACKGROUND_COLOR = "rgb(185, 200, 200)"
//var READ_SQUARE_BOX = "1px 0px 1px 0px dashed red";


//function greyAllElements() {
//    // works: log (1 seule fois) tout le text qu'il y a d'affiché
//    if(0) console.log("<br>" + $("body *").not("script").text());
//    
//    
//    
//    if(0) console.log("<br>================================");
//    
//}
    


//function getAllUsefulElements() {
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


function setElementWithThisStyle( el, mode, color ) {
    
    if (el != null &&  mode != null && color != null) {
        el.style.backgroundColor = "initial";
        el.style.color = "initial";

        if (mode.indexOf("Background Single Solid Color") >= 0) {
            el.style.backgroundColor = color;
        } else if(mode.indexOf("Overlay Box Alpha With Actual Background Color") >= 0) {
        } else if(mode.indexOf("Font Solid Color") >= 0) {
            el.style.color = color;
        }
    }
//    el.style.borderRadius = "15px";
}


function setElementWithRootStyleUsefulTextDirectly( el, config ) {
    if ((el != null) && (config != null)) {
    setElementWithThisStyle (el, config.RootGreyMode, config.RootColor); // old bad:  currentRootGreyModeForReadElements, currentRootColorForReadElements);
//        el.style.backgroundColor = config.RootColor;
    }
}

function setElementWithBackgroundBlue( el ) {
    el.style.backgroundColor = "blue";
    el.style.borderRadius = "1px";
}
function setElementWithBackgroundRed( el ) {
    el.style.backgroundColor = "red";
    el.style.borderRadius = "1px";
}


function setElementWithRootStyleUsefulNoTextDirectly( el ) {
    var oneColor = "rgba(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + ",0.01)";

//    el.style.backgroundColor = oneColor; //ROOT_BACKGROUND_COLOR_NOT_LAST_CHILD;
//    el.style.borderRadius = "25px";
}

//function displayAsInReadZone( el ) {
//    el.style.boxSizing = "border-box";
////    el.style.border = READ_SQUARE_BOX;
//    el.style.borderTop = "1px dashed lightgreen";
//    el.style.borderLeft = "1px dashed lightgreen";
//    el.style.borderRight = "1px dashed lightgreen";
//    el.style.borderBottom = "1px dashed lightgreen";
//}
