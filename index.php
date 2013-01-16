<?php
// get the harness
require_once 'harness.php';
?>
<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0" />
        <title>Test harness</title>
    </head>
    <body>
        <div id="container">
            <?php if ($harness->is_testing): ?>
                <h1>Currently testing: <?php echo $harness->current_test->name; ?></h1>
                <p><?php echo $harness->current_test->description; ?></p>
                <h3>Log</h3>
                <pre id="log-area"></pre>
                <script>
                    var testData = {
                        name: '<?php echo $harness->current_test->name; ?>',
                        description: '<?php echo $harness->current_test->description; ?>'
                    };
                </script>
                <script src="assets/js/vendor/benchmark-1.0.0.js"></script>
                <script src="assets/js/benchmark-config.js"></script>
                <script src="<?php echo $harness->current_test->path; ?>"></script>
            <?php else: ?>
                <h1>Test harness</h1>
                <p><a href="#" onclick="runAllTests();">Run all the tests!</a> or select some...</p>
                <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
                    <ul>
                        <?php foreach ($harness->get_all_tests() as $test): ?>
                            <li id="test">
                                <label>
                                    <input type="checkbox" name="tests[]" value="<?php echo $test->name; ?>">
                                    <?php echo $test->name; ?>: <?php echo $test->description; ?>
                                </label>
                            </li>
                         <?php endforeach; ?>
                    </ul>
                    <button type="submit">
                        Run tests
                    </button>
                </form>
                <script>
                    function runAllTests()
                    {
                        var els = document.getElementsByTagName('input');
                        var form = document.getElementsByTagName('form')[0];
                        var el;

                        for (var i = els.length - 1; i >= 0; i--)
                        {
                            el = els[i];

                            el.checked = true;
                        }

                        form.submit();
                    }
                </script>
            <?php endif; ?>
        </div>
    </body>
</html>