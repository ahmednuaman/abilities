<?php
/**
* API Class
* Simply handles the calls to save test performance details once a test has finished.
*/
class API
{
    /**
     * @var resource a reference to the mysqli resource
     * @access private
     */
    private $_con;

    /**
     * Adds a test result into our DB
     *
     * @access private
     *
     * @param int $device_id the DB ID of the device entry
     * @param string $name the name of the test, usually this is the JS test file name (minus .js)
     * @param string $description the description of the test
     * @param blob $value the resulting value of the test
     *
     * @return int the insert ID of the test result entry
     */
    private function _add_result($device_id, $name, $type, $description, $value)
    {
        // run the insert query
        $query = $this->_con->query('INSERT INTO ' . MYSQL_TABLE_TEST_RESULT . ' (`device_id`, `name`, `type`, `description`, `value`) ' .
            'VALUES ("' . $device_id . '", "' . $name . '", "' . $type . '", "' . $description . '", "' . $value . '")');

        // return the insert ID, just for lulz
        return $this->_con->insert_id;
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

    /**
     * Gets or generates a device ID
     *
     * @access private
     *
     * @param string $device the device ID, if any
     * @param string $user_agent the browser user agent
     *
     * @return int the database device ID
     */
    private function _get_device_id($device, $user_agent)
    {
        // run el query
        $query = $this->_con->query('SELECT `id` FROM ' . MYSQL_TABLE_DEVICE . ' WHERE device = "' . $device . '" AND user_agent = "' . $user_agent . '"');

        if ($query->num_rows === 1)
        {
            // set the device id
            $device_id = $query->fetch_object()->id;
        }
        else
        {
            // create a record for this device
            $query = $this->_con->query('INSERT INTO ' . MYSQL_TABLE_DEVICE . ' (`device`, `user_agent`) VALUES ("' . $device . '", "' . $user_agent . '")');

            $device_id = $this->_con->insert_id;
        }

        return $device_id;
    }

    /**
     * Adds test results into our DB
     * It also checks to see if a device has been registered yet
     * This method accepts an array
     *
     * @access public
     *
     * @param array $results an array of results
     */
    public function add_results($results)
    {
        // connect to el db
        $this->_connect();

        // try and get the device's id and user agent
        $device = $this->_con->real_escape_string($_SESSION['device_id']);
        $user_agent = $this->_con->real_escape_string($_SERVER['HTTP_USER_AGENT']);

        // check our db to see if this device exists
        $device_id = $this->_get_device_id($device, $user_agent);

        // loop through our results and add them to the db
        foreach ($results as $result)
        {
            // sanatise the result
            foreach ($result as $key => $value)
            {
                $result[$key] = $this->_con->real_escape_string($value);
            }

            $this->_add_result($device_id, $result['name'], $result['type'], $result['description'], $result['value']);
        }
    }
}