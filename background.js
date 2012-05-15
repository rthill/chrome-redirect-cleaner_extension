//
//
//
//
// Default disabled, but gets enable by onload extension
var state = 0;
function updateIcon() {
    if (state == 1){
        chrome.browserAction.setIcon({path:"icon_off.png"});
        state = 0;
    } else {
        chrome.browserAction.setIcon({path:"icon.png"});
        state = 1;
    }
};
var filter = {
    urls: [ "<all_urls>" ]
};
var opt_extraInfoSpec = ['blocking'];

handler = function(details) {
    if (state==0){return};
    url = details.url;
    /* check */
    var objPattern = /(?:^(?:javascript)|[?&=](?:www)|[/?&=*+-](?:ftp|http|https)|[?&=~](?:ZnRw|aHR0c))/i;
    if(!objPattern.test(url)) {
        return
    }
        		
    /* subscribe */
    var objPattern = /(?:subscribe|login|logout|register|signin|signout|signon|signoff|signup)/i;
    if(objPattern.test(url)) {
        return
    }
        		
    /* javascript */
    var objPattern = /^(?:javascript).*(?:[']((?:ftp|http|https)\:\/\/[^']*)[']|["]((?:ftp|http|https)\:\/\/[^"]*)["])/i;
    var arrMatches = objPattern.exec(url);
    if(arrMatches) {
        var value = (arrMatches[1] || arrMatches[2]);
        console.log("NOK: " + url + "  >>>>  " + value);
    	//return value;
    	return {"redirectUrl": value};
    }
		
    /* www */
	var objPattern = /[?&=](?:((?:www)[.][^?&;]*[?][^?]*)$|((?:www)[.][^?&;]*))/i;
    var arrMatches = objPattern.exec(url);
    if(arrMatches) {
        var value = (arrMatches[1] || arrMatches[2]);
        if(value.match(/(?:%25|%2F|%3F|%26|%3D)/i)) {
            value = decodeURIComponent(value);
        }
        console.log("NOK: http://" + url + "  >>>>  " + value);
        //		return "http://" + value;
        return {"redirectUrl": "http://" + value};
    }
		
    /* http */
    var objPattern = /[/?&=*+-](?:((?:ftp|http|https)[:][^?&;]*[?][^?]*)$|((?:ftp|http|https)[:][^?&;]*))/i;
    var arrMatches = objPattern.exec(url);
    if(arrMatches) {
        var value = (arrMatches[1] || arrMatches[2]);
        if(value.match(/(?:%25|%2F|%3F|%26|%3D)/i)) {
            value = decodeURIComponent(value);
        }
        console.log("NOK: " + url + "  >>>>  " + value);
        return {"redirectUrl": value};
    }
        		
    /* http */
    var objPattern = /[?&=*+-](?:((?:ftp|http|https)(?:%3A)[^?&;]*[?][^?]*)$|((?:ftp|http|https)(?:%3A)[^?&;]*))/i;
    var arrMatches = objPattern.exec(url);
    if(arrMatches) {
        var value = (arrMatches[1] || arrMatches[2]);
        console.log("NOK: " + url + "  >>>>  " + decodeURIComponent(value));
        return {"redirectUrl": decodeURIComponent(value)};
    }
    		
    /* http */
    var objPattern = /[?&=*+-](?:((?:ftp|http|https)(?:%253A)[^?&;]*[?][^?]*)$|((?:ftp|http|https)(?:%253A)[^?&;]*))/i;
    var arrMatches = objPattern.exec(url);
    if(arrMatches) {
        var value = (arrMatches[1] || arrMatches[2]);
        console.log("NOK: " + url + "  >>>>  " + decodeURIComponent(decodeURIComponent(value)));
        return {"redirectUrl": decodeURIComponent(decodeURIComponent(value))};
    }
        		
    /* base64 */
    var objPattern = /[?&=~]((?:ZnRw|aHR0c)[^?&;~]*)/i;
    var arrMatches = objPattern.exec(url);
    if(arrMatches) {
        try {
            var value = atob(decodeURIComponent(arrMatches[1]));
            if(value.match(/(?:%25|%2F|%3F|%26|%3D)/i)) {
                value = decodeURIComponent(value);
            }
            console.log("NOK: " + url + "  >>>>  " + value);
            return {"redirectUrl": value};
        } catch(e) {
        }
    }
    return {"redirectUrl": url};
};


chrome.browserAction.onClicked.addListener(updateIcon);
updateIcon();

chrome.webRequest.onBeforeRequest.addListener(handler, filter, opt_extraInfoSpec);
