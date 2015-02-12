//console.log("Injection of content_script_shared.js - started");
//function performOnAllElementsInPage(functionToPerform) {
//  	console.log("000 in performOnAllElementsInPage");
//	var tags = document.getElementsByTagName('body')[0].getElementsByTagName('*');
//    var i = 0;
//	var t;
//	var bcolor = 0;
//	
//	var currentText = localStorage.getItem("B4D.test001.name");
//	// is there any text to check grey-out?
//	  	console.log("001 in performOnAllElementsInPage");
//		while (t = tags[i]) {
//			var isThereAtLeastOneNode = t.childNodes.length > 0;
//			var isThisNodeAScript = t.nodeName == "SCRIPT";
//			var nbrChildren = t.children.length;
//			var isThereAnyChildren = nbrChildren > 0;
//			var isThereAnyChildrenThatIsNotASpan = false;
//			var isThereAnyChildrenThatIsADiv = false;
//			// Check if any children is not a span
//			for (child = 0 ; child < nbrChildren ; child++) {
//				var isThisChildrenASpan = (t.children[child].tagName == "SPAN");
//				isThereAnyChildrenThatIsNotASpan = isThereAnyChildrenThatIsNotASpan || !isThisChildrenASpan;
//			}
//			// TODO: maybe use isThereAnyChildrenThatIsADiv
//			//for (child = 0 ; child < nbrChildren ; child++) {
//			//	var isThisChildrenADiv = (t.children[child].tagName == "DIV");
//			//	isThereAnyChildrenThatIsADiv = isThereAnyChildrenThatIsADiv || !isThisChildrenADiv;
//			//}
//			var okToProcessIt =  ! isThisNodeAScript &&
//			   isThereAtLeastOneNode &&
//			   ! isThereAnyChildrenThatIsNotASpan;
//			   
////			if (t.childNodes[0] && (t.nodeName != "SCRIPT") ) {
//			if ( okToProcessIt ) {
//			   //console.log("011 in performOnAllElementsInPage, tags[" + i + "] is accepted");
//				//var j = 0;
//				//if (t.children.length == 0) {
//			   	    functionToPerform(t);
//				//   }
//			}
//			i++;
//		}
//		// from now on, check if the reset button was recently pressed
//		checkForResetCommand = true;
//		console.log("fin   de performOnAllElementsInPage, from content_script_shared.js");
//}
//
//
//
//console.log("Injection of content_script_shared.js - completed");
