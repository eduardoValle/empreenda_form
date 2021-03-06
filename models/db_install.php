<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 17/04/2017
 * Time: 10:49
 */

require_once(EEAURL.'models/table_criation.php');

global $eea_db_version;
$eea_db_version = '1.0';

function eea_start_db () {
    global $eea_db_version;

    eea_db_install();
    add_option('eea_db_version', $eea_db_version);
}

function eea_desable_db () {
    eea_uninstall_db();
}

add_action('init', 'eea_start_db');
add_action('deactivate_', 'eea_desable_db');
register_activation_hook(__FILE__, 'eea_start_db');
register_deactivation_hook(EEAURL."models/table_criation.php", 'eea_uninstall_db');