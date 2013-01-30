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
        var handler;
        var handlers;
        var len;

        handlers = findChildClasses(parent, className);

        len = handlers.length - 1;

        for (var i = len; i >= 0; i--) {
            handler = handlers[i];

            handler.onkeydown = handleHandlerKeyDown;
        };

        handlers[len].focus();
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

    function handleHandlerKeyDown (event) {
        var target = event.currentTarget;
        var direction;

        if (!event) {
            event = window.event;
        };

        switch (event.keyCode) {
            // left
            case 37:
                direction = 'left';

            break;

            // up
            case 38:
                direction = 'up';

            break;

            // right
            case 39:
                direction = 'right';

            break;

            // down
            case 40:
                direction = 'down';

            break;

            // enter or space
            case 13:
            case 32:
                target.click();

                return false;

            break;
        }

        handleHandlerKeyDirection(target, direction);
    }

    function handleHandlerKeyDirection (target, direction) {
        var matches = target.className.match(new RegExp('key-' + direction + ':([^\\s]+)'));
        var match;
        var target;
        var type;

        if (matches) {
            match = matches[1];

            type = match.split('-', 1);

            if (type[0] === 'dynamic') {

            } else {
                target = document.getElementById(match);
            };

            if (target) {
                target.focus();
            };
        };
    }

    function ready () {
        assignHandlers();
        findKeyHandlers();
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