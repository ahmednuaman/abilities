// create bench and suite
var benchmark = new Benchmark({
    'maxTime': 30
});
var suite = new Benchmark.Suite();

// ref our debug areas, a dump area to add code and log area for visual logging
var dumpArea = document.getElementById('dump-area');
var logArea = document.getElementById('log-area');

// register listeners
suite
.on('start', function()
{
    helpers.log('Starting test');
})
.on('complete', function()
{
    var fastest = String(this.filter('fastest').pluck('name'));
    var message = 'Fastest: ' + fastest + '; benches: ' + helpers.parseBenchesData(this);

    helpers.log('Finished test, fastest is ' + fastest);
    helpers.log('Saving data');

    helpers.save(message);
})
.on('cycle', function(event)
{
    helpers.log('Cycle: ' + String(event.target));
});