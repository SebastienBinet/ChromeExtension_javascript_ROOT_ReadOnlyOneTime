console.log("Injection background.js - begin");




// Called in background context when extension icon is clicked
function clickListener(clickInfo){
  var tabId_ = clickInfo.id;
  console.log('Extension icon was clicked while looking at tabId=' + tabId_);
  chrome.tabs.get(tabId_, chromeTabGetFunctionCallback);
}

function getTimeNow() {
    return  (new Date()).getTime() % 65536;
}

// Called in active tab context when extension icon is clicked
function chromeTabGetFunctionCallback(tab){	 
    
    chrome.tabs.executeScript({code: "resetStorage();"});
    if(0) console.log("0=  " + getTimeNow() + "ms");
    chrome.tabs.executeScript({code: "location.reload();"});
    if(0) console.log("0== " + getTimeNow() + "ms");
}




/////////////////////////////////////////
chrome.browserAction.onClicked.addListener(clickListener);


console.log("Injection background.js - end");

