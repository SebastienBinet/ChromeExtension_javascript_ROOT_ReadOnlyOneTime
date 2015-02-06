console.log("Injection background.js - begin");

// Called in background context when extension icon is clicked
function clickListener(clickInfo){
  var tabId_ = clickInfo.id;
  console.log('Extension icon was clicked while looking at tabId=' + tabId_);
  chrome.tabs.get(tabId_, chromeTabGetFunctionCallback);
}

// Called in active tab context when extension icon is clicked
function chromeTabGetFunctionCallback(tab){	 
	 // Execute the greyAll() in the script file
     chrome.tabs.executeScript({file: "content_script_save_all_in_page.js"});
}

/////////////////////////////////////////
chrome.browserAction.onClicked.addListener(clickListener);


console.log("Injection background.js - end");

