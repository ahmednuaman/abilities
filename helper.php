<?php
/**
 * Our helper class, all functions are static
 */
class Helper
{
    public static function find_in_array($array, $index)
    {
        $len = count($array);

        if ($index < $len && $index > -1) {
            return $array[$index];
        } elseif ($index < 0) {
            return $array[$len - 1];
        } else {
            return $array[0];
        }
    }
}