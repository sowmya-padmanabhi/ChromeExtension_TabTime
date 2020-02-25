function addTimer(value) {
    if (value) {
        //Start from beginning of time to get accurate time
        d = new Date(null);
        d.setMilliseconds(value.duration + (new Date() - new Date(value.start_time)));
        displayValue = d.toISOString().substr(11,8);
        //Assumption: shows max upto 24 hours. then restarts from 0
        a = $('#active_item').text(displayValue);
    }
}

chrome.tabs.query({}, function(tabs){
    let active_key;
    let tabIds = Object();
    for (var tab in tabs) {
        let key = String(tabs[tab].id);
        tabIds[(tabs[tab].index)+1] = key;
        if (tabs[tab].active) {
            active_key = key;
        }
    }

    chrome.storage.sync.get(Object.values(tabIds), function(value) {
       Object.keys(tabIds).sort((n1,n2)=>n1-n2).forEach(tabIndex => {
            d = new Date(null);
            key = (tabIds[tabIndex]);
            if (value[key]) {
                let image = value[key].favIconUrl;
                if (key === active_key) {
                    d.setMilliseconds(value[key].duration + (new Date() - new Date(value[key].start_time)));
                    displayValue = d.toISOString().substr(11,8);
                    $('#tabs_table ul').append('<li><a href="#" target="_blank">'+ (parseInt(tabIndex))+'  <image src="'+image+'" height="20"> '+'<div id="active_item" text-align:"right" >'+displayValue+'</div></a></li>')
                    setInterval(addTimer, 1000, value[key]);

                } else {
                    d.setMilliseconds(value[key].duration);
                    displayValue = d.toISOString().substr(11,8);
                    $('#tabs_table ul').append('<li><a href="#" target="_blank">'+(parseInt(tabIndex))+'  <image src="'+image+'" height="20">'+displayValue+'</a></li>')
                }
            }
        });
    });
});