//function updateBackground(color) {
//	document.getElementsByTagName('body')[0].style.backgroundColor = '#'+color
//    document.getElementById('RootColorId').value = "yellow";
//}
//var color1='009687', color2='191C26'
//
//function updateGradient() {
//	document.getElementById('gradient').style.background =
//		"url('gradient/x"+color1.toUpperCase()+"-378-"+color2.toUpperCase()+".png?tmp') center top repeat-x"
//}

var OPTIONS_PERIOD_MS = 200;
var currentConfigFromStorage = null;

// Saves options to chrome.storage
function save_options() {
  var likesColor = document.getElementById('likeId').checked;
  var RootColor = document.getElementById('RootColorId').value;
  var RootNbWordMatch = document.getElementById('RootNbWordMatchId').value;
  var RootGreyMode = document.getElementById('RootGreyModeId').value;
  var RootSelectionMode = document.getElementById('RootSelectionModeId').value;
  var RootVisualFeedback = document.getElementById('RootVisualFeedbackId').value;
  chrome.storage.sync.set({
    likesColor: likesColor,
    RootColor: RootColor,
    RootNbWordMatch: RootNbWordMatch,
    RootGreyMode: RootGreyMode,
    RootSelectionMode: RootSelectionMode,
    RootVisualFeedback: RootVisualFeedback
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
//    document.getElementsByTagName('body').style.backgroundColor = RootColor;
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color in case the storage is not accessible.
  chrome.storage.sync.get({
    likesColor: true,
    RootColor: 'silver',
    RootNbWordMatch: '4',
    RootGreyMode: 'Background Single Solid Color',
    RootSelectionMode: 'Every Element Completely At Left And Above The Current Mouse Position In The Document',
    RootVisualFeedback: 'none'
 }, function(items) {
    document.getElementById('likeId').checked = items.likesColor;
    document.getElementById('RootColorId').value = items.RootColor;
    document.getElementById('RootNbWordMatchId').value = items.RootNbWordMatch;
    document.getElementById('RootGreyModeId').value = items.RootGreyMode;
    document.getElementById('RootSelectionModeId').value = items.RootSelectionMode;
    document.getElementById('RootVisualFeedbackId').value = items.RootVisualFeedback;
    currentConfigFromStorage = items;
  });
}

function read_current_options() {
  // Use default value color in case the storage is not accessible.
  chrome.storage.sync.get({
    likesColor: true,
    RootColor: 'grey',
    RootNbWordMatch: '4',
    RootGreyMode: 'Background Single Solid Color',
    RootSelectionMode: 'Every Element Completely At Left And Above The Current Mouse Position In The Document',
    RootVisualFeedback: 'none'
 }, function(items) {
    currentConfigFromStorage = items;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

// periodic code

var i_i=0;
function autoReschedulingPeriodic() {
    read_current_options();
    
    // current
    var elForValueFromStorage = document.getElementById('RootColorIdFromStorage');
    setElementWithRootStyleUsefulTextDirectly(elForValueFromStorage, currentConfigFromStorage);
//    if ((elForValueFromStorage != null) && (currentConfigFromStorage != null)) {
//        elForValueFromStorage.style.backgroundColor = currentConfigFromStorage.RootColor;      //marche
//    }
//    
//    //new
    var elForNewValue = document.getElementById('RootColorIdNew');
    var newMode = document.getElementById('RootGreyModeId').value;
    var newColor = document.getElementById('RootColorId').value;
    setElementWithThisStyle(elForNewValue, newMode, newColor);
    if (elForNewValue != null) {
//        elForNewValue.style.backgroundColor = document.getElementById('RootColorId').value;
        elForNewValue.textContent = "new" + i_i++;
    }
    setTimeout(autoReschedulingPeriodic, OPTIONS_PERIOD_MS);
}

autoReschedulingPeriodic();
