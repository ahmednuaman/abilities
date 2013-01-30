(function () {
    function assignHandlers () {
        var link = document.getElementById('link-run-all-tests');
        var tabs = document.getElementById('nav-tabs-container').getElementsByTagName('a');
        var tab;

        for (var i = tabs.length - 1; i >= 0; i--) {
            tab = tabs[i];

            tab.onclick = tabTo;
        };

        link.onclick = runAllTests;
    }

    function findKeyHandlers () {
        var className = 'key-handler';
        var parent = document.getElementById('container');
        var child;
        var handlers;

        handlers = findChildClasses(parent, className);
    }

    function findChildClasses (parent, className) {
        var children = parent.children;
        var handlers = [ ];

        for (var i = children.length - 1; i >= 0; i--) {
            child = children[i];

            if (child['className']) {
                if (child.className.indexOf(className) !== -1) {
                    handlers.push(child);
                };
            };

            if (child['children']) {
                handlers = handlers.concat(
                    findChildClasses(child, className)
                );
            };
        };

        return handlers;
    }

    function handleKeyPress (event) {

    }

    function ready () {
        var body = document.getElementsByTagName('body')[0];

        assignHandlers();
        findKeyHandlers();

        body.onkeypress = handleKeyPress;

        body.focus();
    }

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

    ready();
})();