/*
description: A test case to see what is the optimum amount of images and which type to load at any one time
*/

helpers.loadScript('https://raw.github.com/kriskowal/q/master/q.js');

var baseURL = 'assets/img/';
var lastImg;

function loadImage(ext)
{
    var dfd = new Q.defer();
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

        dfd.resolve();
    }

    img.src = baseURL + ext;

    return dfd.promise;
}

function loadImages(ext, num, dfd)
{
    var promises = [ ];

    for (var i = num - 1; i >= 0; i--)
    {
        promises.push(
            loadImage(ext)
        );
    }

    Q
    .all(promises)
    .done(function()
    {
        dfd.resolve();
    });
}

suite
.on('cycle', function()
{
    // clear the dump area
    dumpArea.innerHTML = '';

    // null last image
    lastImg = null;
})
.add('dom-image-load-number#png8x10', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('png8.png', 10, dfd);
    }
})
.add('dom-image-load-number#png8x50', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('png8.png', 50, dfd);
    }
})
.add('dom-image-load-number#png8x100', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('png8.png', 100, dfd);
    }
})
.add('dom-image-load-number#png8x500', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('png8.png', 500, dfd);
    }
})
.add('dom-image-load-number#png24x10', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('png24.png', 10, dfd);
    }
})
.add('dom-image-load-number#png24x50', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('png24.png', 50, dfd);
    }
})
.add('dom-image-load-number#png24x100', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('png24.png', 100, dfd);
    }
})
.add('dom-image-load-number#png24x500', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('png24.png', 500, dfd);
    }
})
.add('dom-image-load-number#gifx10', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('gif.gif', 10, dfd);
    }
})
.add('dom-image-load-number#gifx50', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('gif.gif', 50, dfd);
    }
})
.add('dom-image-load-number#gifx100', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('gif.gif', 100, dfd);
    }
})
.add('dom-image-load-number#gifx500', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('gif.gif', 500, dfd);
    }
})
.add('dom-image-load-number#jpegoptx10', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('jpegopt.jpg', 10, dfd);
    }
})
.add('dom-image-load-number#jpegoptx50', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('jpegopt.jpg', 50, dfd);
    }
})
.add('dom-image-load-number#jpegoptx100', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('jpegopt.jpg', 100, dfd);
    }
})
.add('dom-image-load-number#jpegoptx500', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('jpegopt.jpg', 500, dfd);
    }
})
.add('dom-image-load-number#jpegprogx10', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('jpegprog.jpg', 10, dfd);
    }
})
.add('dom-image-load-number#jpegprogx50', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('jpegprog.jpg', 50, dfd);
    }
})
.add('dom-image-load-number#jpegprogx100', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('jpegprog.jpg', 100, dfd);
    }
})
.add('dom-image-load-number#jpegprogx500', {
    defer: true,
    fn: function(dfd)
    {
        loadImages('jpegprog.jpg', 500, dfd);
    }
});

// wait for q before we run
var runInterval = setInterval(function()
{
    if ('Q' in window)
    {
        if ('defer' in Q)
        {
            clearTimeout(runInterval);

            suite.run({
                async: true
            });
        }
    }
}, 500);