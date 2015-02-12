

// function getPosInfo() returns the position of the element
// from http://javascript.info/tutorial/coordinates

function getPosInfo(elem) {
    if (elem.getBoundingClientRect) {
        return getOffsetRect(elem)
    } else {
        return getOffsetSum(elem)
    }
}



function getOffsetSum(elem) {
  var top=0, left=0, right=0, bottom=0
  while(elem) {
    top = top + parseInt(elem.offsetTop)
    left = left + parseInt(elem.offsetLeft)
    elem = elem.offsetParent        
  }
  right = left + (elem.clientWidth ? elem.clientWidth : 0)
  bottom = top + (elem.clientHeight ? elem.clientHeight : 0)
   
  return {top: top, left: left, right: right, bottom: bottom}
}


function getOffsetRect(elem) {
    var box = elem.getBoundingClientRect()
    
    var body = document.body
    var docElem = document.documentElement
    
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
    
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0
    
    var top    = box.top +  scrollTop - clientTop
    var left   = box.left + scrollLeft - clientLeft
//    var right  = left +  (elem.clientWidth ? elem.clientWidth : 0)
    var right  = left +  (box.width ? box.width : 0)
//    var bottom = top  +  (elem.clientHeight ? elem.clientHeight : 0)
    var bottom = top  +  (box.height ? box.height : 0)
    
    return { top: Math.round(top), left: Math.round(left),  right: Math.round(right), bottom: Math.round(bottom)}
}


