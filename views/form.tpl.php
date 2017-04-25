<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 13/04/2017
 * Time: 10:49
 */

/*
* Extracting the real dir of plugins
*/
function getDir(){
    $_dir = dirname( __DIR__ . ".." . DIRECTORY_SEPARATOR);    
    $_dir = explode( DIRECTORY_SEPARATOR, $_dir);
    $dir = $_dir[sizeof($_dir)-1];
    return $dir;
}

function getHtmlScripts( $arr ){
    $html = "";
    foreach( $arr as $k=>$v){
        $html .='<script src="' .$v. '"></script>';
    }
    return $html;
}

function getHtmlStyles( $arr ){
    $html = "";
    foreach( $arr as $k=>$v){
        $html .='<link rel="stylesheet" href="' .$v. '">';
    }
    return $html;
}

function eea_theme() {
    // get the real dir
    $dir = getDir();
    // define the scripts dependencies
    $scripts = array(
        plugins_url().'/' . $dir . '/libs/angular.min.js',
        plugins_url().'/' . $dir . '/js/form.ctrl.js',
        plugins_url().'/' . $dir . '/libs/jquery.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.0/jquery.validate.min.js',
        plugins_url().'/' . $dir . '/libs/jquery.formtowizard.js',
        plugins_url().'/' . $dir . '/libs/form.js'
    );
    // define the styles dependencies
    $styles = array(
        plugins_url().'/' . $dir . '/css/form.css'
    );

    $htmlScripts  = getHtmlScripts( $scripts );
    $htmlStyles = getHtmlStyles( $styles );

    ob_start();
    include "index.html";
    $html = ob_get_clean();

    return $htmlStyles .'
        <div ng-app="eea" ng-controller="EeaForm">
            ' . $html . '
        </div>
    '. $htmlScripts;
}