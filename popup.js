'use strict';

// let readStyles = document.getElementById('readStyles');

// readStyles.onclick = function(element) {

// }
document.addEventListener("DOMContentLoaded", function (e) {
  chrome.tabs.executeScript({
    file: 'c1ontentScript123.js'
  }, function () {
    chrome.storage.local.get("typography", function (typographyHTML) {
      console.log("length",typographyHTML.typography.length, typographyHTML, document.getElementById("typography"));
      if(typographyHTML.length) {
        document.getElementById("typography").innerHTML(typographyHTML.typography);
      }
    });
  });
  // alert(localStorage.getItem("pageStyles"));
  console.log(localStorage.getItem("pageStyles"));
});