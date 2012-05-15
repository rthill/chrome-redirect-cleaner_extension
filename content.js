//
//
function checkRedirect(url) {
    var objPattern = /(?:^(?:javascript)|[?&=](?:www)|[/?&=*+-](?:ftp|http|https)|[?&=~](?:ZnRw|aHR0c))/i;
    if(!objPattern.test(url)) {
        return url;
    }
        		
    /* subscribe */
    var objPattern = /(?:subscribe|login|logout|register|signin|signout|signon|signoff|signup)/i;
    if(objPattern.test(url)) {
        return url;
    }
        		
    /* javascript */
    var objPattern = /^(?:javascript).*(?:[']((?:ftp|http|https)\:\/\/[^']*)[']|["]((?:ftp|http|https)\:\/\/[^"]*)["])/i;
    var arrMatches = objPattern.exec(url);
    if(arrMatches) {
        var value = (arrMatches[1] || arrMatches[2]);
        console.log("NOK: " + url + "  >>>>  " + value);
    	return value;
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
        return "http://" + value;
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
        return value;
    }
        		
    /* http */
    var objPattern = /[?&=*+-](?:((?:ftp|http|https)(?:%3A)[^?&;]*[?][^?]*)$|((?:ftp|http|https)(?:%3A)[^?&;]*))/i;
    var arrMatches = objPattern.exec(url);
    if(arrMatches) {
        var value = (arrMatches[1] || arrMatches[2]);
        console.log("NOK: " + url + "  >>>>  " + decodeURIComponent(value));
        return decodeURIComponent(value);
    }
    		
    /* http */
    var objPattern = /[?&=*+-](?:((?:ftp|http|https)(?:%253A)[^?&;]*[?][^?]*)$|((?:ftp|http|https)(?:%253A)[^?&;]*))/i;
    var arrMatches = objPattern.exec(url);
    if(arrMatches) {
        var value = (arrMatches[1] || arrMatches[2]);
        console.log("NOK: " + url + "  >>>>  " + decodeURIComponent(decodeURIComponent(value)));
        return decodeURIComponent(decodeURIComponent(value));
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
            return value;
        } catch(e) {
        }
    }
    return url;
};

var links = document.querySelectorAll("a");
for (var i  = 0; i < links.length; ++i) {
	//var text = links[i].textContent;
	var link = links[i].href;
	links[i].href = checkRedirect(link);
}

