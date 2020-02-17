'use strict';

// let readStyles = document.getElementById('readStyles');

// readStyles.onclick = function(element) {

// }
document.addEventListener("DOMContentLoaded", function (e) {
  
  chrome.tabs.executeScript({
    file: 'dist/contentScript.js'
  }, function () {
    // chrome.storage.local.get("typography", function (typographyHTML) {
    //   console.log("length",typographyHTML.typography.length, typographyHTML, document.getElementById("typography"));
    //   if(typographyHTML.length) {
    //     document.getElementById("typography").innerHTML(typographyHTML.typography);
    //   }
    // });(
      
    document.getElementById("handleSlide").addEventListener("click", function(){
      console.log("hellooo");
      document.getElementById("designMatcher").classList.toggle("active");
    });
    
    document.getElementById("exportJSON").addEventListener("click", function () {
      var data = "";
      // var data = JSON.parse(localStorage.getItem("siteStyles"));
      chrome.storage.local.get(["siteStyles"], function (siteStyles) {
        data = siteStyles;
        console.log(siteStyles);
        if (!data) {
          console.error('exportJSON : No data')
          return;
        }
  
        var filename = 'siteStyles.json'
  
        if (typeof data === "object") {
          data = JSON.stringify(data, undefined, 4)
        }
  
        var blob = new Blob([data], { type: 'text/json' }),
          e = document.createEvent('MouseEvents'),
          a = document.createElement('a')
  
        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
      });
      
    })
  });
  // alert(localStorage.getItem("pageStyles"));
  // console.log(localStorage.getItem("pageStyles"));
});