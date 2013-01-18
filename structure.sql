-- Create syntax for TABLE 'device'
CREATE TABLE `device` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_agent` varchar(1000) NOT NULL DEFAULT '',
  `device` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `USER_AGENT` (`user_agent`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Create syntax for TABLE 'test_result'
CREATE TABLE `test_result` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `device_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `value` longtext NOT NULL,
  `tested` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `DEVICE_ID` (`device_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;