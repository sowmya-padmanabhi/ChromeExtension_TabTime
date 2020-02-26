# ChromeExtension_TabTime
  
## Description:
A Chrome Extension that keeps track of the tabs currently open in the active browser window and displays the total time spent by a user on each tab in a list view.

### Assumptions:
1. Duration calculated for a tab is based on the website(URL) the user is currently on. If the user opens another website(URL) in the same tab, the time restarts to track the duration for that particular website(URL). However, it is easy to extend the code to support longer durations like days.

2. If a website(URL) does not have a logo, a default logo (image-not-found) is used ![Image-not-found](/images/imageNotFoundLogoForReadME.png) 
   
3. If the url takes long to load, the extension would not have recognized the logo (tabs.favIconUrl) yet, and it'll again fallback to the default logo provided. However, after the url is completely loaded, reopening the extension will show the updates logo for that url.

4. Duration of a tab/URL shows up to a maximum of 24 hours and then restarts from 0.

5. Based on the use-case, one can either choose storage.sync or storage.local to store and retrieve tab details. In the current extension, I decided to use chrome.storage.sync because, this way, the extension can be used across multiple machines as long as the user is logged in.

   * chrome.storage.sync -stores the data in any chrome browser that the user is logged in, that is, the data is synced. When the user goes offline, chrome saves data locally and the next time the user is online, the data is synced. 
   
   * chrome.storage.local - data stored is local to each machine

6. Clicking on a list item will navigate to that tab and the timer will resume for that tab.

7. Note: When the extension is newly added, the extension does not recognize already opened tabs until the tabs are "activated" by navigating to them. However, the indexes will still be maintained in the list once made active.

#### Technologies used:
* HTML
* CSS
* JavaScript
* jQuery

## Instructions for Installation
1. Clone/Download the zip file from the [GitHub link](https://github.com/sowmya-padmanabhi/ChromeExtension_TabTime)
2. Unzip folder in your desired location. The working project directory is inside this initial folder.
3. In your browser, open Extension Management page by navigating to ```chrome://extensions``` and enable Developer Mode
4. Click on Load Unpacked and choose the unzipped directory

Your extension should now be added and you should be able to see the icon 
![TabTimer Logo](/images/timerLogoForReadME.png) 

#### Demo video of Tab Time Extension
![image](/images/TabTimerDemoGif.gif)
