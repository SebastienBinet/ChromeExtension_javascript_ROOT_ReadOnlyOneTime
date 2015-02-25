/*global replaceStorage */
/*global $, jQuery, alert*/
/*global chrome */

/*jslint devel: true */
/*jslint browser: true*/

var debLogA = 1;
var debLogB = 1;

function getTimeNow() {
    "use strict";
    return (new Date()).getTime() % 65536;

}

if (debLogA) {console.log("0%  " + getTimeNow() + "ms"); }

var currentRootConfig = null;

// Obtain the preferences stored in chrome.storage.
function retrieve_ROOT_options() {
    "use strict";
    chrome.storage.sync.get({
        RootColor: 'yellow',
        RootNbWordMatch: '4',
        RootGreyMode: 'Font Solid Color',
        RootSelectionMode: 'Top is invisible and bottom is very high in screen',
        RootVisualFeedback: 'none'
    }, function (items) {
        currentRootConfig = items;
        if (debLogB) {console.log("Config color is currently: " + currentRootConfig.RootColor); }
    });
}

function get_ROOT_options() {
    "use strict";
    retrieve_ROOT_options();
    return currentRootConfig;
}

function getAllTextFromStorage() {
    "use strict";
    var currentLocaleStorageText = "";
    // Check browser support
	if (typeof (Storage) !== "undefined") {
		// Retrieve
        currentLocaleStorageText = localStorage.getItem("B4D.test001.name");
    }
    return currentLocaleStorageText;
}


function resetStorage() {
    "use strict";
	if (typeof (Storage) !== "undefined") {
		// Store
        replaceStorage("EMPTY");
        localStorage.setItem("B4D.test001.numberOfOpenPages", 0);
        if (debLogA) {console.log("size of locale storage: 0"); }
        if (debLogA) {console.log("0%% " + getTimeNow() + "ms"); }
    }
}


function addThisToStorage(textToAdd) {
    "use strict";
	if (typeof (Storage) !== "undefined") {
		// Retrieve
        var currentLocaleStorageText = getAllTextFromStorage(),
		// Store
            newText = currentLocaleStorageText + textToAdd;
        replaceStorage(newText);
        if (debLogA) {console.log("size of locale storage:" + newText.length); }
        
    }
}

function replaceStorage(textToStore) {
    "use strict";
	if (typeof (Storage) !== "undefined") {
        localStorage.setItem("B4D.test001.name", textToStore);
        if (debLogA) {console.log("size of locale storage:" + textToStore.length); }
        
    }
    
}


//function incrementNumberOfOpenPagesOnThisSite() {
//    if (typeof (Storage) !== "undefined") {
//		// Retrieve
//        var currentLocaleValueString = localStorage.getItem("B4D.test001.numberOfOpenPages");
//        var currentLocaleValue = parseInt(currentLocaleValueString);
//		// Store
//        var newLocaleValue = currentLocaleValue + 1;
//        localStorage.setItem("B4D.test001.numberOfOpenPages", newLocaleValue);
//    }    
//
//}

//function decrementNumberOfOpenPagesOnThisSite() {
//    if (typeof (Storage) !== "undefined") {
//		// Retrieve
//        var currentLocaleValueString = localStorage.getItem("B4D.test001.numberOfOpenPages");
//        var currentLocaleValue = parseInt(currentLocaleValueString);
//		// Store if it make sense
//        if (currentLocaleValue >= 1) {
//            var newLocaleValue = currentLocaleValue - 1;
//            localStorage.setItem("B4D.test001.numberOfOpenPages", newLocaleValue);
//        } else {
//            localStorage.setItem("B4D.test001.numberOfOpenPages", 0);
//        }
//    }    
//
//}

//function isThisTheLastPageOnThisSite() {
//    var isLastOne = true;
//    if (typeof (Storage) !== "undefined") {
//		// Retrieve
//        var currentLocaleValueString = localStorage.getItem("B4D.test001.numberOfOpenPages");
//        var currentLocaleValue = parseInt(currentLocaleValueString);
//		
//        isLastOne = !(currentLocaleValue >= 1);
//    }    
//    return isLastOne;
//}


//function howManyPagesAreCurrentlyOpenedOnThisSite() {
//    var qty = -1;
//    if (typeof (Storage) !== "undefined") {
//		// Retrieve
//        var currentLocaleValueString = localStorage.getItem("B4D.test001.numberOfOpenPages");
//        qty = parseInt(currentLocaleValueString);
//    }    
//    return qty;
//}