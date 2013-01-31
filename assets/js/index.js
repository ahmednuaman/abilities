(function () {
    var container = document.getElementById('container');
    var hasClassName = !!document['getElementsByClassName'] && false;
    var hasQuerySelector = !!document['querySelector'] && false;

    function assignHandlers () {
        assignHandlerCheckbox();
        assignHandlerRunAllTests();
        assignHandlerTabs();
    }

    function assignHandlerCheckbox () {
        var handlers = hasClassName ? document.getElementsByClassName('checkbox-handler') : findChildClasses(container, 'checkbox-handler');

        for (var i = handlers.length - 1; i >= 0; i--) {
            handlers[i].onclick = handleCheckboxToggle;
        };
    }

    function assignHandlerRunAllTests () {
        var link = document.getElementById('link-run-all-tests');

        link.onclick = handleRunAllTests;
    }

    function assignHandlerTabs () {
        var tabs = document.getElementById('nav-tabs-container').getElementsByTagName('a');
        var tab;

        for (var i = tabs.length - 1; i >= 0; i--) {
            tab = tabs[i];

            tab.onclick = handleTabTo;
        };
    }

    function findKeyHandlers () {
        var className = 'key-handler';
        var child;
        var handler;
        var handlers;
        var len;

        handlers = hasClassName ? document.getElementsByClassName(className) : findChildClasses(container, className);

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
        var path = selector.split('>');
        var target = arguments[1];
        var pos;
        var temp;

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

        if (target['length']) {
            target = target[0];
        };

        return target;
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

        console.log(matches)

        if (matches) {
            match = matches[1];

            if (match.indexOf('dynamic-') === 0) {
                match = match.replace('dynamic-', '');

                target = hasQuerySelector ? document.querySelector(match) : findChildCSS(match);
            } else {
                target = document.getElementById(match);
            };

            if (target) {
                target.focus();
            };
        };
    }

    function handleCheckboxToggle (event) {
        var target = event.currentTarget;
        var checkbox = target.getElementsByTagName('input')[0];

        checkbox.checked = !checkbox.checked;

        if (checkbox.checked) {
            target.className += ' selected';
        } else {
            target.className = target.className.replace(/\s?selected\s?/gi, '');
        };

        return false;
    }

    function handleRunAllTests (event) {
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

    function handleTabTo (event) {
        var activeClass = ' active';
        var activeRegex = /\s?active\s?/gi;
        var divs = document.getElementById('tab-container').getElementsByTagName('div');
        var lis = document.getElementById('nav-tabs-container').getElementsByTagName('li');
        var href = event.currentTarget.href.split('#');
        var div;
        var li;

        for (var i = divs.length - 1; i >= 0; i--) {
            div = divs[i];
            li = lis[i];

            div.className = div.className.replace(activeRegex, '');
            li.className = li.className.replace(activeRegex, '');
        };

        document.getElementById(href[1]).className += activeClass;

        document.getElementById('nav-' + href[1]).className += activeClass;
    }

    function ready () {
        assignHandlers();
        findKeyHandlers();
    }

    ready();
})();