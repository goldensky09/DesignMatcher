chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.executeScript({
      file: 'dist/contentScript.js'
  });
});