let prevTabId = null;
var key;

//Function is called every 1 second	
//For the current tab, shows how much time has elapsed as this is increasing every 1 second when on active tab
setInterval(function(){
  if (key) {
    chrome.storage.sync.get([key], function(value) {
      // console.log('what is key ' + value[key].title);
      console.log('Time spent on current tab '+value[key].title+' : '+(value[key].duration + (new Date() - new Date(value[key].start_time))));
    });
  }
}, 1000);

chrome.tabs.onActivated.addListener(function(activeInfo){
  //reset duration whenever a new tab is activated

  //fetch tab url using activeInfo.tabId
  chrome.tabs.get(activeInfo.tabId, function(tab){
      // if prevTabId is not null, calculate the duration of that tab before moving on the currently activated tab
      if (prevTabId != null) {
          let prev_key = prevTabId;
          console.log('Previous Tab ID: '+prev_key)
          chrome.storage.sync.get([prev_key], function(prevTab) {
            if (prevTab[prev_key]) {
              //update duration. Add to existing value of duration
              prevTab[prev_key].duration += new Date() - new Date(prevTab[prev_key].start_time);
              console.log('Previous Tab ID: '+prev_key+' duration updated to '+prevTab[prev_key].duration)
              chrome.storage.sync.set({[prev_key]: prevTab[prev_key]}, function() {
                console.log('Previous Tab ID '+prev_key+' : ' + prevTab[prev_key].title+' updated');
              });
            }
          });
      }

      key = String(tab.id)
      prevTabId = key
      chrome.storage.sync.get([key], function(value) {
        if (value[key] !== undefined) {
          //This tab had previously been opened
          value[key].favIconUrl = tab.favIconUrl ? tab.favIconUrl : "noImageFound.png";
          console.log('Tab '+key+' : '+value[key].title+' previously existed')
          value[key].start_time = (new Date()).toJSON()
          console.log('Tab '+key+' start timestamp is set to: '+value[key].start_time)
          chrome.storage.sync.set({ [key]: value[key] }, function() {
            console.log('Key '+key+' value stored in chrome storage');
          });

        } else {
          console.log('Tab '+key+' being opened for the first time')
          value[key] = { 
            'index': tab.index,
            'favIconUrl': tab.favIconUrl ? tab.favIconUrl : "noImageFound.png",
            'start_time': (new Date()).toJSON(),
            duration: 0
          }
          chrome.storage.sync.set({ [key]: value[key] }, function() {
            console.log('Key '+key+' value, title: '+tab.title+' stored in storage');
          });
        }
      });
  });
});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  key = String(tab.id);
  if(tab.status == 'complete'){
    let newHostname = new URL(tab.url).hostname;
    chrome.storage.sync.get([key], function(value) {
      let oldHostname = value[key].url ? new URL(value[key].url).hostname : undefined;
      //update only if hostnames are different and start
      if (newHostname !== oldHostname) {
        console.log('New url in the same tab opened: ' + tab.url);
        value[key].start_time = (new Date()).toJSON(); 
        value[key].duration = 0;
        value[key].favIconUrl = tab.favIconUrl ? tab.favIconUrl : "noImageFound.png";
        chrome.storage.sync.set({ [key]: value[key] }, function() {
          console.log('Key '+key+' value, title: '+tab.title+' stored in storage');
        });
      }
    });
  }
});


chrome.tabs.onRemoved.addListener((tabId, deletedTab)=>{
  console.log(`Tab index: ${tabId} is closing. ${deletedTab} is now deleted`);
  key = String(tabId);
  chrome.storage.sync.remove([key], function() {
      console.log('Removed tab id '+key+' from storage');
  });
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