<?php
// get the harness
require_once 'harness.php';
?>
<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8" />
        <style>
            body {
                background: #ffffff;
            }
        </style>
        <title>Test harness</title>
    </head>
    <body>
        <div id="container">
            <?php if ($harness->is_testing): ?>
                <?php
                // set el time
                $time = time();
                ?>
                <h1>Currently testing: <?php echo $harness->current_test->name; ?></h1>
                <p><?php echo $harness->current_test->description; ?></p>
                <h3>Log</h3>
                <pre id="log-area"></pre>
                <div id="dump-area"></div>
                <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
                    <input type="hidden" name="name" value="<?php echo $harness->current_test->name; ?>">
                    <input type="hidden" name="type" value="<?php echo $harness->current_test->type; ?>">
                    <input type="hidden" name="description" value="<?php echo $harness->current_test->description; ?>">
                    <input type="hidden" name="value" id="test-result-value" value="">
                </form>
                <script src="assets/js/vendor/benchmark-1.0.0.js"></script>
                <script src="assets/js/helpers.js?x=<?php echo $time; ?>"></script>
                <script src="assets/js/config.js?x=<?php echo $time; ?>"></script>
                <script src="<?php echo $harness->current_test->path; ?>?x=<?php echo $time; ?>"></script>
            <?php else: ?>
                <h1>Test harness</h1>
                <?php if ($harness->tests_time): ?>
                    <div>
                        <h3>Tests complete</h3>
                        <p>It tooks <?php echo strftime('%M:%S', $harness->tests_time); ?> (MM:SS) to complete the tests</p>
                    </div>
                <?php endif ?>
                <p><a href="#" id="run-all-tests" onclick="runAllTests();">Run all the tests!</a> or select some...</p>
                <form id="all-tests-form" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
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
                        var form = document.getElementById('all-tests-form');
                        var el;

                        for (var i = els.length - 1; i >= 0; i--)
                        {
                            el = els[i];

                            el.checked = true;
                        }

                        form.submit();
                    }

                    var link = document.getElementById('run-all-tests');

                    link.focus();
                </script>
                <?php if (isset($_POST['autorun'])): ?>
                    <?php if ($_POST['autorun'] == '1'): ?>
                        <script>
                            runAllTests();
                        </script>
                    <?php endif ?>
                <?php endif ?>
            <?php endif; ?>
        </div>
    </body>
</html>