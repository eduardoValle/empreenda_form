<?php
/**
 * Página que exibirá os dados das inscrições no menu.
 *
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 20/04/2017
 * Time: 18:45
 */

function my_custom_menu_page() {
    echo '
        <link href="'. plugins_url() . '/empreenda_form/libs/bootstrap/css/bootstrap.min.css" type="text/css" rel="stylesheet">
        <link href="'. plugins_url() . '/empreenda_form/libs/data-tables/css/dataTables.bootstrap.min.css" type="text/css" rel="stylesheet">

        <div ng-app="eea.painel" ng-controller="PainelCtrl" class="col-lg-12">
            <h1>Teste</h1>{{logo}}
    
            <table class="table table-striped table-bordered table-hover" id="dataTab">
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Título</th>
                </thead>
    
                <tfoot>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Título</th>
                </tfoot>
    
                <tbody>
                    <tr ng-repeat="dado in dados">
                        <td>{{dado.nome}}</td>
                        <td>{{dado.numero}}</td>
                        <td>{{dado.teste}}</td>
                    </tr>
                </tbody>
            </table>
            
            <script src="'. plugins_url() . '/empreenda_form/libs/angular.min.js" type="text/javascript"></script>
            <script src="'. plugins_url() . '/empreenda_form/libs/data-tables/js/jquery.js" type="text/javascript"></script>
            <script src="'. plugins_url() . '/empreenda_form/libs/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
            <script src="'. plugins_url() . '/empreenda_form/libs/data-tables/js/jquery.dataTables.min.js" type="text/javascript"></script>
            <script src="'. plugins_url() . '/empreenda_form/libs/data-tables/js/dataTables.bootstrap.min.js" type="text/javascript"></script>
            <script src="'. plugins_url() . '/empreenda_form/js/eeaDataTable.js" type="text/javascript"></script>
            <script>
            $("#dataTab").dataTable();
            </script>
        </div>
    ';
}