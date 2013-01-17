var benchmark = new Benchmark();
var suite = new Benchmark.Suite();
var logArea = document.getElementById('log-area');

// our logging function
function log(message)
{
    // save to console and log area
    logArea.innerHTML += message + "\n";

    console.log(message);
}

// our saving function
function save(result)
{
    log('Saving result: ' + result);

    // check for jquery
    if (typeof jQuery === 'undefined')
    {
        log('No jQuery found, load it');

        // load jQuery
        var scr = document.createElement('script');
            scr.type = 'text/javascript';
            scr.async = true;
            scr.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js';
            (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(scr);
    }

    // async our ajax request
    var ajaxRequestInterval = setInterval(function()
    {
        log('Checking for jQuery');

        if ("$" in window)
        {
            log('jQuery found');

            clearInterval(ajaxRequestInterval);

            $.ajax({
                url: 'api.php',
                method: 'post',
                success: function(data)
                {
                    log('Saved data, going to next test, if any, in 5 seconds...');

                    setTimeout(next, 5000);
                },
                dataType: 'json',
                data: {
                    results: [{
                        name: testData.name,
                        description: testData.description,
                        value: result
                    }]
                },
                headers: {
                    'X_REQUEST_DEVICE': deviceId
                }
            });

            return;
        }

        log('No jQuery yet');
    }, 2000);
}

// our next test
function next()
{
    window.location.reload();
}

// some cookie bizniz
function createCookie(name, value, days)
{
    if (days)
    {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++)
    {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// register listeners
suite
.on('start', function()
{
    log('Starting test');
})
.on('complete', function()
{
    var fastest = this.filter('fastest').pluck('name');

    log('Finished test, fastest is ' + fastest);
    log('Saving data');

    save(fastest);
})
.on('cycle', function(event)
{
    log('Cycle: ' + String(event.target));
});

// get the device id
var deviceId = (function()
{
    var device;

    // so, this could be very long...
    // first start with LG: http://developer.lgappstv.com/TV_HELP/index.jsp?topic=%2Flge.tvsdk.developing.book%2Fhtml%2FDeveloping+Web+App%2FDeveloping+Web+App%2FCreating+Web+Applications1.htm
    if (/NetCast/.test(navigator.userAgent))
    {
        device = document.getElementById('device');

        if (device)
        {
            // ermagad
            return device.version + '; ' +
                device.manufacturer + '; ' +
                device.modelName + '; ' +
                device.serialNumber + '; ' +
                device.swVersion + '; ' +
                device.hwVersion + '; ' +
                device.SDKVersion + '; ' +
                device.osdResolution + '; ' +
                device.networkType + '; ' +
                device.net_macAddress + '; ' +
                device.drmClientInfo + '; ' +
                device.net_dhcp + '; ' +
                device.net_isConnected + '; ' +
                device.net_hasIP + '; ' +
                device.net_ipAddress + '; ' +
                device.net_netmask + '; ' +
                device.net_gateway + '; ' +
                device.net_dns1 + '; ' +
                device.net_dns2 + '; ' +
                device.supportMouse + '; ' +
                device.supportVoiceRecog + '; ' +
                device.supportPentouch + '; ' +
                device.support3D + '; ' +
                device.support3DMode.from_2d_to_3d + '; ' +
                device.support3DMode.side_by_side + '; ' +
                device.support3DMode.side_by_side_rl + '; ' +
                device.support3DMode.top_bottom + '; ' +
                device.support3DMode.checker_bd + '; ' +
                device.preferredSubtitleLanguage + '; ' +
                device.preferredAudioLanguage + '; ' +
                device.preferredSubtitleStatus + '; ' +
                device.tvLanguage2 + '; ' +
                device.tvCountry2 + '; ' +
                device.timeZone + '; ' +
                device.platform + '; ' +
                device.chipset;
        }
    }

    // now samsung http://www.samsungdforum.com/Guide/ref00008/tvinformation/dtv_tvinformation_tvinfomanager.html
    // if (/Maple|SMART\-TV/.test(navigator.userAgent))
    // {

    // }

    // if all else fails we assign a generated device id
    if (!device)
    {
        // check to see if there's a device id already set via cookie
        device = readCookie('deviceId');

        if (!device)
        {
            // generate one and save its ass
            device = 'fake-' + (new Date()).getTime();

            createCookie('deviceId', device, 1000);
        }
    }

    return device;
})();