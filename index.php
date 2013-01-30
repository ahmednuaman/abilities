<?php
// set el time
$time = time();

// get our helper
require_once 'helper.php';

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
                <a href="index.php" id="link-navbar-brand" class="brand key-down:link-run-all-tests key-up:button-run-tests">Abilities</a>
            </div>
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
                        <div id="test-complete" class="alert alert-block alert-success" style="display: none;">
                            <h4>Test successfully completed!</h4>
                        </div>
                        <?php if ($harness->current_test->warnings): ?>
                            <div class="alert alert-block alert-warning">
                                <span class="label label-warning">Warning!</span>
                                <?php echo $harness->current_test->warnings; ?>
                            </div>
                        <?php endif; ?>
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
                            <br />
                            <div class="alert alert-block alert-success">
                                <h4>Tests were successfully run!</h4>
                                Tests completed in <?php echo strftime('%M:%S', $harness->tests_time); ?>
                            </div>
                        <?php endif; ?>
                        <?php $folders = $harness->get_all_tests(); ?>
                        <?php $folder_names = array_keys($folders); ?>
                        <h3>
                            <a href="#" id="link-run-all-tests" class="key-down:link-tab-<?php echo $folder_names[0]; ?> key-up:link-navbar-brand">
                                Run all the tests!
                            </a>
                            or select some...
                        </h3>
                        <form id="all-tests-form" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
                            <ul id="nav-tabs-container" class="nav nav-tabs">
                                <?php $i = 0; ?>
                                <?php foreach ($folders as $folder => $tests): ?>
                                    <li class="title <?php echo $i === 0 ? 'active' : ''; ?>">
                                        <a href="#tab-<?php echo $folder; ?>" id="link-tab-<?php echo $folder; ?>" class="key-down:dynamic-div.tab-page>label[0]>input key-up:link-run-all-tests key-right:link-tab-<?php echo Helper::find_in_array($folder_names, $i + 1); ?> key-left:link-tab-<?php echo Helper::find_in_array($folder_names, $i - 1); ?>">
                                            <?php echo $folder; ?>
                                        </a>
                                    </li>
                                 <?php $i++; endforeach; ?>
                            </ul>
                            <div id="tab-container" class="tab-content">
                                <?php $i = 0; ?>
                                <?php foreach ($harness->get_all_tests() as $folder => $tests): ?>
                                    <div id="tab-<?php echo $folder; ?>" class="tab-page <?php echo $i === 0 ? 'active' : ''; ?>">
                                        <?php foreach ($tests as $test): ?>
                                            <label>
                                                <input id="checkbox-test-<?php echo $test->name; ?>" type="checkbox" name="tests[]" value="<?php echo $test->path; ?>">
                                                <strong><?php echo $test->name; ?></strong>: <?php echo $test->description; ?>
                                            </label>
                                            <br>
                                        <?php endforeach ?>
                                    </div>
                                 <?php $i++; endforeach; ?>
                            </div>
                            <br>
                            <button id="button-run-tests" type="submit" class="btn btn-block btn-large btn-primary">
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
            <script src="assets/js/index.js?x=<?php echo $time; ?>"></script>
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