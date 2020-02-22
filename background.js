chrome.tabs.onActivated.addListener(function(activeInfo){
    //fetch tab url using activeInfo.tabId
    chrome.tabs.get(activeInfo.tabId, function(tab){
        console.log(tab.favIconUrl);
        console.log(tab.title);
    });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(tab.status == 'complete' && tab.url!= undefined){
    console.log("tab load complete", tab.url);
  }
});

chrome.tabs.onRemoved.addListener((tabId, deletedTab)=>{
  console.log(`Tab index: ${tabId} is closing. ${deletedTab} is now deleted`);
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'developer.chrome.com'},
    })
    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});