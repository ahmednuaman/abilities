// our harness helpers

// check for console.log
if (!('console' in window)) {
    var console = {
        log: window.alert
    };
};

var helpers = {
    // a simple function that creates a load of elements for us, this is handy for selector speed testing
    createElements: function(number, tag, cls, id)
    {
        var el;

        helpers.log('Creating selector elements');

        for (var i = 0; i < number; i++)
        {
            el = document.createElement(tag);

            el.className = cls;
            el.id = id + i;

            dumpArea.appendChild(el);
        }
    },

    // a function that loads a js script async'ly
    loadScript: function(url)
    {
        var scr = document.createElement('script');

        helpers.log('Loading script: ' + url);

        scr.type = 'text/javascript';
        scr.async = true;
        scr.src = url;

        (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(scr);
    },

    // a function that logs any messages to the console and log area on the page
    log: function(message)
    {
        // save to console and log area
        logArea.innerHTML += message + "\n";

        console.log(message);
    },

    // our save message, loads jquery async'ly if it's not available and then saves the data to the api relative to a device id
    save: function(result)
    {
        var xhr;

        helpers.log('Saving result: ' + result);

        if ("ActiveXObject" in window)
        {
            try
            {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e)
            {
                helpers.log('No XHR found!');

                return;
            }
        }
        else
        {
            xhr = new XMLHttpRequest();
        }

        xhr.onreadystatechange = function()
        {
            if (xhr.readyState === 4)
            {
                helpers.log('Saved data, going to next test, if any, in 5 seconds...');

                setTimeout(helpers.next, 5000);
            }
        };

        xhr.open('POST', 'api.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.send(
            'results[0][name]=' + encodeURIComponent(testData.name) +
            '&results[0][description]=' + encodeURIComponent(testData.description) +
            '&results[0][value]=' + encodeURIComponent(result)
        );
    },

    // a simple function that simply reloads the page after our tests
    next: function()
    {
        helpers.log('Loading...');

        window.location.reload();
    },

    // a simple function that creates a cookie
    createCookie: function(name, value, days)
    {
        if (days)
        {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=" + document.location.pathname;
    },

    // a simple function that reads a cookie
    readCookie: function(name)
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
    },

    // a function that converts the benchmarks benches data into a json string
    parseBenchesData: function(benches)
    {
        var marks = [ ];
        var str = '{"benches":{';
        var bench;

        for (var i = benches.length - 1; i >= 0; i--)
        {
            bench = benches[i];

            marks.push('"' + bench.name + '":{"count":' + bench.count +
                ',"cycles":' + bench.cycles +
                ',"hz":' + bench.hz +
                ',"times":{"cycle":' + bench.times.cycle +
                ',"elapsed":' + bench.times.elapsed + ',"period":' + bench.times.period +
                '}}');
        }

        str += marks.join(',');

        str += '}}';

        return str;
    }
};