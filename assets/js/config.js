// create bench and suite
var benchmark = new Benchmark();
var suite = new Benchmark.Suite();

// ref our debug areas, a dump area to add code and log area for visual logging
var dumpArea = document.getElementById('dump-area');
var logArea = document.getElementById('log-area');

// reg our progress
var progress = 0;
var totalBenches;

// register listeners
suite
.on('start', function(event)
{
    helpers.log('Starting test');

    totalBenches = event.currentTarget.length * .01;
})
.on('complete', function()
{
    var fastest = String(this.filter('fastest').pluck('name'));
    var message = helpers.parseBenchesData(this);

    helpers.log('Finished test, fastest is ' + fastest);
    helpers.log('Saving data');

    helpers.save(message);
})
.on('cycle', function(event)
{
    helpers.log('Cycle: ' + String(event.target));

    progress += 100 * totalBenches;

    helpers.progressBar.style.width = progress + '%';
});

// create a timeout that handles any errors created by our tests
setTimeout(function () {
    helpers.log('Aborting test!');

    helpers.save('{"aborted": true}');
}, 180000);