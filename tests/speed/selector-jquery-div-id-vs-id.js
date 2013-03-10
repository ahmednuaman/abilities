/*
description: A test to see if div#id is faster than #id in jQuery
type: benchmark
*/

helpers.loadScript('assets/js/vendor/jquery.js');

suite
.on('start', function()
{
    helpers.createElements(1, 'div', 'divs', 'div');
})
.add('div#id', function()
{
    $('div#div0');
}).add('#id', function()
{
    $('#div0');
});

// wait for jquery before we run
var runInterval = setInterval(function()
{
    if ('$' in window)
    {
        clearTimeout(runInterval);

        suite.run();
    }
}, 500);