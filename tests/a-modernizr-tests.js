/*
description: All the Modernizr tests in one; the resulting value is a string of the classes appended to the document for each of the Modernizr tests ran
*/

// we're not actually gonna use benchmark here, we're just gonna load Modernizr and save the classes
(function()
{
    helpers.loadScript('assets/js/vendor/modernizr.js');

    helpers.log('Loading Modernizr');

    // test to see if Modernizr has loaded
    var loadInterval = setInterval(function()
    {
        helpers.log('Checking for Modernizr');
        helpers.log(document.getElementsByTagName('html')[0].className.split(' '));

        if ('Modernizr' in window)
        {
            helpers.log('Modernizr found');

            // stop the interval
            clearInterval(loadInterval);

            // json-ise the class names
            var classes = document.getElementsByTagName('html')[0].className.split(' ');
            var arr = [ ];
            var item;
            var has;

            for (var i = classes.length - 1; i >= 0; i--)
            {
                item = classes[i];

                if (!item)
                {
                    continue;
                }

                has = item.indexOf('no-') === -1;

                arr.push({
                    name: item.replace('no-', ''),
                    value: has
                });
            }

            // save the class names
            helpers.save(
                helpers.parseBooleanData(arr)
            );

            return;
        }

        helpers.log('No Modernizr yet');
    }, 2000);
})();