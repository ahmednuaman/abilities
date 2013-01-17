/*
description: A test to see if vanilla selectors are faster than jQuery; we are gonna get all the tags, then all the classes then one id
*/

loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js');

suite
.on('start', function()
{
    createElements(500, 'div', 'divs', 'div');
})
.on('cycle', function()
{
    log('Resetting div colour');

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
})
.add('selector#jquery', function()
{
    var divs = $('div');

    divs = $('div.divs');

    var div = $('div#div1');

    div.css({
        height: '10px',
        width: '10px',
        background: 'red'
    });
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