/*
description: A test to check to see which tracking system is fastest, in this case we are testing standard GA
*/

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-352545-22']);

suite
.add('tracking-ga#setup', {
    defer: true,
    fn: function(dfd)
    {
        var interval = setInterval(function()
        {
            try {
                _gat._getTrackerByName();

                clearInterval(interval);

                dfd.resolve();
            } catch (e) { }
        }, 50);
    }
})
.add('tracking-ga#track-event', function()
{
    _gaq.push(['_trackEvent', 'ga-cycle', (new Date()).getTime()]);
})
.add('tracking-ga#track-pageview', function()
{
    _gaq.push(['_trackPageview', 'some-page-' + (new Date()).getTime()]);
})
.add('tracking-ga#track-item', function()
{
    _gaq.push(['_addItem', 'a-movie', (new Date()).getTime()]);
})
.add('tracking-ga#track-trans', function()
{
    _gaq.push(['_addTrans', 'a-purchase', (new Date()).getTime()]);
})
.run({
    async: true
});

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();