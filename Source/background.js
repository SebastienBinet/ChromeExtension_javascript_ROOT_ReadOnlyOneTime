/*global chrome */
/*global chromeTabGetFunctionCallback */
/*jslint devel: true */

console.log("Injection background.js - begin");




// Called in background context when extension icon is clicked
function clickListener(clickInfo) {
    "use strict";
    var tabId = clickInfo.id;
    console.log('Extension icon was clicked while looking at tabId=' + tabId);
    chrome.tabs.get(tabId, chromeTabGetFunctionCallback);
}

function getTimeNow() {
    "use strict";
    return (new Date()).getTime() % 65536;
}

// Called in active tab context when extension icon is clicked
function chromeTabGetFunctionCallback(tab) {
    "use strict";
    chrome.tabs.executeScript({code: "resetStorage();"});
    //if (0) console.log("0=  " + getTimeNow() + "ms");
//    chrome.tabs.executeScript({code: "location.reload();"});
    chrome.tabs.executeScript({code: "resetElementStyleAllElementsInPage();"});
    //if (0) console.log("0== " + getTimeNow() + "ms");
}




/////////////////////////////////////////
chrome.browserAction.onClicked.addListener(clickListener);


console.log("Injection background.js - end");

