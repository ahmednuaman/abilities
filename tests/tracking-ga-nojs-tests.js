/*
description: A test to check to see which tracking system is fastest, in this case we are testing non-JS GA
*/

var url = 'http://www.google-analytics.com/__utm.gif?' +
        'utmwv=4.4sh' +
        // '&utmn=' . getRandomNumber() .
        '&utmhn=' + encodeURIComponent(document.domain) +
        '&utmr=' + encodeURIComponent(document.domain) +
        // '&utmp=' + encodeURIComponent(document.location.pathname) +
        '&utmac=UA-352545-22' +
        '&utmcc=__utma%3D999.999.999.999.999.1%3B' +
        '&utmvid=0x62f8009219e92e79' +
        '&utmip=86.149.4.111';

suite
.add('tracking-ga#track', {
    defer: true,
    fn: function(dfd)
    {
        var img = new Image();

        img.onload = function()
        {
            helpers.log('Tracked: ' + img.src);

            dfd.resolve();
        };

        img.src = url + '&utmn=' + Math.floor(Math.random() * 2147483647) + '&utmp=' + encodeURIComponent('/some-path/' + (new Date()).getTime());

        helpers.log('Tracking: ' + img.src);
    }
})
.run({
    async: true
});