import MD5 from "md5";
import {
  getTypoGraphyStyle,
  setInStorage,
  getTypographyHTML,
  handeler
} from "./utils/utils";

const main = () => {
  let nodeList = [...document.querySelectorAll("body *:not(script)")];
  let textNodeList = nodeList.filter(el => el.text && el.text.trim().length ? true : false);
  let stylesList = JSON.parse(localStorage.getItem("siteStyles")) || {};
  let pageStylesList = {};
  let typography = "";
  let stylesListProxy = new Proxy(stylesList, handeler);
  let pageStylesListProxy = new Proxy(pageStylesList, handeler);

  textNodeList.forEach(el => {
    let styles = getComputedStyle(el);
    let elTagName = el.tagName.toLowerCase();
    let elId = el.id.length ? "#" + el.id : "";
    let elClasses = el.className.length ? "." + el.className.replace(/ /g, ".") : "";
    let selector = elTagName + elId + elClasses;
    const filtered = getTypoGraphyStyle(styles);
    let key = MD5(unescape(encodeURIComponent(JSON.stringify(filtered))));
    stylesListProxy[key] = [filtered, selector, elTagName];
    pageStylesListProxy[key] = [filtered, selector, elTagName]
    typography += getTypographyHTML(key, filtered.fontFamily, filtered.fontSize);
  });

  chrome.storage.local.set({typography: typography});

  fetch(chrome.extension.getURL('/popup.html'))
    .then(response => response.text())
    .then(data => {
        document.body.innerHTML += data;
    }).catch(err => {
    });
  
  setInStorage("siteStyles", stylesList);
  setInStorage("pageStyles", pageStylesList);
}

main();
