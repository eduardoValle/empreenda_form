/**
 * Created by Luiz Eduardi on 12/05/2017.
 */
/**
 * Created by Luiz Eduardi on 12/05/2017.
 */

(function () {
    'use strict';

    angular.module('eea_directives').controller('OthersFeaturesCtrl', ['$scope', 'OthersFeatures',
        function ($scope, OthersFeatures) {

            $scope.addOthersFeatures = function () {
                if (!!$scope.others_features.name) {
                    OthersFeatures.add($scope.others_features);
                    $scope.others_features = OthersFeatures.clear();
                    $scope.signupForm.others_features = OthersFeatures.get();
                    return true;
                }
                return true;
            };

            $scope.addListener("#step3Next", function (e) {
                if ($scope.addOthersFeatures()) {
                    $scope.$apply();
                } else {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return false;
                }
                jQuery('html,body').scrollTop(0);
            });
        }]);
}());