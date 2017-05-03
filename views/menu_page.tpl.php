<?php
/**
 * Created by PhpStorm.
 * User: Luiz Eduardo
 * Date: 20/04/2017
 * Time: 18:45
 */

/**
 * Página que exibirá os dados das inscrições no menu.
 */
function my_custom_menu_page() {

    echo '
        <div>
            <link rel="stylesheet" href="../wp-content/plugins/empreenda_form/libs/bootstrap/css/bootstrap.min.css">
            <link rel="stylesheet" href="../wp-content/plugins/empreenda_form/libs/font-awesome/css/font-awesome.min.css">
            <link rel="stylesheet" href="../wp-content/plugins/empreenda_form/libs/ultimate-data-table/ultimate-datatable-3.3.1-SNAPSHOT.css">
            <script src="../wp-content/plugins/empreenda_form/libs/jquery.min.js" type="text/javascript" charset="utf-8"></script>
            <script src="../wp-content/plugins/empreenda_form/libs/bootstrap/js/bootstrap.min.js" type="text/javascript" charset="utf-8"></script>
            <script src="../wp-content/plugins/empreenda_form/libs/angular.min.js" type="text/javascript" charset="utf-8"></script>
            <script src="../wp-content/plugins/empreenda_form/libs/moments.js" type="text/javascript" charset="utf-8"></script>
            <script src="../wp-content/plugins/empreenda_form/libs/ultimate-data-table/ultimate-datatable-3.3.1-SNAPSHOT.js" type="text/javascript" charset="utf-8"></script>
            <script src="../wp-content/plugins/empreenda_form/js/eeaDataTable.js" type="text/javascript" charset="utf-8"></script>
            
             <div ng-app="ngAppDemo" class="container-fluid">
                <div class="row">
                    <h1 align=center>Simple Ultimate DataTable exemple</h1><br>
                    <div ng-controller="ngAppDemoController">
                        <div class="col-md-12 col-lg-12" ultimate-datatable="datatable">
                        </div>
                    </div>
                </div>
             </div>
        </div>
    ';
}