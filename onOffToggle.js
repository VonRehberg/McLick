chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.local.get(['mouseClickActive'], function(result) {
    toggle = !result.mouseClickActive;
    if(toggle){
      chrome.browserAction.setIcon({path: "on.png"});
      chrome.tabs.executeScript(tab.id, {code:"ext_on()"});
    }
    else{
      chrome.browserAction.setIcon({path: "off.png"});
      chrome.tabs.executeScript(tab.id, {code:"ext_off()"});
    }
    chrome.storage.local.set({mouseClickActive: toggle}, function() {
      console.log('Mouse highlighter toggled');
    });
  });
});

chrome.storage.local.get(['mouseClickActive'], function(result) {
  if (result.mouseClickActive) {
    chrome.browserAction.setIcon({path: "on.png"});
  } else {
    chrome.browserAction.setIcon({path: "off.png"});
  }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.executeScript(activeInfo.tabId, {code:"setMouseCursorFromStorage()"});
});
