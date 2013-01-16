<?php
/**
* API Class
* Simply handles the calls to save test performance details once a test has finished.
* It's auto-init'd so make sure you provide the follow POST params
* name: varchar(255), a unique human readable name for the test, will be converted_to_underscores
* description: text, a description of the test and the result value (eg type, such as 500ms)
* value: blob, the result of the test in as a granular form as possible
*/
class API
{
    /**
     * The MySQL connection
     *
     * @var object
     * @access private
     */
    private $_con;

    /**
     * Constructor
     *
     * @access public
     */
    function __construct()
    {
        // let's connected to our db
        $this->_connect();
    }

    /**
     * Connects to our MySQL database
     * Uses the config.php file required before this class is init'd
     *
     * @access private
     */
    private function _connect()
    {
        // we're gonna use mysqli
        $this->_con = new mysqli(MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DB); // as defined in our config

        // can we haz connection?
        if ($this->_con->connect_error)
        {
            die('Failed to connect to DB');
        }
    }
}