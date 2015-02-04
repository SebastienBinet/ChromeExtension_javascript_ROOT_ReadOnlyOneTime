"use strict";
//console.log("Injection of content_script_periodic.js - started");
// This script is injected in all pages.

var MIN_SIZE_FOR_MATCH = 4;
var JUMPS_WHEN_FAST_FINDING = Math.floor(MIN_SIZE_FOR_MATCH / 2);

/////////////// BON: met chaque paragraph à une douleur différente. Mais ne traite pas correctement les &nbsp;
//var red = 0;
//var red_mod = 0;
//function greyElements(tab) {
//    red_mod = red % 255
//    tab.style.background = "rgb("+red_mod+", 128, 128)";
//    red += 33;
//    if (tab.textContent.indexOf("\"use strict\";") >= 0) {
//        red = 0;
//    }
//        
//}

var indexInArrayOfMatchs = 0;
var allMatchStringsAndPos = [];
var storageLength = -1;

function autoReschedulingPeriodicGreying() {
    console.log("autoReschedulingPeriodicGreying starting");
	var currentLocaleStorageText = "-DEFAULT-";
    // Check browser support
	if (typeof (Storage) !== "undefined") {
		// Retrieve
        currentLocaleStorageText = localStorage.getItem("B4D.test001.name");
    }
    var allPageText = getAggregateTextInPage();
    // save processing time if no change in storage
    if (currentLocaleStorageText && (currentLocaleStorageText.length != storageLength)) {
        storageLength = currentLocaleStorageText.length;
        var minMatchLength = MIN_SIZE_FOR_MATCH;
        console.log("1");
        var retStringAndPosArray = findAllMatches(currentLocaleStorageText, allPageText, minMatchLength);
        allMatchStringsAndPos = retStringAndPosArray;
    }
    console.log(" 2");
//    for(var index=0; index < allMatchStringsAndPos.length; index++) {
//        var stringAndPosToGrey = allMatchStringsAndPos[index].stringFound;
//        putInGreyAllElementsInPageHavingThisString(stringAndPosToGrey);
//        //console.log(stringAndPosToGrey);
//    }
    
    // only if exists
    if (allMatchStringsAndPos && allMatchStringsAndPos.length) {
        var stringAndPosToGrey = allMatchStringsAndPos[(indexInArrayOfMatchs++) % allMatchStringsAndPos.length];
        console.log("               " + stringAndPosToGrey.stringFound + " from " + stringAndPosToGrey.begPosInPage + " to " + stringAndPosToGrey.endPosInPage);

        // grey only if valid string
        if(stringAndPosToGrey) {
            putInGreyAllElementsInPageHavingThisString(stringAndPosToGrey);
            console.log("  3");
        }
    }
    console.log("   4");

    //putInGreyAllElementsInPageHavingThisString('angul');
    setTimeout(autoReschedulingPeriodicGreying, 100);
}



autoReschedulingPeriodicGreying();

var topElement = document.getElementsByTagName('body')[0];

///////////// BON: trouve tous les mots et les met en grandeur random
//findAndReplaceDOMText(topElement, {
//	find: /\w+/g,
//	replace: function(portion) {
//		var el = document.createElement('span');
//		el.style.fontSize = (Math.random() + .6) + 'em';
//		el.innerHTML = portion.text;
//		return el;
//	}
//});

///////////// BON: trouve tous les paragraphes et les met en couleur
//var regex = RegExp('.+', 'gi');
//findAndReplaceDOMText(topElement, {
//				find: regex,
//				replace: function(portion, match) {
//					var el = document.createElement('em');
//					el.style.backgroundColor = 'red';
//					el.innerHTML = portion.text;
//					return el;
////                    return '.';
//				}
//});

///////////// BON: trouve des lettre séparées par des espaces ou des &nbsp;, et les met en italique
//findAndReplaceDOMText(topElement, {
//  find: 'strict";\\s+Def',
//  wrap: 'em'
//});


//console.log("Injection of content_script_periodic.js - completed");
