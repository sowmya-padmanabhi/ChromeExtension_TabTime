chrome.tabs.query({}, function(tabs){
    for (var tab in tabs) {
        let key = String(tabs[tab].id);
        let image = tabs[tab].favIconUrl;
        let url = tabs[tab].url;    
        chrome.storage.sync.get([key], function(value) {
            if (value[key]) {
                $('#tabs_table ul').append('<li><a href="'+url+'" target="_blank">'+(parseInt(value[key].index)+1)+'  | <image src="'+image+'" alt="New Tab" height="20"> |  '+value[key].duration+'</a></li>')
            }
        });
    }
});