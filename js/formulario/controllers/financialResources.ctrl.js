/**
 * Created by Luiz Eduardi on 12/05/2017.
 */
/**
 * Created by Luiz Eduardi on 12/05/2017.
 */

(function () {
    'use strict';

    angular.module('eea_directives').controller('FinancialResourcesCtrl', ['$scope', 'FinancialResources',
        function ($scope, FinancialResources) {

            $scope.financial = 5;
            $scope.financialAction = function (status) {
                $scope.financial = status;
                $scope.financialOption = 1;
            };

            $scope.financialOption = 1;
            $scope.financialOptionAction = function (status) {
                $scope.financialOption = status;
            };

            $scope.financialRegisterOwn = function () {
                $scope.addFinancialResources();
                $scope.financialOption = 2;
            };

            $scope.financialRegister = function () {

                $scope.addFinancialResources();
                $scope.financial = 0;
                $scope.financialOption = 0;
            };

            $scope.addFinancialResources = function () {
                if (!!$scope.financial_resources.partner_features &&
                    !!$scope.financial_resources.detailing
                ) {
                    FinancialResources.add($scope.financial_resources);
                    $scope.financial_resources = FinancialResources.clear();
                    $scope.signupForm.financial_resources = FinancialResources.get();
                    $scope.removeValidation([
                        "#own_resource",
                        "#name",
                        "#partner_features",
                        "#address",
                        "#cnpj",
                        "#contact_person",
                        "#detailing"
                    ]);
                }
            };

            $scope.addListener("#step4Next", function () {
                jQuery('html,body').scrollTop(0);
                window.setTimeout(function () {
                    $scope.financial_resources = $scope.retrieveFinancialResourcesFromCache();
                    $scope.others_features = $scope.retrieveOtherFeatureFromCache();
                    $scope.$apply();
                }, 300);
            });

            $scope.addListener("#SaveAccount", function () {
                $scope.addFinancialResources();
                $scope.$apply();
            });
        }]);
}());