/*
description: A test to see if vanilla selectors are the fastest; we are gonna get all the tags, then all the classes then one id
*/

helpers.loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js');

suite
.on('start', function()
{
    helpers.createElements(500, 'div', 'divs', 'div');
})
.on('cycle', function()
{
    helpers.log('Resetting div colour');

    var div = document.getElementById('div1');

    div.style.height = '';
    div.style.width = '';
    div.style.background = '';
})
.add('selector#vanilla', function()
{
    // get our body
    var body = document.getElementsByTagName('body')[0];

    // now find our divs!
    var bodyDivs = body.getElementsByTagName('div');

    // now find our div classes
    var divs = [ ];
    var div;

    for (var i = bodyDivs.length - 1; i >= 0; i--)
    {
        div = bodyDivs[i];

        if (div.className === 'divs')
        {
            divs.push(div);
        }
    }

    // and then by id
    div = document.getElementById('div1');

    div.style.height = '10px';
    div.style.width = '10px';
    div.style.background = 'red';
});

// wait for jquery before we run
var runInterval = setInterval(function()
{
    if ("$" in window)
    {
        clearTimeout(runInterval);

        suite.run();
    }
}, 500);