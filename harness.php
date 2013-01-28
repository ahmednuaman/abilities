<?php
/**
* Harness Class
* This is our test harness class that handles the running of one or many tests
*/
class Harness
{
    /**
     * @var API a reference to our API
     * @access private
     */

    private $_api;

    /**
     * @var boolean a var to check if we're testing at the moment or not
     * @access public
     */
    public $is_testing = false;

    /**
     * @var TestFile the current test to be ran
     * @access public
     */
    public $current_test;

    /**
     * @var int the time it took tests to complete
     * @access public
     */
    public $tests_time;

    /**
     * Constructor
     *
     * @access public
     */
    public function __construct()
    {
        // check to see if we're in testing or we're about to start
        $this->_handle_request();
    }

    /**
     * Gets all the current tests from our TESTS_FOLDER
     *
     * @access public
     *
     * @return array an array of (TestFile)tests
     */
    public function get_all_tests()
    {
        // create our tests array
        $tests = array();

        // read all the files in the tests folder
        foreach (scandir(TESTS_FOLDER) as $file)
        {
            $file = TESTS_FOLDER . $file;

            if (pathinfo($file, PATHINFO_EXTENSION) === 'js')
            {
                array_push($tests, new TestFile($file));
            }
        }

        return $tests;
    }

    /**
     * Checks to see if we're in testing or we're about to start
     *
     * @access private
     */
    private function _handle_request()
    {
        // are we about to start testing?
        if (isset($_POST['tests']))
        {
            // right let's stick these tests into a sessions serialised array
            $_SESSION['remaining_tests'] = serialize($_POST['tests']);

            // get the time that we start the tests
            $_SESSION['tests_started'] = time();
        }

        // have we got some results
        if (isset($_POST['results']))
        {
            // load our api
            $this->_load_api();

            // handle el request
            $this->_api->add_results($_POST['results']);
        }

        // can we haz remaining tests?
        if (isset($_SESSION['remaining_tests']))
        {
            // ok, so we're testing
            $this->is_testing = true;

            // decode the remaining tests array and get the next one
            $remaining_tests = unserialize($_SESSION['remaining_tests']);

            // get next test
            $next_test = array_shift($remaining_tests);

            // and save the remaining tests, if any
            if (count($remaining_tests) > 0)
            {
                $_SESSION['remaining_tests'] = serialize($remaining_tests);
            }
            else
            {
                // end the session
                unset($_SESSION['remaining_tests']);
            }

            // and on let's test!
            $this->current_test = new TestFile(TESTS_FOLDER . $next_test . '.js');
        }

        // have we finished testing?
        if (!isset($_SESSION['remaining_tests']) && !$this->current_test && isset($_SESSION['tests_started']))
        {
            // get the time we finished tests
            $this->tests_time = time() - (int)$_SESSION['tests_started'];

            // save it to the api
            if (!$this->_api)
            {
                $this->_load_api();
            }

            $this->_api->

            // remove tests started
            unset($_SESSION['tests_started']);
        }

        // has a device id been passed to us?
        if (isset($_POST['device_id']))
        {
            $_SESSION['device_id'] = $_POST['device_id'];
        }
        // otherwise if a device_id isn't sent and one hasn't been assigned, let's fake one
        elseif (!isset($_SESSION['device_id']))
        {
            $_SESSION['device_id'] = 'fake-' . time();
        }
    }

    /**
     * Loads a reference to the API
     *
     * @access private
     */
    private function _load_api()
    {
        // get our api
        require_once 'api.php';

        // init it
        $this->_api = new API();
    }
}

/**
* TestFile Class
* A simple class that abstracts our test file
*/
class TestFile
{
    /**
     * @var string the name of the test (and file, minus the .js)
     * @access public
     */
    public $name;

    /**
     * @var string the description of the test
     * @access public
     */
    public $description;

    /**
     * @var string the path to the test js file
     * @access public
     */
    public $path;

    /**
     * Constructor
     * We pass the file path so we can load it and read the second line
     *
     * @param string $file the path to the file
     *
     * @access public
     */
    public function __construct($file)
    {
        // set the name
        $this->name = pathinfo($file, PATHINFO_FILENAME);

        // set the path
        $this->path = $file;

        // get the description
        $this->_get_description($file);
    }

    /**
     * Get the file's description
     *
     * @access private
     *
     * @param string $file the path to the file
     */
    private function _get_description($file)
    {
        // open the file
        $handler = fopen($file, 'r');

        // read the first line
        fgets($handler);

        // now the second line
        $line = fgets($handler);

        // close the file
        fclose($handler);

        // set the description
        $this->description = trim(htmlspecialchars(str_replace('description: ', '', $line)));
    }
}

// start a session
session_start();

// get our config
require_once 'config.php';

// create a ref to our harness
$harness = new Harness();