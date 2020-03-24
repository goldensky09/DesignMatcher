import MD5 from "md5";

const hex = x => ("0" + parseInt(x).toString(16)).slice(-2);

const rgb2hex = rgb => {
    if (/^#[0-9A-F]{6}$/i.test(rgb)) {
        return rgb;
    }
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

const getTypoGraphyStyle = styles => {
    return  {
      fontFamily: styles.fontFamily,
      fontSize: styles.fontSize,
      color: rgb2hex(styles.color),
      lineHeight: styles.lineHeight,
      fontWeight: styles.fontWeight
    }
}

const setInStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
    chrome.storage.local.set({key: JSON.stringify(val)}, function() {
        console.log('Value is set to ' + JSON.stringify(val));
      });
    // console.log(val);
}

const getTypographyHTML = (key, fontFamily, fontSize) => {
    return `<div id='${key}'>
        <span style='font-family:${fontFamily}; font-size: ${fontSize}'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
    </div>`;
}

const styleValidator = {
    set: function(obj, prop, value) {
        const getUsage = (val) => {
            if (obj[prop] === undefined) {
                return [val]
            } 
            return (obj[prop].usage.indexOf(val) === -1 ) ? [...obj[prop].usage, val] : obj[prop].usage;  
        }
        obj[prop] = {
            styles : value[0],
            usage : getUsage(value[1]), 
            id : prop,
            type : value[2]
        }
        return true;
    }
}

const getFormattedStyle = style => {
    let res = [];
    for (let i in style)  {
        let item = style[i];
        let obj = {
            styles : item.styles,
            usage : item.usage,
            type : item.usage[0].split(".")[0],
            id : i
        }
        res.push(obj);
    }
    return res;
}

const exportJSON = (data, filename) => {

    if(!data) {
        console.error('exportJSON : No data')
        return;
    }

    if(!filename) filename = 'siteStyles.json'

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
 }

 const addResponsive = () => {
     const _url = "https://www.gsam.com/content/gsam/us/en/institutions/homepage.html";
     document.querySelector("#disclaimerId").innerHTML = "<iframe id='gsamFrame' src='"+_url+"' width='440px' height='600px'></iframe>"
     //document.body.appendChild()

    //  const gsamFrame = document.createElement("iframe");
    //  gsamFrame.id = "gsamFrame";
    //  gsamFrame.setAttribute("name", "gsamFrame");
    //  gsamFrame.src = "";


 }

 const extractStyle = (root, storageKey) => {
    let nodeList = [...root.querySelectorAll("body *:not(script)")];
    let textNodeList = nodeList.filter(el => el.text && el.text.trim().length ? true : false);
    let stylesList = JSON.parse(localStorage.getItem(storageKey)) || {};
    let stylesListProxy = new Proxy(stylesList, styleValidator);

    textNodeList.forEach(el => {
        let styles = getComputedStyle(el);
        let elTagName = el.tagName.toLowerCase();
        let elId = el.id.length ? "#" + el.id : "";
        let elClasses = el.className.length ? "." + el.className.replace(/ /g, ".") : "";
        let selector = elTagName + elId + elClasses;
        const filtered = getTypoGraphyStyle(styles);
        let key = MD5(unescape(encodeURIComponent(JSON.stringify(filtered))));
        stylesListProxy[key] = [filtered, selector, elTagName];
    });
    return stylesList;
 }

 const exportMobileStyle = () => {
     let frame = document.querySelector("#gsamFrame");
     let frameDom = frame.contentDocument;
     let style = extractStyle(frameDom, "frameStle");
     exportJSON(style, "mobileStyle");
 }

export  {
    setInStorage,
    exportJSON,
    addResponsive,
    extractStyle,
    exportMobileStyle
}