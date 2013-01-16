casper
.start().open(url, {
    method: 'post',
    data: {
        'foo': 'bar',
        'bar': 'foo'
    }
})
.then(function()
{
    this.test.assertTextExists('Some $_POST requests seem to be missing', 'The page should report that some $_POST vars are missing');
});

casper.run(function()
{
    this.test.done();
});