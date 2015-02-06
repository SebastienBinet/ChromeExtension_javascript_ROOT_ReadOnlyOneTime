function getTimeNow() {
    return  (new Date()).getTime() % 65536;

}
if(1) console.log("0%  " + getTimeNow() + "ms");

function getAllTextFromStorage() {
    
    var currentLocaleStorageText = "";
    // Check browser support
	if (typeof (Storage) !== "undefined") {
		// Retrieve
        currentLocaleStorageText = localStorage.getItem("B4D.test001.name");
    }
    return currentLocaleStorageText;
}


function resetStorage() {
	if (typeof (Storage) !== "undefined") {
		// Store
        localStorage.setItem("B4D.test001.name", "EMPTY");
        localStorage.setItem("B4D.test001.numberOfOpenPages", 0);
        if(1) console.log("size of locale storage: 0");
        if(1) console.log("0%% " + getTimeNow() + "ms");
   }    
}


function addThisToStorage( textToAdd ) {
	if (typeof (Storage) !== "undefined") {
		// Retrieve
        var currentLocaleStorageText = localStorage.getItem("B4D.test001.name");
		// Store
        var newText = currentLocaleStorageText + textToAdd;
        localStorage.setItem("B4D.test001.name", newText);
        if(1) console.log("size of locale storage:" + newText.length);
        
    }    
    
}


function incrementNumberOfOpenPagesOnThisSite() {
    if (typeof (Storage) !== "undefined") {
		// Retrieve
        var currentLocaleValueString = localStorage.getItem("B4D.test001.numberOfOpenPages");
        var currentLocaleValue = parseInt(currentLocaleValueString);
		// Store
        var newLocaleValue = currentLocaleValue + 1;
        localStorage.setItem("B4D.test001.numberOfOpenPages", newLocaleValue);
    }    

}

function decrementNumberOfOpenPagesOnThisSite() {
    if (typeof (Storage) !== "undefined") {
		// Retrieve
        var currentLocaleValueString = localStorage.getItem("B4D.test001.numberOfOpenPages");
        var currentLocaleValue = parseInt(currentLocaleValueString);
		// Store if it make sense
        if (currentLocaleValue >= 1) {
            var newLocaleValue = currentLocaleValue - 1;
            localStorage.setItem("B4D.test001.numberOfOpenPages", newLocaleValue);
        } else {
            localStorage.setItem("B4D.test001.numberOfOpenPages", 0);
        }
    }    

}

function isThisTheLastPageOnThisSite() {
    var isLastOne = true;
    if (typeof (Storage) !== "undefined") {
		// Retrieve
        var currentLocaleValueString = localStorage.getItem("B4D.test001.numberOfOpenPages");
        var currentLocaleValue = parseInt(currentLocaleValueString);
		
        isLastOne = !(currentLocaleValue >= 1);
    }    
    return isLastOne;
}


function howManyPagesAreCurrentlyOpenedOnThisSite() {
    var qty = -1;
    if (typeof (Storage) !== "undefined") {
		// Retrieve
        var currentLocaleValueString = localStorage.getItem("B4D.test001.numberOfOpenPages");
        qty = parseInt(currentLocaleValueString);
    }    
    return qty;
}