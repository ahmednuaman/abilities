/*
description: A test case to see how fast it is to load and render Handlbars templates via AJAX
type: benchmark
*/

helpers.loadScript('assets/js/vendor/handlebars.js');

var data = {
    entries: [1, 2, 3, 4, 5, 6, 7]
};

function sendRequest(url, callback) {
    var req = createXMLHTTPObject();
    if (!req) return;
    var postData = arguments[2];
    var method = (postData) ? "POST" : "GET";
    req.open(method,url,true);
    if (postData)
        req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    req.onreadystatechange = function () {
        if (req.readyState != 4) return;
        if (req.status != 200 && req.status != 304) {
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

suite
.on('cycle', function()
{
    // clear the dump area
    dumpArea.innerHTML = '';
})
.add('handlebars#ajax', {
    defer: true,
    fn: function(dfd)
    {
        sendRequest('mock/dom-template-handlebars-ajax.html?x=' + (new Date()).getTime(), function (xhr) {
            var template = Handlebars.compile(xhr.responseText);

            dumpArea.innerHTML += template(data);

            helpers.progressBar.style.width = ++progress + '%';

            dfd.resolve();
        });
    }
});

// wait for q before we run
var runInterval = setInterval(function()
{
    if ('Handlebars' in window)
    {
        clearTimeout(runInterval);

        suite.run({
            async: true
        });
    }
}, 500);