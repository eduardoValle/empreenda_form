/**
 * Created by Luiz Eduardo on 24/04/2017.
 */
(function () {
    'use strict';

    angular.module('eea.painel', ['datatables']).controller('PainelCtrl', ['$scope', '$http',
        function ($scope, $http) {

            $scope.logo = 'layout/logo.png';

            $scope.dados = [
                {id: 1, nome: 'Luiz Eduardo', numero: '32 2131-1231', teste: 'Teste teste teste'},
                {id: 2, nome: 'Kamilla', numero: '32 1232-3434', teste: 'Teste2 teste2 teste2'},
                {id: 3, nome: 'Thales', numero: '32 5544-4566', teste: 'Teste3 teste3 teste3'},
                {id: 4, nome: 'Donatello', numero: '32 4767-7666', teste: 'Teste4 teste4 teste4'}
            ];

            // console.log(window.location + '/wordpress/wp-content/plugins/empreenda_form/controllers/teste.php');

            $http({
                method: 'POST',
                headers: { 'Content-Type': undefined},
                url:  '/wordpress/wp-content/plugins/empreenda_form/controllers/teste.php',
                data: {
                    email: 'email',
                    pass: 'pass'
                }
            }).then(function successCallback(response) {
                console.log("DEU CERTO!!");
                console.log(response);
            }, function errorCallback(error) {
                console.log("DEU ERRADO!!");
            });
        }]);
}());