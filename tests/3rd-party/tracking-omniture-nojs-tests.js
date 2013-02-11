/*
description: A test to check to see which tracking system is fastest, in this case we are testing non-JS Omniture
type: benchmark
*/

var urlHttp = 'http://metrics.sky.com/b/ss/bskybzairglobal/1/H.25.3--NS/0';
var urlHttps = 'https://smetrics.sky.com/b/ss/bskybzairglobal/1/H.25.3--NS/0';

suite
.add('tracking-omniture#track-http', {
    defer: true,
    fn: function(dfd)
    {
        var img = new Image();

        img.onload = function()
        {
            helpers.log('Tracked: ' + img.src);

            dfd.resolve();
        };

        img.src = urlHttp + '?pageName=some-path-' + (new Date()).getTime();

        helpers.progressBar.style.width = ++progress + '%';

        helpers.log('Tracking: ' + img.src);
    }
})
.add('tracking-omniture#track-https', {
    defer: true,
    fn: function(dfd)
    {
        var img = new Image();

        img.onload = function()
        {
            helpers.log('Tracked: ' + img.src);

            dfd.resolve();
        };

        img.src = urlHttps + '?pageName=some-path-' + (new Date()).getTime();

        helpers.progressBar.style.width = ++progress + '%';

        helpers.log('Tracking: ' + img.src);
    }
})
.run({
    async: true
});