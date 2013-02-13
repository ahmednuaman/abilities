/*
description: A test to see if it is faster to look up an array of int or string
type: benchmark
*/

suite
.add('array-lookup#int', function()
{
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    arr.indexOf(1);
    arr.indexOf(0);
    arr.indexOf(5);
})
.add('array-lookup#string', function ()
{
    var arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    arr.indexOf('1');
    arr.indexOf('0');
    arr.indexOf('5');
})
.run();