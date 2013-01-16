<?php
/**
* Harness Class
* This is our test harness class that handles the running of one or many tests
*/
class Harness
{
    /**
     * @var boolean a var to check if we're testing at the moment or not
     * @access public
     */
    public $is_testing = false;

    /**
     * Constructor
     *
     * @access public
     */
    public function __construct()
    {
        // start a session
        session_start();
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
}

/**
* TestFile Class
* A simple class that abstracts our test file
*/
class TestFile
{
    /**
     * @var string the name of the test (and file, minus the .js)
     */
    public $name;

    /**
     * @var string the description of the test
     */
    public $description;

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
        $this->description = str_replace('description: ', '', $line);
    }
}

// get our config
require_once 'config.php';

// create a ref to our harness
$harness = new Harness();