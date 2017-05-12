/**
 * Created by motok4 on 05/04/2017.
 */
(function () {
    'use strict';

    angular.module('eea_directives', [])
        .directive('member', ['Member', function () {
            var url = location.href;
            url = url.replace(/index.php/, '');
            return {
                restrict: 'E',
                templateUrl: url + '../wp-content/plugins/empreenda_form/views/formulario/member.html',
                link: function (sc, el, attrs) {
                }
            };
        }])
        .directive('instituicao', ['Instituicao', function () {
            var url = location.href;
            url = url.replace(/index.php/, '');
            return {
                restrict: 'E',
                templateUrl: url + '../wp-content/plugins/empreenda_form/views/formulario/instituicao.html',
                link: function (sc, el, attrs) {
                }
            };
        }])
        .directive('othersFeatures', ['OthersFeatures', function () {
            var url = location.href;
            url = url.replace(/index.php/, '');
            return {
                restrict: 'E',
                templateUrl: url + '../wp-content/plugins/empreenda_form/views/formulario/othersFeatures.html',
                link: function (sc, el, attrs) {
                }
            };
        }])
        .directive('financialResources', ['FinancialResources', function () {
            var url = location.href;
            url = url.replace(/index.php/, '');
            return {
                restrict: 'E',
                templateUrl: url + '../wp-content/plugins/empreenda_form/views/formulario/financialResources.html',
                link: function (sc, el, attrs) {
                }
            };
        }])
        .directive('discipline', ['Discipline', function () {
            var url = location.href;
            url = url.replace(/index.php/, '');
            return {
                restrict: 'E',
                templateUrl: url + '../wp-content/plugins/empreenda_form/views/formulario/discipline.html',
                link: function (sc, el, attrs) {
                }
            };
        }]);
}());