/*
description: A test case to see how fast it is to load and render Handlbars templates via <script> tag innerHTML
type: benchmark
*/

helpers.loadScript('assets/js/vendor/handlebars.js');

var data = {
    entries: [1, 2, 3, 4, 5, 6, 7]
};
var body = document.getElementsByTagName('body')[0];
var script = document.createElement('script');
script.id = 'handlebars-template';
script.type = 'text/x-handlebars-template';
script.innerHTML = '<ul>{{#each entries}}<li>{{this}}</li>{{/each}}</ul>';

body.appendChild(script);

suite
.on('cycle', function()
{
    // clear the dump area
    dumpArea.innerHTML = '';
})
.add('handlebars#in-html', function () {
    var element = document.getElementById('handlebars-template');
    var template = Handlebars.compile(element.innerHTML);

    dumpArea.innerHTML += template(data);

    helpers.progressBar.style.width = ++progress + '%';
});

// wait for q before we run
var runInterval = setInterval(function()
{
    if ('Handlebars' in window)
    {
        clearTimeout(runInterval);

        suite.run();
    }
}, 500);