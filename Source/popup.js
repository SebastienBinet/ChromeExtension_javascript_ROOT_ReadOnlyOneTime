// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 **/

var tabIdThatWasOpenedWhenExtensionIconWasPressed = null;

console.log("AAA 1");



function ResetStorageThisSite() {
  console.log("AAA 1.5");
  document.getElementById('status').textContent = "button clicked";
  //chrome.tabs.get(, function test(tab) {console.log("tab is:" + tab);});
//  chrome.tabs.get(tabIdThatWasOpenedWhenExtensionIconWasPressed, chromeTabGetFunctionCallback);
}

// Called in background context when extension icon is clicked
function clickListenerPopupIcon(clickInfo){
  tabIdThatWasOpenedWhenExtensionIconWasPressed = clickInfo.id;
  console.log('Extension icon was clicked while looking at tabId=' + tabIdThatWasOpenedWhenExtensionIconWasPressed);
    document.getElementById('status').textContent = "icon clicked";
    
}

// Obtain the preferences stored in chrome.storage.
function display_options() {
 // Use default value color in case the storage is not accessible.
  chrome.storage.sync.get({
    RootColor: 'Lavender',
    RootNbWordMatch: '4',
    RootGreyMode: 'Font Solid Color',
    RootSelectionMode: 'Top is invisible and bottom is very high in screen'
//    RootVisualFeedback: 'none'
  }, function(items) {
    document.getElementById('RootColor').textContent = items.RootColor;
    document.getElementById('RootNbWordMatch').textContent = items.RootNbWordMatch;
    document.getElementById('RootGreyMode').textContent = items.RootGreyMode;
    document.getElementById('RootSelectionMode').textContent = items.RootSelectionMode;
//    document.getElementById('RootVisualFeedback').textContent = items.RootVisualFeedback;
  });
}








// Called in active tab context when extension icon is clicked
function chromeTabGetFunctionCallback(tab){	 
    
    chrome.tabs.executeScript({code: "resetStorage();"});
    if(0) console.log("0=  " + getTimeNow() + "ms");
    chrome.tabs.executeScript({code: "location.reload();"});
    if(0) console.log("0== " + getTimeNow() + "ms");
}


//function getCurrentTabUrl(callback) {
//  // Query filter to be passed to chrome.tabs.query - see
//  // https://developer.chrome.com/extensions/tabs#method-query
//console.log("AAA 2");
//  var queryInfo = {
//    active: true,
//    currentWindow: true
//  };
//
//  chrome.tabs.query(queryInfo, function(tabs) {
//    // chrome.tabs.query invokes the callback with a list of tabs that match the
//    // query. When the popup is opened, there is certainly a window and at least
//    // one tab, so we can safely assume that |tabs| is a non-empty array.
//    // A window can only have one active tab at a time, so the array consists of
//    // exactly one tab.
//    var tab = tabs[0];
//
//    // A tab is a plain object that provides information about the tab.
//    // See https://developer.chrome.com/extensions/tabs#type-Tab
//    var url = tab.url;
//
//    // tab.url is only available if the "activeTab" permission is declared.
//    // If you want to see the URL of other tabs (e.g. after removing active:true
//    // from |queryInfo|), then the "tabs" permission is required to see their
//    // "url" properties.
//    console.assert(typeof url == 'string', 'tab.url should be a string');
//
//    callback(url);
//  });
//
//  // Most methods of the Chrome extension APIs are asynchronous. This means that
//  // you CANNOT do something like this:
//  //
//  // var url;
//  // chrome.tabs.query(queryInfo, function(tabs) {
//  //   url = tabs[0].url;
//  // });
//  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
//}
//
///**
// * @param {string} searchTerm - Search term for Google Image search.
// * @param {function(string,number,number)} callback - Called when an image has
// *   been found. The callback gets the URL, width and height of the image.
// * @param {function(string)} errorCallback - Called when the image is not found.
// *   The callback gets a string that describes the failure reason.
// */
//function getImageUrl(searchTerm, callback, errorCallback) {
//console.log("AAA 3");
//  // Google image search - 100 searches per day.
//  // https://developers.google.com/image-search/
//  var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
//    '?v=1.0&q=' + encodeURIComponent(searchTerm);
//  var x = new XMLHttpRequest();
//  x.open('GET', searchUrl);
//  // The Google image search API responds with JSON, so let Chrome parse it.
//  x.responseType = 'json';
//  x.onload = function() {
//    // Parse and process the response from Google Image Search.
//    var response = x.response;
//    if (!response || !response.responseData || !response.responseData.results ||
//        response.responseData.results.length === 0) {
//      errorCallback('No response from Google Image search!');
//      return;
//    }
//    var firstResult = response.responseData.results[0];
//    // Take the thumbnail instead of the full image to get an approximately
//    // consistent image size.
//    var imageUrl = firstResult.tbUrl;
//    var width = parseInt(firstResult.tbWidth);
//    var height = parseInt(firstResult.tbHeight);
//    console.assert(
//        typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
//        'Unexpected respose from the Google Image Search API!');
//    callback(imageUrl, width, height);
//  };
//  x.onerror = function() {
//    errorCallback('Network error.');
//  };
//  x.send();
//}
//
//function renderStatus(statusText) {
//console.log("AAA 4");
//  document.getElementById('status').textContent = statusText;
//}
//
document.addEventListener('DOMContentLoaded', function() {
console.log("AAA 5");
//  getCurrentTabUrl(function(url) {
//    // Put the image URL in Google search.
//    renderStatus('Performing Google Image search for ' + url);
//
//    getImageUrl(url, function(imageUrl, width, height) {
//
//      renderStatus('Search term: ' + url + '\n' +
//          'Google image search result: ' + imageUrl);
//      var imageResult = document.getElementById('image-result');
//      // Explicitly set the width/height to minimize the number of reflows. For
//      // a single image, this does not matter, but if you're going to embed
//      // multiple external images in your page, then the absence of width/height
//      // attributes causes the popup to resize multiple times.
//      imageResult.width = width;
//      imageResult.height = height;
//      imageResult.src = imageUrl;
//      imageResult.hidden = false;
//
//    }, function(errorMessage) {
//      renderStatus('Cannot display image. ' + errorMessage);
//    });
//  });
    
    
document.getElementById("ResetStorageThisSite").onclick = ResetStorageThisSite;
document.getElementById('status').textContent = "123456";
display_options();

chrome.browserAction.onClicked.addListener(clickListenerPopupIcon);

    
    
});
