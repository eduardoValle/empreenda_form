<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 25/04/2017
 * Time: 10:16
 */

global $wpdb;

$wpdb->insert('user',
    array(
        'name' => 'Luiz',
        'column2' => 123
    ),
    array(
        '%s',
        '%d'
    )
);