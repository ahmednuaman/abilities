/*
description: a test to see what is the max number of concurrent connections to different hosts a browser can handle
*/

var connections = 0;
var imagesLoaded = 0;
var limit = 30;
var time = (new Date()).getTime();

function loadImage(url)
{
    var img = new Image();
    var start = (new Date()).getTime();

    img.onload = function(event)
    {
        var done = (new Date()).getTime();

        if (done - start <= 4000)
        {
            // concurrent!
            connections++;
        }

        imagesLoaded++;

        if (imagesLoaded === limit)
        {
            // we're done
            helpers.log('All images loaded, ' + connections + ' connections are concurrent');

            helpers.save('{"connections":' + connections + ',"latency":' + latency + '}');
        }
    };

    img.src = url;

    helpers.log('Loading image: ' + img.src);
}

function loadMoreImages()
{
    for (var i = limit - 1; i >= 0; i--)
    {
        for (var j = 1; j >= 0; j--)
        {
            loadImage('http://' + i + '.resource-cgi-hr.appspot.com/?type=gif&sleep=2&n=' + j + '&t=' + time);
        }
    }
}

(function()
{
    loadMoreImages();
})();