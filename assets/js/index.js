(function () {
    function runAllTests () {
        var els = document.getElementsByTagName('input');
        var form = document.getElementById('all-tests-form');
        var el;

        for (var i = els.length - 1; i >= 0; i--)
        {
            el = els[i];

            el.checked = true;
        }

        form.submit();
    }

    function tabTo (event) {
        var container = document.getElementById('tab-container');
        var divs = container.getElementsByTagName('div');
        var href = event.currentTarget.href.split('#');
        var div;

        for (var i = divs.length - 1; i >= 0; i--) {
            div = divs[i];

            div.className = div.className.replace(/\s?active\s?/gim, '');
        };

        document.getElementById(href[1]).className += ' active';
    }

    var link = document.getElementById('run-all-tests');
    var tabs = document.getElementById('nav-tabs-container').getElementsByTagName('a');
    var tab;

    for (var i = tabs.length - 1; i >= 0; i--) {
        tab = tabs[i];

        tab.onclick = tabTo;
        tab.onkeypress = tabTo;
    };

    link.onclick = runAllTests;
    link.onkeypress = runAllTests;

    link.focus();
})();