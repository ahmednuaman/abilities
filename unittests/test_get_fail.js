casper.start(url, function()
{
    this.test.assertTextExists('$_GET requests not implemeted yet', 'The page should report that $_GET requests are not implemeted yet');
});

casper.run(function()
{
    this.test.done();
});