/**
 * Created by Luiz Eduardo on 11/04/2017.
 */
(function () {
    'use strict';

    angular.module('eea', []);

    angular.module('eea').controller('EeaForm', ['$scope',
        function ($scope) {

            $scope.logo = 'layout/logo.png';
        }]);
}());