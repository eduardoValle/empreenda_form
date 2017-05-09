/**
 * Created by Luiz Eduardo on 24/04/2017.
 */
(function () {
    'use strict';

    angular.module('ngAppDemo', ['ultimateDataTableServices']).controller('ngAppDemoController', ['$scope', '$http', 'datatable',
        function ($scope, $http, datatable) {

            var coordenadores = [];

            //Simple example of configuration
            var datatableConfig = {
                'name': 'simple_datatable',
                'columns': [
                    {
                        'header': 'Coordenador',
                        'property': 'name',
                        'order': true,
                        'type': 'text',
                        'edit': true
                    },
                    {
                        'header': 'Celular',
                        'property': 'mobile',
                        'order': true,
                        'type': 'text'
                    },
                    {
                        'header': 'E-mail',
                        'property': 'email',
                        'order': true,
                        'type': 'text'
                    },
                    {
                        'header': 'Instituição',
                        'property': 'institution',
                        'order': true,
                        'type': 'text'
                    }
                ],
                'pagination': {
                    'mode': 'local'
                },
                'search': {
                    'active': true,
                    url: 'theUrl' //Required if mode is remote
                },
                'filter': {
                    active: true,//Active or not
                    highlight: false,
                    columnMode: false,
                    showButton: false //Show the filter and reset buttons if true
                },
                'edit': {
                    'active': false,
                    'columnMode': false
                },
                'order': {
                    'mode': 'local'
                },
                'remove': {
                    'active': false,
                    'mode': 'local'
                }
            };

            $http({
                method: 'GET',
                url: '/wordpress/wp-content/plugins/empreenda_form/controllers/selecionaDados.php'
            }).then(function (response) {
                console.log(response.data);
                $scope.coordenadores = response.data;

                //Inserindo as configurações no data table.
                $scope.datatable = datatable(datatableConfig);

                //Inserindo os dados no data table.
                $scope.datatable.setData($scope.coordenadores);

            }, function () {
                console.log("Não foi possível retornar os dados do Coordenador!!");
            });
        }]);
}());