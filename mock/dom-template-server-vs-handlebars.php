<?php
$feed = unserialize(file_get_contents('http://api.flickr.com/services/feeds/photos_public.gne?format=php_serial'));
$html = '';

foreach ($feed['items'] as $entry) {
    $html .= '<li><h1>' . $entry['title'] . '</h1><p>' . $entry['description'] . '</p></li>';
}

echo '<ul>' . $html . '</ul>';