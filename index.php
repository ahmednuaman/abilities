<?php
// get our commit id
require_once 'commit.php';

// get our helper
require_once 'helper.php';

// get the harness
require_once 'harness.php';

// if this is a CE-HTML device then we have to set the MIME type to application/ce-html+xml; charset=utf-8
if (stristr($_SERVER['HTTP_USER_AGENT'], 'ce-html')) {
    header('Content-type: application/ce-html+xml; charset=utf-8');

    echo '<?xml version="1.0" encoding="UTF-8"?>';
    ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "ce-html-1.0-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <?php
} else {
    ?>
<!DOCTYPE html>
<html>
    <?php
}
?>
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="assets/css/styles.css?x=<?php echo COMMIT_ID; ?>" />
        <title>Test harness</title>
    </head>
    <body class="<?php echo $harness->is_testing ? 'testing' : 'not-testing' ?>">
        <div id="container">
            <div class="navbar">
                <a href="index.php" id="link-navbar-brand" class="key-handler key-down:link-run-all-tests key-up:button-run-tests">Abilities</a>
            </div>
            <div class="container-fluid">
                <?php if ($harness->is_testing): ?>
                    <div class="page-header">
                        <h1>
                            <?php echo $harness->current_test->name; ?>
                        </h1>
                        <?php echo $harness->current_test->description; ?>
                    </div>
                <?php endif; ?>
                <div class="row-fluid">
                    <?php if ($harness->is_testing): ?>
                        <div class="span8">
                            <?php if ($harness->current_test->warnings): ?>
                                <div class="alert alert-warning">
                                    <h4>Warning!</h4>
                                    <?php echo $harness->current_test->warnings; ?>
                                </div>
                            <?php endif; ?>
                            <div id="test-complete" class="alert alert-success" style="display: none;">
                                <h4>Test successfully completed!</h4>
                            </div>
                            <div id="test-progress" class="progress">
                                <div id="test-progress-bar" class="bar" style="width: 0%;"></div>
                            </div>
                            <pre id="log-area"></pre>
                            <div id="dump-area"></div>
                            <form id="test-form" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
                                <input type="hidden" name="result[name]" value="<?php echo $harness->current_test->name; ?>" />
                                <input type="hidden" name="result[type]" value="<?php echo $harness->current_test->type; ?>" />
                                <input type="hidden" name="result[description]" value="<?php echo $harness->current_test->description; ?>" />
                                <input type="hidden" name="result[value]" id="test-result-value" value="" />
                            </form>
                        </div>
                    <?php else: ?>
                        <div class="span8">
                            <?php if ($harness->tests_time): ?>
                                <br />
                                <div class="alert alert-success">
                                    <h4>Tests were successfully run!</h4>
                                    Tests completed in <?php echo strftime('%M:%S', $harness->tests_time); ?>
                                </div>
                            <?php endif; ?>
                            <?php $folders = $harness->get_all_tests(); ?>
                            <?php $folder_names = array_keys($folders); ?>
                            <h3>
                                <a href="#" id="link-run-all-tests" class="key-handler key-down:link-tab-<?php echo $folder_names[0]; ?> key-up:link-navbar-brand">
                                    Run all the tests!
                                </a>
                                or select some...
                            </h3>
                            <form id="all-tests-form" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
                                <ul id="nav-tabs-container" class="nav-tabs">
                                    <?php $i = 0; ?>
                                    <?php foreach ($folders as $folder => $tests): ?>
                                        <li id="nav-tab-<?php echo $folder; ?>" class="title <?php echo $i === 0 ? 'active' : ''; ?>">
                                            <?php $key_right = Helper::find_in_array($folder_names, $i + 1); ?>
                                            <?php $key_left = Helper::find_in_array($folder_names, $i - 1); ?>
                                            <a href="#tab-<?php echo $folder; ?>" id="link-tab-<?php echo $folder; ?>" class="key-handler key-down:dynamic-#tab-container>.active>a:first-of-type key-up:link-run-all-tests key-right:link-tab-<?php echo $key_right; ?> key-left:link-tab-<?php echo $key_left; ?>">
                                                <?php echo $folder; ?>
                                            </a>
                                        </li>
                                     <?php $i++; endforeach; ?>
                                </ul>
                                <div id="tab-container" class="tab-content">
                                    <?php $i = 0; ?>
                                    <?php foreach ($folders as $folder => $tests): ?>
                                        <div id="tab-<?php echo $folder; ?>" class="tab-page <?php echo $i === 0 ? 'active' : ''; ?>">
                                            <?php $tests_total = count($tests) - 1; ?>
                                            <?php foreach ($tests as $j => $test): ?>
                                                <?php $key_up = $j === 0 ? 'link-tab-' . $folder : 'link-test-' . $folder . '-' . ($j - 1); ?>
                                                <?php $key_down = $j === $tests_total ? 'button-run-tests' : 'link-test-' . $folder . '-' . ($j + 1); ?>
                                                <a href="#checkbox-test-<?php echo $folder; ?>-<?php echo $j; ?>" id="link-test-<?php echo $folder; ?>-<?php echo $j; ?>" class="key-handler checkbox-handler key-up:<?php echo $key_up; ?> key-down:<?php echo $key_down; ?>">
                                                    <label>
                                                        <input id="checkbox-test-<?php echo $folder; ?>-<?php echo $j; ?>" type="checkbox" name="tests[]" value="<?php echo $test->path; ?>" />
                                                        <strong><?php echo $test->name; ?></strong>: <?php echo $test->description; ?>
                                                    </label>
                                                </a>
                                            <?php endforeach; ?>
                                        </div>
                                     <?php $i++; endforeach; ?>
                                </div>
                                <br />
                                <input id="button-run-tests" type="submit" class="submit key-handler key-up:dynamic-#tab-container>.active>a:last-of-type key-down:link-navbar-brand" value="Run tests" />
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
        </div>
        <?php if ($harness->is_testing): ?>
            <script src="assets/js/vendor/benchmark-1.0.0.js"></script>
            <script src="assets/js/helpers.js?x=<?php echo COMMIT_ID; ?>"></script>
            <script src="assets/js/config.js?x=<?php echo COMMIT_ID; ?>"></script>
            <script src="<?php echo $harness->current_test->path; ?>?x=<?php echo COMMIT_ID; ?>"></script>
        <?php else: ?>
            <script>
                var deviceString = '<?php echo str_replace("'", "\'", $_SESSION['device_id']); ?>';
            </script>
            <script src="assets/js/keycodes.js?x=<?php echo COMMIT_ID; ?>"></script>
            <script src="assets/js/index.js?x=<?php echo COMMIT_ID; ?>"></script>
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