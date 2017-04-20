<?php
defined('ABSPATH') or die('No script kiddies please!');
define("EEAURL", plugin_dir_path( __FILE__ ));

require_once(EEAURL.'models/db_install.php');
require_once(EEAURL.'views/form.tpl.php');

/*
Plugin Name: Formulário de cadastro do Empreenda. Em Ação!
Plugin URI:  https://github.com/eduardoValle/empreenda_form
Description: Formulário da cadasdro de participantes do programa empreenda!
Version:     1.0.0
Author:      Luiz Eduardo
Author URI:  https://github.com/eduardoValle
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: wporg
Domain Path: /languages
*/

// CRIANDO UM SHIRT CODE PARA O FORMULÁRIO.
//[eea_form]
function eea_form_html($atts){
    return eea_theme();
}

add_shortcode('eea_form', 'eea_form_html');

//addCoordinator();