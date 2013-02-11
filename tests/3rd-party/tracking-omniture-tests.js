/*
description: A test to check to see which tracking system is fastest, in this case we are testing standard Omniture
type: benchmark
*/

var sCode;

helpers.loadScript('https://gist.github.com/ahmednuaman/d8cedd877ed70722b328/raw/d5c5f5eafccf76611bbfdb488f040c4630cd3b81/omniture.js');

suite
.add('tracking-omniture#track-page-view', function()
{
    s.t({
        pageName: 'js-' + (new Date()).getTime()
    });
});

// wait for Omniture's 's' before we run
var runInterval = setInterval(function()
{
    if ('s' in window)
    {
        clearTimeout(runInterval);

        suite.run({
            async: true
        });
    }
}, 500);