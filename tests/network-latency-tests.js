/*
description: A test to check latency of loading resources
*/

function loadImage(url, dfd)
{
    var img = new Image();

    img.onload = function()
    {
        dfd.resolve();
    }

    img.src = url + '?x=' + (new Date()).getTime();
}

suite
.add('network-latency#local', {
    defer: true,
    fn: function(dfd)
    {
        loadImage('assets/img/jpegprog.jpg', dfd);
    }
})
.add('network-latency#aws-s3-http', {
    defer: true,
    fn: function(dfd)
    {
        loadImage('http://abilities.s3.amazonaws.com/jpegprog.jpg', dfd);
    }
})
.add('network-latency#aws-s3-https', {
    defer: true,
    fn: function(dfd)
    {
        loadImage('https://abilities.s3.amazonaws.com/jpegprog.jpg', dfd);
    }
})
.add('network-latency#rackspace-http', {
    defer: true,
    fn: function(dfd)
    {
        loadImage('http://81a4f7fff57b565079e0-f2edf0fdc6e30b62e12bcf12ddd876cc.r48.cf3.rackcdn.com/jpegprog.jpg', dfd);
    }
})
.add('network-latency#rackspace-https', {
    defer: true,
    fn: function(dfd)
    {
        loadImage('https://ab29890fe84d7d5b95c5-f2edf0fdc6e30b62e12bcf12ddd876cc.ssl.cf3.rackcdn.com/jpegprog.jpg', dfd);
    }
})
.add('network-latency#google-appengine-http', {
    defer: true,
    fn: function(dfd)
    {
        loadImage('http://static-gadgets.appspot.com/assets/img/jpegprog.jpg', dfd);
    }
})
.add('network-latency#google-appengine-https', {
    defer: true,
    fn: function(dfd)
    {
        loadImage('https://static-gadgets.appspot.com/assets/img/jpegprog.jpg', dfd);
    }
})
.run({
    async: true
})