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
function _readir( $dir, $target ){
    $files=array();
    if (is_dir($dir)){
      if ($dh = opendir($dir)){
        while (($file = readdir($dh)) !== false   ){
          if( $file!="." && $file!=".." ) $files[]= $target.$file;
        }
        closedir($dh);
      }
    }
    return $files;
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
    // define the plugin path
    $path = dirname( __DIR__ . ".." . DIRECTORY_SEPARATOR) ;
    // define the plugin url
    $plugins_url = plugins_url().'/' . $dir;
    // define the scripts dependencies

    $scripts = array(
        plugins_url().'/' . $dir . '/libs/angular.min.js',
        plugins_url().'/' . $dir . '/js/form.ctrl.js',
        'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.1/jquery.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.0/jquery.validate.min.js',
        plugins_url().'/' . $dir . '/libs/jquery.formtowizard.js',
        plugins_url().'/' . $dir . '/libs/form.js',

    );

    // define the styles dependencies
    $styles = array_merge(
         _readir( $path. '/css/',  $plugins_url. '/css/'),
        'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css'
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