/*
description: all the Modernizr tests in one; the resulting value is a string of the classes appended to the document for each of the Modernizr tests ran
*/

// we're not actually gonna use benchmark here, we're just gonna load Modernizr and save the classes
(function()
{
    loadScript('http://modernizr.com/downloads/modernizr-latest.js');

    log('Loading Modernizr');

    // test to see if Modernizr has loaded
    var loadInterval = setInterval(function()
    {
        log('Checking for Modernizr');

        if ("Modernizr" in window)
        {
            log('Modernizr found');

            // stop the interval
            clearInterval(loadInterval);

            // save the class names
            save(document.getElementsByTagName('html')[0].className);

            return;
        }

        log('No Modernizr yet');
    }, 2000);
})();