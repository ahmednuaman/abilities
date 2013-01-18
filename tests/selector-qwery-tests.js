/*
description: A test to see if vanilla selectors are faster than qwery; we are gonna get all the tags, then all the classes then one id
*/

helpers.loadScript('https://raw.github.com/ded/qwery/master/qwery.min.js');

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
.add('selector#qwery', function()
{
    var divs = qwery('div');

    divs = qwery('div.divs');

    var div = qwery('div#div1')[0];

    div.style.height = '10px';
    div.style.width = '10px';
    div.style.background = 'red';
});

// wait for qwery before we run
var runInterval = setInterval(function()
{
    if ("qwery" in window)
    {
        clearTimeout(runInterval);

        suite.run();
    }
}, 500);