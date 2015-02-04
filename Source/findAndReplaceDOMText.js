GREY_COLOR = 'rgb(211, 255, 230)';
var debugLogRecursiveDOM = false;

//function OBSOLETE_putInGreyAllElementsInPageHavingThisString(stringToFind) {
//    
//    var topElement = document.getElementsByTagName('body')[0];
//    var regex = '';
//    var option = {};
//    
//    regex = RegExp(stringToFind, 'gi');
//    option = {
//        find: regex,
////        replace: function(portion, match) {
////            var el = document.createElement('em');
////            el.style.backgroundColor = GREY_COLOR;
////            el.innerHTML = portion.text;
////            return el;
////        }
//       replace: function(portion, match) {
//            var sp = document.createElement('span');
//            sp.style.backgroundColor = GREY_COLOR;
//            sp.innerHTML = portion.text;
//            return sp;
//        }
//    };
//    findAndReplaceDOMText(topElement, option);
//}
function putInGreyThisStringInPage(stringAndPosToReplace) {
    
    
    // find element with beginning position
    
    
    
    
    var topElement = document.getElementsByTagName('body')[0];
    var regex = '';
    var option = {};
    
    regex = RegExp(stringAndPosToReplace., 'gi');
    option = {
        find: regex,
//        replace: function(portion, match) {
//            var el = document.createElement('em');
//            el.style.backgroundColor = GREY_COLOR;
//            el.innerHTML = portion.text;
//            return el;
//        }
       replace: function(portion, match) {
            var sp = document.createElement('span');
            sp.style.backgroundColor = GREY_COLOR;
            sp.innerHTML = portion.text;
            return sp;
        }
    };
    findAndReplaceDOMText(topElement, option);
}



function findAndReplaceDOMText(node, options) {
	return new Finder(node, options);
}

function getAggregateTextInPage() {
    var topElement = document.getElementsByTagName('body')[0];
    var textInfoInPage = getText(topElement, null);
    var textInPage = textInfoInPage.textChars;
    return textInPage;
}


function findElementWithThisText(node, stringAndPosInPage) {

    var parseInfo = {
        nbCharParsed: 0,   // this is the number of char analysed during this call
        element   : null // at the end of the recursive calls this will contain the elemnt index.
    };

    if (node.nodeType === 3) {
        var temp_chars = node.data;
        parseInfo.nbCharParsed = temp_chars.length;
        textAndInfoLocal.textChars = node.data;
        return textAndInfoLocal;
    }

    if (elementFilter && !elementFilter(node)) {
        textAndInfoLocal.textChars = '';
        return textAndInfoLocal;
    }

    var txt = '';

// TODO: verify if code need to handle the case where script is not the last sibling !!!!!!!!!!!! should we exit the loop ?
    if (node = node.firstChild) do {
        // there was a child
        var textAndInfoInnerLoop = getText(node, elementFilter);
        txt += textAndInfoInnerLoop.textChars;
        //      isAlreadyRooted += textAndInfoInnerLoop.textAlreadyRootColored;
    } while ((node = node.nextSibling) && (node.nodeName !== "SCRIPT")); // loop until there is no sibling. 

    textAndInfoLocal.textChars = txt;
    return textAndInfoLocal;

}
















/**
 * Gets aggregate text of a node without resorting
 * to broken innerText/textContent
 */
function getText(node, elementFilter) {

    var textAndInfoLocal = {
        textChars: ''
//                    textAlreadyRootColored: 0;
    };

    // get color change in this node
    if (node && node.outerHTML) {
        // verify if there is a background-color information
        var currentOuterHtml = node.outerHTML;
        var currentBackgroundIndex = currentOuterHtml.indexOf("<em style=\"background-color: rgb(211, 255, 230);\">");
        if (currentBackgroundIndex === 0) {
							                                                             if (debugLogRecursiveDOM) { console.log("startsAlreadyByRootColor"); }
//                        textAndInfoLocal.textAlreadyRootColored = '1';
        }
    }

    if (node.nodeType === 3) {
        textAndInfoLocal.textChars = node.data;
        return textAndInfoLocal;
    }

    if (elementFilter && !elementFilter(node)) {
        textAndInfoLocal.textChars = '';
        return textAndInfoLocal;
    }

    var txt = '';

// TODO: verify if code need to handle the case where script is not the last sibling !!!!!!!!!!!! should we exit the loop ?
    if (node = node.firstChild) do {
        // there was a child
        var textAndInfoInnerLoop = getText(node, elementFilter);
        txt += textAndInfoInnerLoop.textChars;
        //      isAlreadyRooted += textAndInfoInnerLoop.textAlreadyRootColored;
    } while ((node = node.nextSibling) && (node.nodeName !== "SCRIPT")); // loop until there is no sibling. 

    textAndInfoLocal.textChars = txt;
    return textAndInfoLocal;

}

/**
 * findAndReplaceDOMText v 0.4.2
 * @author James Padolsey http://james.padolsey.com
 * @license http://unlicense.org/UNLICENSE
 *
 * Matches the text of a DOM node against a regular expression
 * and replaces each match (or node-separated portions of the match)
 * in the specified element.
 */
window.findAndReplaceDOMText = (function () {

	var PORTION_MODE_RETAIN = 'retain';
	var PORTION_MODE_FIRST = 'first';

	var doc = document;
	var toString = {}.toString;

	function isArray(a) {
		return toString.call(a) === '[object Array]';
	}

	function escapeRegExp(s) {
		return String(s).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	}

	function exposed() {
		// Try deprecated arg signature first:
		return deprecated.apply(null, arguments) || findAndReplaceDOMText.apply(null, arguments);
	}

	function deprecated(regex, node, replacement, captureGroup, elFilter) {
		if ((node && !node.nodeType) && arguments.length <= 2) {
			return false;
		}
		var isReplacementFunction = typeof replacement === 'function';

		if (isReplacementFunction) {
			replacement = (function (original) {
				return function (portion, match) {
					return original(portion.text, match.startIndex);
				};
			}(replacement));
		}

		// Awkward support for deprecated argument signature (<0.4.0)
		var instance = findAndReplaceDOMText(node, {

			find: regex,

			wrap: isReplacementFunction ? null : replacement,
			replace: isReplacementFunction ? replacement : '$' + (captureGroup || '&'),

			prepMatch: function (m, mi) {

				// Support captureGroup (a deprecated feature)

				if (!m[0]) throw 'findAndReplaceDOMText cannot handle zero-length matches';

				if (captureGroup > 0) {
					var cg = m[captureGroup];
					m.index += m[0].indexOf(cg);
					m[0] = cg;
				}
		 
				m.endIndex = m.index + m[0].length;
				m.startIndex = m.index;
				m.index = mi;

				return m;
			},
			filterElements: elFilter
		});

		exposed.revert = function () {
			return instance.revert();
		};

		return true;
	}

	/** 
	 * findAndReplaceDOMText
	 * 
	 * Locates matches and replaces with replacementNode
	 *
	 * @param {Node} node Element or Text node to search within
	 * @param {RegExp} options.find The regular expression to match
	 * @param {String|Element} [options.wrap] A NodeName, or a Node to clone
	 * @param {String|Function} [options.replace='$&'] What to replace each match with
	 * @param {Function} [options.filterElements] A Function to be called to check whether to
	 *	process an element. (returning true = process element,
	 *	returning false = avoid element)
	 */
	function findAndReplaceDOMText(node, options) {
		return new Finder(node, options);
	}

	exposed.Finder = Finder;

	/**
	 * Finder -- encapsulates logic to find and replace.
	 */
	function Finder(node, options) {

		options.portionMode = options.portionMode || PORTION_MODE_RETAIN;

		this.node = node;
		this.options = options;

		// ENable match-preparation method to be passed as option:
		this.prepMatch = options.prepMatch || this.prepMatch;

		this.reverts = [];

		this.matches = this.search();

		if (this.matches.length) {
			this.processMatches();
		}

	}

	Finder.prototype = {

		/**
		 * Searches for all matches that comply with the instance's 'match' option
		 */
		search: function () {

			var match;
			var matchIndex = 0;
			var regex = this.options.find;
			var text = this.getAggregateText();
			var matches = [];

			regex = typeof regex === 'string' ? RegExp(escapeRegExp(regex), 'g') : regex;

			if (regex.global) {
				while (match = regex.exec(text)) {
					matches.push(this.prepMatch(match, matchIndex++));
				}
			} else {
				if (match = text.match(regex)) {
					matches.push(this.prepMatch(match, 0));
				}
			}

							                                                             if (debugLogRecursiveDOM) { console.log("search: [" + matches + "]"); }
			return matches;

		},

		/**
		 * Prepares a single match with useful meta info:
		 */
		prepMatch: function(match, matchIndex) {

			if (!match[0]) {
				throw new Error('findAndReplaceDOMText cannot handle zero-length matches');
			}
	 
			match.endIndex = match.index + match[0].length;
			match.startIndex = match.index;
			match.index = matchIndex;

							                                                             if (debugLogRecursiveDOM) { console.log("prepMatch: [" + match + "]");}
            return match;
		},

		/**
		 * Gets aggregate text within subject node
		 */
		getAggregateText: function() {

			var elementFilter = this.options.filterElements;

            var textAndInfo = getText(this.node, elementFilter);
			var textGotten = textAndInfo.textChars;
//            var textAlreadyRootColored = textAndInfo.textAlreadyRootColored;
//							                                                             if (debugLogRecursiveDOM) {console.log("getAggregateText: \n[" + textGotten + "\n " + textAlreadyRootColored + "]"); }
			return textGotten;


		},

		/** 
		 * Steps through the target node, looking for matches, and
		 * calling replaceFn when a match is found.
		 */
		processMatches: function() {

			var matches = this.matches;
			var node = this.node;
			var elementFilter = this.options.filterElements;

			var startPortion,
				endPortion,
				innerPortions = [],
				curNode = node,
				match = matches.shift(),
				atIndex = 0, // i.e. nodeAtIndex
				matchIndex = 0,
				portionIndex = 0,
				doAvoidNode,
				nodeStack = [node];

			out: while (true) {
                var alreadyGredyout=false;

               // get color change in this node
//                if (curNode && curNode.outerHTML){
//                    // verify if there is a background-color information
//                    var currentOuterHtml = curNode.outerHTML;
//                    var currentBackgroundIndex = currentOuterHtml.indexOf("<em style=\"background-color: rgb(211, 255, 230);\">");
//                    if (currentBackgroundIndex == 0){
//                        			                                                     if (debugLogRecursiveDOM) {console.log("Already greyed-out, no need to process more");}
//                    } 
//                }
//else {
                if (curNode && curNode.parentNode && (currentOuterHtml = curNode.parentNode.outerHTML)){
                    // verify if there is a background-color information
                    // var currentOuterHtml = curNode.parentNode.outerHTML;
                    var currentBackgroundIndex = currentOuterHtml.indexOf("<em style=\"background-color: rgb(211, 255, 230);\">");
                    if (currentBackgroundIndex == 0){
                        			                                                     if (debugLogRecursiveDOM) {console.log("Already greyed-out, no need to process more");}
                        alreadyGredyout = true;
                    } 
                    
//else { // this node is not already grey-out
 				if (curNode.nodeType === 3) {
				
                     
					if (!endPortion && curNode.length + atIndex >= match.endIndex) {

						// We've found the ending
						endPortion = {
							node: curNode,
							index: portionIndex++,
							text: curNode.data.substring(match.startIndex - atIndex, match.endIndex - atIndex),
							indexInMatch: atIndex - match.startIndex,
							indexInNode: match.startIndex - atIndex, // always zero for end-portions
							endIndexInNode: match.endIndex - atIndex,
							isEnd: true,
							toString:function endPortionToString() {
								var ret = "endPortion="
								+ "["  + this.node.nodeName 
								+ "-"  + this.node.nodeType
								+ "\n{\n"  + this.node.nodeValue + "\n}]"
								+ ", " + this.index
								+ ", " + this.indexInMatch
								+ ", " + this.indexInNode
								+ ", " + this.endIndexInNode
								+ ", \"" + this.text + "\""
								+ "isEnd=" + this.isEnd;
								return ret;
							} 
						};

					} else if (startPortion) {
						// Intersecting node
						innerPortions.push({
							node: curNode,
							index: portionIndex++,
							text: curNode.data,
							indexInMatch: atIndex - match.startIndex,
							indexInNode: 0 // always zero for inner-portions
						});
					}

					if (!startPortion && curNode.length + atIndex > match.startIndex) {
						// We've found the match start
						startPortion = {
							node: curNode,
							index: portionIndex++,
							indexInMatch: 0,
							indexInNode: match.startIndex - atIndex,
							endIndexInNode: match.endIndex - atIndex,
							text: curNode.data.substring(match.startIndex - atIndex, match.endIndex - atIndex),
							toString:function startPortionToString() {
								var ret = "startPortion="
								+ "["  + this.node.nodeName 
								+ "-"  + this.node.nodeType
								+ "\n{\n"  + this.node.nodeValue + "\n}]"
								+ ", " + this.index
								+ ", " + this.indexInMatch
								+ ", " + this.indexInNode
								+ ", " + this.endIndexInNode
								+ ", \"" + this.text + "\"";
								return ret;
							} 
						};
					}

					atIndex += curNode.data.length;
                }
//} // else of was it already in grey
                }// else of outerHTML

				doAvoidNode = curNode.nodeType === 1 && elementFilter && !elementFilter(curNode);

				if (startPortion && endPortion) {

                    if (!alreadyGredyout) {
                        curNode = this.replaceMatch(match, startPortion, innerPortions, endPortion);
                    }
                    
					// processMatches has to return the node that replaced the endNode
					// and then we step back so we can continue from the end of the 
					// match:

					atIndex -= (endPortion.node.data.length - endPortion.endIndexInNode);

					startPortion = null;
					endPortion = null;
					innerPortions = [];
					match = matches.shift();
					portionIndex = 0;
					matchIndex++;

					if (!match) {
						break; // no more matches
					}

				} else if (
					!doAvoidNode &&
					(curNode.firstChild || curNode.nextSibling)
				) {
					// Move down or forward:
					if (curNode.firstChild) {
						nodeStack.push(curNode);
						curNode = curNode.firstChild;
					} else {
						curNode = curNode.nextSibling;
					}
					continue;
				}

				// Move forward or up:
				while (true) {
					if (curNode.nextSibling) {
						curNode = curNode.nextSibling;
						break;
					}
					curNode = nodeStack.pop();
					if (curNode === node) {
						break out;
					}
				}

			} // out while

		}, // function

		/**
		 * Reverts ... TODO
		 */
		revert: function() {
			// Reversion occurs backwards so as to avoid nodes subsequently
			// replaced during the matching phase (a forward process):
			for (var l = this.reverts.length; l--;) {
				this.reverts[l]();
			}
			this.reverts = [];
		},

		prepareReplacementString: function(string, portion, match, matchIndex) {
			var portionMode = this.options.portionMode;
			if (
				portionMode === PORTION_MODE_FIRST &&
				portion.indexInMatch > 0
			) {
				return '';
			}
			string = string.replace(/\$(\d+|&|`|')/g, function($0, t) {
				var replacement;
				switch(t) {
					case '&':
						replacement = match[0];
						break;
					case '`':
						replacement = match.input.substring(0, match.startIndex);
						break;
					case '\'':
						replacement = match.input.substring(match.endIndex);
						break;
					default:
						replacement = match[+t];
				}
				return replacement;
			});

			if (portionMode === PORTION_MODE_FIRST) {
				return string;
			}

			if (portion.isEnd) {
				return string.substring(portion.indexInMatch);
			}

			return string.substring(portion.indexInMatch, portion.indexInMatch + portion.text.length);
		},

		getPortionReplacementNode: function(portion, match, matchIndex) {

			var replacement = this.options.replace || '$&';
			var wrapper = this.options.wrap;

			if (wrapper && wrapper.nodeType) {
				// Wrapper has been provided as a stencil-node for us to clone:
				var clone = doc.createElement('div');
				clone.innerHTML = wrapper.outerHTML || new XMLSerializer().serializeToString(wrapper);
				wrapper = clone.firstChild;
			}

			if (typeof replacement == 'function') {
				replacement = replacement(portion, match, matchIndex);
				if (replacement && replacement.nodeType) {
					return replacement;
				}
				return doc.createTextNode(String(replacement));
			}

			var el = typeof wrapper == 'string' ? doc.createElement(wrapper) : wrapper;

			replacement = doc.createTextNode(
				this.prepareReplacementString(
					replacement, portion, match, matchIndex
				)
			);

			if (!replacement.data) {
				return replacement;
			}

			if (!el) {
				return replacement;
			}

			el.appendChild(replacement);

			return el;
        },

		replaceMatch: function(match, startPortion, innerPortions, endPortion) {

			var matchStartNode = startPortion.node;
			var matchEndNode = endPortion.node;

			var preceedingTextNode;
			var followingTextNode;
            if (debugLogRecursiveDOM) {console.log("");}
						                                                                 if (debugLogRecursiveDOM) {console.log("replaceMatch........ match:" + match + "");}
						                                                                 if (debugLogRecursiveDOM) {console.log("............. startPortion:" + startPortion + "");}
						                                                                 if (debugLogRecursiveDOM) {console.log("..... innerPortions.length:" + innerPortions.length + "");}
						                                                                 if (debugLogRecursiveDOM) {console.log("............... endPortion:" + endPortion + "");}
						                                                                 if (debugLogRecursiveDOM) {console.log("---------------------------------------------------");}

			if (matchStartNode === matchEndNode) {
                
                // There is only one node to handle
                
				// Create the replacement node:
				var newNode = this.getPortionReplacementNode(
					endPortion,
					match
				);

                //check if already correct
                if (matchStartNode && matchStartNode.parentNode && (matchStartNode.parentNode.outerHTML != newNode.outerHTML))
                {

				    var node = matchStartNode;

				    if (startPortion.indexInNode > 0) {
					   // Add `before` text node (before the match)
					   preceedingTextNode = doc.createTextNode(node.data.substring(0, startPortion.indexInNode));
					   			                                                         if (debugLogRecursiveDOM) {console.log("......... un seul node1. insert >>>>" + preceedingTextNode.nodeValue  +"<<<< before startPortion");}
                        node.parentNode.insertBefore(preceedingTextNode, node);
				    }


                    			                                                         if (debugLogRecursiveDOM) {console.log("......... un seul node2. insert >>>>" + newNode.outerHTML  +"<<<< before startPortion");}
                    node.parentNode.insertBefore(newNode, node);

				    if (endPortion.endIndexInNode < node.length) { // ?????
                        // Add `after` text node (after the match)
					   followingTextNode = doc.createTextNode(node.data.substring(endPortion.endIndexInNode));
                        			                                                     if (debugLogRecursiveDOM) {console.log("......... un seul node3. insert >>>>" + followingTextNode.nodeValue  + "<<<< before startPortion");}
					   node.parentNode.insertBefore(followingTextNode, node);
				    }

				    			                                                         if (debugLogRecursiveDOM) {console.log("......... un seul node4. remove startPortion");}
				    node.parentNode.removeChild(node);

				    this.reverts.push(function() {
                        if (preceedingTextNode === newNode.previousSibling) {
                            			                                                 if (debugLogRecursiveDOM) {console.log("......... un seul node5. remove >>>>" + preceedingTextNode.nodeValue + "<<<<");}
						  preceedingTextNode.parentNode.removeChild(preceedingTextNode);
                        }
				        if (followingTextNode === newNode.nextSibling) {
                            			                                                 if (debugLogRecursiveDOM) {console.log("......... un seul node6. remove >>>>" + followingTextNode.nodeValue + "<<<<");}
				            followingTextNode.parentNode.removeChild(followingTextNode);
				        }
				        			                                                     if (debugLogRecursiveDOM) {console.log("......... un seul node7. replace startPortion by >>>>" + newNode.nodeValue + "<<<<");}
				        newNode.parentNode.replaceChild(node, newNode);
                    });

                    			                                                         if (debugLogRecursiveDOM) {console.log("---------------------------------------------------2");}
                } else {
								                                                         if (debugLogRecursiveDOM) {console.log("......... un seul node1. skip because no change needed");}
                }
                return newNode;

			} else {
				// Replace matchStartNode -> [innerMatchNodes...] -> matchEndNode (in that order)


				preceedingTextNode = doc.createTextNode(
					matchStartNode.data.substring(0, startPortion.indexInNode)
				);

				followingTextNode = doc.createTextNode(
					matchEndNode.data.substring(endPortion.endIndexInNode)
				);

				var firstNode = this.getPortionReplacementNode(
					startPortion,
					match
				);

				var innerNodes = [];

				for (var i = 0, l = innerPortions.length; i < l; ++i) {
					var portion = innerPortions[i];
					var innerNode = this.getPortionReplacementNode(
						portion,
						match
					);
								                                                         if (debugLogRecursiveDOM) {                 console.log("....... plusieurs nodes1. replace >>>>" + innerNode.outerHTML + "<<<< par >>>>" + portion.node.nodeValue + "<<<<");}
					portion.node.parentNode.replaceChild(innerNode, portion.node);
					this.reverts.push((function(portion, innerNode) {
									                                                     if (debugLogRecursiveDOM) {                 console.log("---------------------------------------------------3");}
						return function() {
										                                                 if (debugLogRecursiveDOM) {                 console.log("....... plusieurs nodes2. replace >>>>" + portion.node.nodeValue + "<<<< par >>>>" + innerNode.nodeValue + "<<<<");}
							innerNode.parentNode.replaceChild(portion.node, innerNode);
						};
					}(portion, innerNode)));
					innerNodes.push(innerNode);
				}

				var lastNode = this.getPortionReplacementNode(
					endPortion,
					match
				);

				                                                                        			                                                                             if (debugLogRecursiveDOM) {console.log("....... plusieurs nodes3. insert  >>>>" + preceedingTextNode.nodeValue + "<<<< before >>>>" + matchStartNode.nodeValue + "<<<<");}
				matchStartNode.parentNode.insertBefore(preceedingTextNode, matchStartNode);
							                                                             if (debugLogRecursiveDOM) {console.log("....... plusieurs nodes4. insert  >>>>" + firstNode.outerHTML + "<<<< before >>>>" + matchStartNode.nodeValue + "<<<<");}
				matchStartNode.parentNode.insertBefore(firstNode, matchStartNode);
							                                                             if (debugLogRecursiveDOM) {console.log("....... plusieurs nodes5. remove  >>>>" + matchStartNode.nodeValue + "<<<<");}
				matchStartNode.parentNode.removeChild(matchStartNode);

							                                                             if (debugLogRecursiveDOM) {console.log("....... plusieurs nodes6. insert  >>>>" + lastNode.outerHTML + "<<<< before >>>>" + matchEndNode.nodeValue + "<<<<");}
				matchEndNode.parentNode.insertBefore(lastNode, matchEndNode);
							                                                             if (debugLogRecursiveDOM) {console.log("....... plusieurs nodes7. insert  >>>>" + followingTextNode.nodeValue + "<<<< before >>>>" + matchEndNode.nodeValue + "<<<<");}
				matchEndNode.parentNode.insertBefore(followingTextNode, matchEndNode);
							                                                             if (debugLogRecursiveDOM) {console.log("....... plusieurs nodes8. remove  >>>>" + matchEndNode.nodeValue + "<<<<");}
				matchEndNode.parentNode.removeChild(matchEndNode);

				this.reverts.push(function() {
							                                                             if (debugLogRecursiveDOM) {console.log("....... plusieurs nodes9. remove  >>>>" + preceedingTextNode.nodeValue + "<<<<");}
					preceedingTextNode.parentNode.removeChild(preceedingTextNode);
							                                                             if (debugLogRecursiveDOM) {console.log("....... plusieurs nodesA. replace >>>>" + matchStartNode.nodeValue + "<<<< by >>>>" + firstNode.nodeValue + "<<<<");}
					firstNode.parentNode.replaceChild(matchStartNode, firstNode);
							                                                             if (debugLogRecursiveDOM) {console.log("....... plusieurs nodesB. remove  >>>>" + followingTextNode.nodeValue + "<<<<");}
					followingTextNode.parentNode.removeChild(followingTextNode);
							                                                             if (debugLogRecursiveDOM) {console.log("....... plusieurs nodesC. replace >>>>" + matchEndNode.nodeValue + "<<<< by >>>>" + lastNode.nodeValue + "<<<<");}
					lastNode.parentNode.replaceChild(matchEndNode, lastNode);
				});

							                                                             if (debugLogRecursiveDOM) {console.log("--------------------------------------------------4");}
				return lastNode;
			}
			                                                                             			                                                                             			                                                                             if (debugLogRecursiveDOM) {console.log("---------------------------------------------------5");}
		}

	};

	return exposed;

}());