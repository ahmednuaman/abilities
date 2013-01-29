<?php
// get the harness
require_once 'harness.php';
?>
<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="assets/css/styles.css">
        <title>Test harness</title>
    </head>
    <body class="<?php echo $harness->is_testing ? 'testing' : 'not-testing' ?>">
        <div class="navbar navbar-static-top">
            <div class="navbar-inner">
                <a href="index.php" class="brand">Abilities</a>
            </div>
        </div>
        <div class="container-fluid">
            <?php if ($harness->is_testing): ?>
                <div class="page-header">
                    <h1>
                        <?php echo $harness->current_test->name; ?>
                    </h1>
                </div>
            <?php endif; ?>
            <div class="row-fluid">
                <?php if ($harness->is_testing): ?>
                    <?php
                    // set el time
                    $time = time();
                    ?>
                    <div class="span8">
                        <div class="alert alert-block alert-info">
                            <?php echo $harness->current_test->description; ?>
                        </div>
                        <pre id="log-area"></pre>
                        <div id="dump-area"></div>
                        <form id="test-form" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
                            <input type="hidden" name="result[name]" value="<?php echo $harness->current_test->name; ?>">
                            <input type="hidden" name="result[type]" value="<?php echo $harness->current_test->type; ?>">
                            <input type="hidden" name="result[description]" value="<?php echo $harness->current_test->description; ?>">
                            <input type="hidden" name="result[value]" id="test-result-value" value="">
                        </form>
                    </div>
                <?php else: ?>
                    <div class="span8">
                        <?php if ($harness->tests_time): ?>
                            <div class="alert alert-block alert-success">
                                <h4>Tests were successfully run!</h4>
                                Tests completed in <?php echo strftime('%M:%S', $harness->tests_time); ?>
                            </div>
                        <?php endif; ?>
                        <h3><a href="#" id="run-all-tests">Run all the tests!</a> or select some...</h3>
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
                            <button type="submit" class="btn btn-block btn-large btn-primary">
                                Run tests
                            </button>
                        </form>
                    </div>
                <?php endif; ?>
                <div class="span4 device-info">
                    <h3>Device information</h3>
                    <dl>
                        <dt>Device Id</dt>
                        <dd><?php echo $_SESSION['device_id']; ?></dd>
                        <dt>User Agent</dt>
                        <dd><?php echo $_SERVER['HTTP_USER_AGENT']; ?></dd>
                    </dl>
                </div>
            </div>
        </div>
        <?php if ($harness->is_testing): ?>
            <script src="assets/js/vendor/benchmark-1.0.0.js"></script>
            <script src="assets/js/helpers.js?x=<?php echo $time; ?>"></script>
            <script src="assets/js/config.js?x=<?php echo $time; ?>"></script>
            <script src="<?php echo $harness->current_test->path; ?>?x=<?php echo $time; ?>"></script>
        <?php else: ?>
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

                link.onclick = runAllTests;
                link.onkeypress = runAllTests;

                link.focus();
            </script>
            <?php /*if (isset($_POST['autorun'])): ?>
                <?php if ($_POST['autorun'] == '1'): ?>
                    <script>
                        runAllTests();
                    </script>
                <?php endif; ?>
            <?php endif;*/ ?>
        <?php endif; ?>
    </body>
</html>