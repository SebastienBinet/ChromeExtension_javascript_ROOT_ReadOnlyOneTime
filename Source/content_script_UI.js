//console.log("Injection of content_script_UI.js - started");
//
//// This script is injected in all pages.
//
//
//function resetDatabase() {
//	console.log("In Content_script_UI.js, button Reset Database was pressed.");
//	// Check browser support
//	if (typeof(Storage) != "undefined") {
//		// Store
//		localStorage.setItem("B4D.test001.name", "RESET");
//	} else {
//		console.log("PROBLEM");
//	}
//	location.reload();
//}
//
//function removeResetTag()
//{
//	console.log("In Content_script_UI.js, button Store page was pressed.");
//	// Check browser support
//	if (typeof(Storage) != "undefined") {
//		// Store
//		localStorage.setItem("B4D.test001.name", "ReadY");
//	} else {
//		console.log("PROBLEM");
//	}
//	location.reload();
//}
//
//
//function storeAllTextsWhenButtonPressed(){
//   removeResetTag();
//    performOnAllElementsInPage(storeWhenButtonPressed);
//   // grey the text in the page immediately.
//   // TODO performOnAllElementsInPage(greyElementsThatWereAlreadyStored);
//}
//
//function storeWhenButtonPressed(t) {
//	var textOriginal = String(t.textContent);
//	//t.textContent = ">" + textOriginal + "<";
//	//t.style.color = "green";
//	var sizeTextOriginal = textOriginal.length;
//	// Check browser support
//	if (typeof(Storage) != "undefined") {
//		// Retrieve
//		var oldText = localStorage.getItem("B4D.test001.name");
//		// Add
//		var newText = oldText + textOriginal;
//		// Store
//		localStorage.setItem("B4D.test001.name", newText);
//	} else {
//		console.log("PROBLEM");
//	}
//}
//
//
//function _____performOnAllElementsInPageWhenButtonPressed(functionToPerform) {
//	console.log("debut de performOnAllElementsInPage, from content_script_UI.js");
//	var tags = document.getElementsByTagName('body')[0].getElementsByTagName('*');
//    var i = 0;
//	var t;
//	var bcolor = 0;
//	while (t = tags[i++]) {
//		if (t.childNodes[0] && (t.nodeName != "SCRIPT") ) {
//			var j = 0;
//			if (t.children.length == 0) {
//			   	functionToPerform(t);
//			}
//		}
//	}
//	console.log("fin   de performOnAllElementsInPage, from content_script_UI.js");
//}
//
//function addMyHrLine() {
//    var h = document.createElement("hr");
//    document.body.appendChild(h);
//}
//
//function addMyButtonSave(){
//   var myButton = document.createElement("input");
//   myButton.onclick = storeAllTextsWhenButtonPressed;	
//   myButton.type = "button";
//   myButton.value = "Mark as Read";
//   var t = document.createTextNode("This is a paragraph.");
//   myButton.appendChild(t);                                          
//   document.body.appendChild(myButton);
//}
//
//function addMyButtonReset(){
//   var myButton = document.createElement("input");
//   myButton.onclick = resetDatabase;	
//   myButton.type = "button";
//   myButton.value = "Reset Database";
//   var t = document.createTextNode("This is a paragraph.");
//   myButton.appendChild(t);                                          
//   document.body.appendChild(myButton);
//}
//
//function addMySliderMinMatchLength() {
//   var mySlider = document.createElement("input");
//   mySlider.onclick = resetDatabase;	
//   mySlider.type = "slider";
//   mySlider.value = "Min Match Length";
//   var t = document.createTextNode("This is a paragraph.");
//   mySlider.appendChild(t);                                          
//   document.body.appendChild(mySlider);
//}
//
//function addB4D(){
//    var t = document.createTextNode(" B4D ");
//    document.body.appendChild(t);
//}
//
//function addROOTversion(){
//    var t = document.createTextNode(" ROOT v. 1.00.09 ");
//    document.body.appendChild(t);
//}
//
////function addJavascript(jsname,pos) {
////var th = document.getElementsByTagName(pos)[0];
////var s = document.createElement('script');
////s.setAttribute('type','text/javascript');
////s.setAttribute('src',jsname);
////th.appendChild(s);
////}
//
////addJavascript('content_script_shared.js','head');
//
//addMyHrLine();
//addB4D();
//addMyButtonSave();
//addMyButtonReset();
//addMySliderMinMatchLength();
//addROOTversion();
//addMyHrLine();
//
//console.log("Injection of content_script_UI.js - completed");
