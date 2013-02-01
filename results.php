<?php
// get our commit id
require_once 'commit.php';

// get the harness
require_once 'harness.php';
?>
<!DOCTYPE html>
<html class="no-js">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" href="assets/css/styles.css?x=<?php echo COMMIT_ID; ?>">
        <title>Test harness</title>
    </head>
    <body>
        <div id="container">
            <div class="navbar navbar-static-top">
                <div class="navbar-inner">
                    <a href="index.php" id="link-navbar-brand" class="brand">Abilities</a>
                </div>
            </div>
            <div class="container-fluid">
                <div class="page-header">
                    <h1>
                        Results
                    </h1>
                </div>
                <div class="row-fluid">
                    <ul id="nav-tabs-container" class="nav nav-tabs">
                        <?php $folders = $harness->get_all_tests(); ?>
                        <?php $folder_names = array_keys($folders); ?>
                        <?php $i = 0; ?>
                        <?php foreach ($folders as $folder => $tests): ?>
                            <li id="nav-tab-<?php echo $folder; ?>" class="title <?php echo $i === 0 ? 'active' : ''; ?>">
                                <a href="#tab-<?php echo $folder; ?>" id="link-tab-<?php echo $folder; ?>">
                                    <?php echo $folder; ?>
                                </a>
                            </li>
                         <?php $i++; endforeach; ?>
                    </ul>
                    <div id="tab-container" class="tab-content">
                        <?php $i = 0; ?>
                        <?php foreach ($folders as $folder => $tests): ?>
                            <div id="tab-<?php echo $folder; ?>" class="tab-page <?php echo $i === 0 ? 'active' : ''; ?>">
                                <?php foreach ($tests as $j => $test): ?>
                                    <div class="row-fluid">
                                        <h4><?php echo $test->name; ?></h4>
                                        <p><?php echo $test->description; ?></p>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                         <?php $i++; endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
        <script src="assets/js/index.js?x=<?php echo COMMIT_ID; ?>"></script>
    </body>
</html>