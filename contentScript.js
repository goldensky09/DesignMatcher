import {
  setInStorage,
  exportJSON,
  addResponsive,
  extractStyle,
  exportMobileStyle
} from "./utils/utils";


const main = () => {
  let stylesList = extractStyle(document, "siteStyles");
  !document.getElementById("designMatcher") && fetch(chrome.extension.getURL('/popup.html'))
    .then(response => response.text())
    .then(data => {
        document.body.innerHTML += data;
        document.getElementById("exportJSON").addEventListener("click", function(){
          exportJSON(localStorage.getItem("siteStyles"));
        });
        document.getElementById("handleSlide").addEventListener("click", function(){
          document.getElementById("designMatcher").classList.toggle("active");
        });
        document.getElementById("addResponsive").addEventListener("click", function(){
          addResponsive();
        });
        document.getElementById("downnloadMobileStyle").addEventListener("click", function(){
          exportMobileStyle();
        }); 
    }).catch(err => {
    });
  setInStorage("siteStyles", stylesList);
}

main();
