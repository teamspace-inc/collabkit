console.log('This is the background page.');
console.log('Put the background scripts here.');
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow:true},
     function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, 
            {"message": "clicked_browser_action"}
        );
        console.log("works");
  });
});
