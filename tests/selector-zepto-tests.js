/*
description: A test to see if vanilla selectors are faster than Zepto; we are gonna get all the tags, then all the classes then one id
*/

helpers.loadScript('assets/js/vendor/zepto.js');

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
.add('selector#zepto', function()
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

// wait for zepto before we run
var runInterval = setInterval(function()
{
    if ('$' in window)
    {
        clearTimeout(runInterval);

        suite.run();
    }
}, 500);