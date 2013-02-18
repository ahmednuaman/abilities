/*
description: A test case to see whether it is faster to render templates on the client or the server
type: benchmark
*/

helpers.loadScript('assets/js/vendor/handlebars.js');

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
.add('dom-template#server', {
    defer: true,
    fn: function(dfd)
    {
        sendRequest('tests/rendering/dom-template-server-vs-handlebars.php', function (html) {
            dumpArea.innerHTML += html.responseText;

            helpers.progressBar.style.width = ++progress + '%';

            dfd.resolve();
        });
    }
})
.add('dom-template#handlebars', {
    defer: true,
    fn: function(dfd)
    {
        var func = 'jsonFlickrFeed';

        window[func] = function (data) {
            var template = Handlebars.compile('{{#each items}}<li><h1>{{title}}</h1><p>{{{description}}}</p></li>{{/each}}');

            dumpArea.innerHTML += '<ul>' + template(data) + '</ul>';

            helpers.progressBar.style.width = ++progress + '%';

            window[func] = null;

            dfd.resolve();
        };

        helpers.loadScript('http://api.flickr.com/services/feeds/photos_public.gne?format=json');
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