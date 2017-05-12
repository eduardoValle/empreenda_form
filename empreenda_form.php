<?php
defined('ABSPATH') or die('No script kiddies please!');
define("EEAURL", plugin_dir_path( __FILE__ ));

require_once(EEAURL.'controllers/painel/menu_item.ctrl.php');
require_once(EEAURL.'models/db_install.php');
require_once(EEAURL.'views/formulario/form.tpl.php');

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

// CRIANDO UM SHORT CODE PARA O FORMULÁRIO.
//[eea_form]
function eea_form_html($atts){
    return eea_theme();
}

add_shortcode('eea_form', 'eea_form_html'); // Definindo o shortcode para ser inserido onde se quer o formulário.
add_action('admin_menu', 'wpdocs_register_my_custom_menu_page'); // Adicionando item no menu do painel do wordpress.