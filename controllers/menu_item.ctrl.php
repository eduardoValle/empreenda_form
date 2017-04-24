<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 20/04/2017
 * Time: 18:43
 */

require_once(EEAURL.'views/menu_page.tpl.php');

/**
 * Registrando uma página customizada no menu do painel.
 */
function wpdocs_register_my_custom_menu_page(){
    add_menu_page(
        __( 'Painel formulário', 'textdomain' ),
        'Painel formulário',
        'manage_options',
        'custompage',
        'my_custom_menu_page',
        plugins_url(ABSPATH . 'wp-admin/images/generic.png'),
        6
    );
}