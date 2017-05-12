<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 13/04/2017
 * Time: 10:49
 */

function getHtmlScripts( $arr ){
    $html = "";
    foreach( $arr as $k=>$v){
        $html .='<script src="' .$v. '"></script>';
    }
    return $html;
}

function getHtmlStyles($arr){
    $html = "";
    foreach($arr as $k => $v){
        $html .= '<link rel="stylesheet" href="' . $v . '">';
    }
    return $html;
}

function eea_theme() {
    // get the real dir
    $dir = plugins_url() . '/empreenda_form/';
    // define the scripts dependencies
    $scripts = array(
        $dir . '/libs/angular.min.js',
        $dir . '/libs/ngMask/ngMask.min.js',
        $dir . '/libs/jquery.min.js',
        $dir . '/libs/jquery.validate.min.js',
        $dir . '/libs/jquery.formtowizard.min.js',
        $dir . '/libs/jquery.toast/jquery.toast.min.js',
        $dir . '/js/formulario/directives.js',
        $dir . '/js/formulario/form.ctrl.js',
        $dir . '/js/formulario/services.js',
        $dir . '/js/formulario/form.js'
    );

    // define the styles dependencies
    $styles = array(
        $dir . '/libs/jquery.toast/jquery.toast.min.css',
        $dir . '/css/form.css'
    );

    $htmlScripts  = getHtmlScripts($scripts);
    $htmlStyles = getHtmlStyles($styles);

    ob_start();
    include "index.html";
    $html = ob_get_clean();

    return $htmlStyles .'
        <div ng-app="eea" ng-controller="EeaForm">
            ' . $html . '
        </div>
    '. $htmlScripts;
}