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
        var hasClassName = document['getElementsByClassName'];
        var parent = document.getElementById('container');
        var child;
        var handler;
        var handlers;
        var len;

        handlers = hasClassName ? document.getElementsByClassName(className) : findChildClasses(parent, className);

        len = handlers.length - 1;

        for (var i = len; i >= 0; i--) {
            handler = handlers[i];

            handler.onkeydown = handleHandlerKeyDown;
        };

        handlers[hasClassName ? 0 : len].focus();
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

    function findChildCSS (selector) {
        var hasClassName = document['getElementsByClassName'];
        var path = selector.split('>');
        var pos;
        var temp;
        var target;

        for (var i = 0; i < path.length; i++) {
            pos = path[i];

            if (pos.indexOf('#') === 0) {
                target = (target || document).getElementById(pos.replace('#', ''));
            } else if (pos.indexOf('.') === 0) {
                temp = pos.replace('.', '');

                target = hasClassName ? (target || document).getElementsByClassName(temp) : findChildClasses(target || document, temp);
            } else {
                temp = pos.split(':');

                if (target['length']) {
                    if (target.length === 1) {
                        target = target[0];
                    } else {
                        throw new Error('Cannot pass more than one target to getElementsByTagName');
                    };
                };

                target = (target || document).getElementsByTagName(temp[0]);
            };

            if (pos.indexOf(':') !== -1 && target) {
                if (!temp[1]) {
                    temp = pos.split(':');
                };

                target = findChildPseudo(target, temp[1]);
            };

            temp = null;

            if (!target) {
                throw new Error('Failed to find target for query: ' + selector);
            };
        };

        return target[0];
    }

    function findChildPseudo (target, pseudo) {
        if (pseudo === 'first-of-type') {
            return target[0];
        } else if (pseudo === 'last-of-type') {
            return target[target.length - 1];
        };
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

            if (match.indexOf('dynamic-') === 0) {
                match = match.replace('dynamic-', '');

                target = document['querySelector'] ? document.querySelector(match) : findChildCSS(match);
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