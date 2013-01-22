/*
description: A test case to see which type of image is fastest to resize
*/

var baseURL = 'assets/img/';
var lastImg;

function loadImage(ext, dfd)
{
    var img = new Image();
    var el = document.createElement('img');

    img.onload = function()
    {
        el.src = img.src;

        if (lastImg)
        {
            dumpArea.insertBefore(el, lastImg);
        }
        else
        {
            dumpArea.appendChild(el);
        }

        lastImg = el;

        setTimeout(function()
        {
            el.width = 800;
            el.height = 800;

            setTimeout(function()
            {
                el.width = 500;
                el.height = 500;

                dfd.resolve();
            }, 1);
        }, 1);
    }

    img.src = baseURL + ext;
}

suite
.on('cycle', function()
{
    // clear the dump area
    dumpArea.innerHTML = '';

    // null last image
    lastImg = null;
})
.add('dom-image-resize#png8', {
    defer: true,
    fn: function(dfd)
    {
        loadImage('png8.png', dfd);
    }
})
.add('dom-image-resize#png24', {
    defer: true,
    fn: function(dfd)
    {
        loadImage('png24.png', dfd);
    }
})
.add('dom-image-resize#gif', {
    defer: true,
    fn: function(dfd)
    {
        loadImage('gif.gif', dfd);
    }
})
.add('dom-image-resize#jpegopt', {
    defer: true,
    fn: function(dfd)
    {
        loadImage('jpegopt.jpg', dfd);
    }
})
.add('dom-image-resize#jpegprog', {
    defer: true,
    fn: function(dfd)
    {
        loadImage('jpegprog.jpg', dfd);
    }
})
.run({
    async: true
});