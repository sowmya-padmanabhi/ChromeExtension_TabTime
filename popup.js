chrome.tabs.query({}, function(tabs){
    for (var tab in tabs) {
        let key = String(tabs[tab].id);
        chrome.storage.sync.get([key], function(value) {
            if (value[key]) {
                $('#tabs_table ul').append('<li><a href="#">'+value[key].index+'  | TAB LOGO |  '+value[key].duration+'</a></li>')
            }
        });
    }
});