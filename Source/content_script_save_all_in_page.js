//console.log("Injection content_script_save_all_in_page.js - begin");
//
//
//
//function storeAllTextsWhenExtensionIconIsPressed(){
//    performOnAllElementsInPageWhenExtensionIconIsPressed(storeWhenExtensionIconIsPressed);
//}
//
//function storeWhenExtensionIconIsPressed(t) {
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
//function performOnAllElementsInPageWhenExtensionIconIsPressed(functionToPerform) {
//	console.log("debut de performOnAllElementsInPage, from content_script_save_all_in_page.js");
//	var tags = document.getElementsByTagName('body')[0].getElementsByTagName('*');
//    var i = 0;
//	var t;
//	var bcolor = 0;
//	while (t = tags[i++]) {
//
//        var b=t.textContent;
//        var posMatchInB = b.indexOf("his code assign");
//        if (posMatchInB >= 0) {
//            // there is a match
//            var i =0;
//        }	
//		if (t.childNodes[0] && (t.nodeName != "SCRIPT") ) {
//			var j = 0;
//			if (t.children.length == 0) {
//			   	functionToPerform(t);
//			}
//		}
//	}
//	console.log("fin   de performOnAllElementsInPage, from content_script_save_all_in_page.js");
//}
//
//
//
//
//storeAllTextsWhenExtensionIconIsPressed();
//
//
//console.log("Injection content_script_save_all_in_page.js - end");
//
