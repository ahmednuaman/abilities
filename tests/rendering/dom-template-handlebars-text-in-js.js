/*
description: A test case to see how fast it is to load and render Handlbars templates via text in a JS variable
*/

helpers.loadScript('assets/js/vendor/handlebars.js');

var data = {
    entries: [1, 2, 3, 4, 5, 6, 7]
};
var templat = '<ul>{{#each entries}}<li>{{this}}</li>{{/each}}</ul>';

suite.on('cycle', function(){
    // clear the dump area
    dumpArea.innerHTML = '';
}).add('handlebars#in-html', function () {
    var template = Handlebars.compile(templat);

    dumpArea.innerHTML += template(data);
    helpers.progressBar.style.width = ++progress + '%';
});

// wait for q before we run
var runInterval = setInterval(function() {
    if ('Handlebars' in window) {
        clearTimeout(runInterval);
        suite.run();
    }
}, 500);
