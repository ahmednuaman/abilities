/*
description: A test to see whether it is more performant to reuse an XHR object or create a new one per request
type: benchmark
*/

function sendRequest(req,url,callback,postData) {
    // var req = createXMLHTTPObject();
    if (!req) return;
    var method = (postData) ? "POST" : "GET";
    req.open(method,url,true);
    // req.setRequestHeader('User-Agent','XMLHTTP/1.0');
    if (postData)
        req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    req.onreadystatechange = function () {
        if (req.readyState != 4) return;
        if (req.status != 200 && req.status != 304) {
//          alert('HTTP error ' + req.status);
            return;
        }
        callback(req);
    }
    if (req.readyState == 4) return;
    req.send(postData);
}

var XMLHttpFactories = [
    function () {return new XMLHttpRequest()},
    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

function createXMLHTTPObject() {
    var xmlhttp = false;
    for (var i=0;i<XMLHttpFactories.length;i++) {
        try {
            xmlhttp = XMLHttpFactories[i]();
        }
        catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}

var singleXHR = createXMLHTTPObject();

suite
.add('network-xhr#single-get', {
    defer: true,
    fn: function(dfd)
    {
        var callback = function () {
            dfd.resolve();
        };

        sendRequest(singleXHR, 'mock/data.json?x=' + (new Date()).getTime(), callback);
    }
})
.add('network-xhr#single-post', {
    defer: true,
    fn: function(dfd)
    {
        var callback = function () {
            dfd.resolve();
        };

        sendRequest(singleXHR, 'mock/data.json?x=' + (new Date()).getTime(), callback, 'foo=bar&bar=foo');
    }
})
.add('network-xhr#multiple-get', {
    defer: true,
    fn: function(dfd)
    {
        var callback = function () {
            dfd.resolve();
        };
        var xhr = createXMLHTTPObject();

        sendRequest(xhr, 'mock/data.json?x=' + (new Date()).getTime(), callback);
    }
})
.add('network-xhr#multiple-post', {
    defer: true,
    fn: function(dfd)
    {
        var callback = function () {
            dfd.resolve();
        };
        var xhr = createXMLHTTPObject();

        sendRequest(xhr, 'mock/data.json?x=' + (new Date()).getTime(), callback, 'foo=bar&bar=foo');
    }
})
.run({
    async: true
});