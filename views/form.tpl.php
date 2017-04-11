<?php

function eea_theme() {
    $urlAngular = plugins_url().'/empreenda_form/libs/angular.min.js';
    $urlController = plugins_url().'/empreenda_form/js/form.ctrl.js';
    return '
        <div ng-app="eea" ng-controller="EeaForm">
            <div>
                <h3>Teste formulário!!</h3>
                <button class="">Entrar</button>{{logo}}
            </div>
            <script src="'.$urlAngular.'"></script>
            <script src="'.$urlController.'"></script>
        </div>
    ';
}