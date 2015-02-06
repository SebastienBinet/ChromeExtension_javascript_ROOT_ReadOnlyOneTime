if(1) console.log("0&  " + getTimeNow() + "ms");
function getTimeNow() {
    return  (new Date()).getTime() % 65536;

}

var ROOT_HIGHLIGHT = "2px solid rgba(211, 255, 230,0.2)"
var ROOT_BACKGROUND_COLOR = "rgba(185, 200, 200, 0.2)";
//var ROOT_BACKGROUND_COLOR = "rgb(185, 200, 200)"


function greyAllElements() {
    // works: log (1 seule fois) tout le text qu'il y a d'affiché
    if(0) console.log("<br>" + $("body *").not("script").text());
    
    
    
    if(0) console.log("<br>================================");
    
}
    


function getAllUsefulElements() {
//    var all = $("body *").not("script").text();
//    console.log("all = " + all);
    var all = $("body *").not("script");
    for (i = 0; i< all.length; i++) {
        var element_i = all[i];
        var text_element_i = element_i.innerText;
        if(0) console.log(">>>[" + i + "] = " + element_i + ":" + text_element_i + "<<<");
    }
    return all;
}


function setElementWithRootStyle( el ) {
    el.style.backgroundColor = ROOT_BACKGROUND_COLOR;
    el.style.borderRadius = "25px";
}
