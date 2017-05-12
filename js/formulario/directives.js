/**
 * Created by motok4 on 05/04/2017.
 */
(function () {
    angular.module('eea_directives', [])

        .directive('instituicao', ['Instituicao', function () {
            var url = location.href;
            url = url.replace(/index.php/, '');
            return {
                restrict: 'E',
                templateUrl: url + '../wp-content/plugins/empreenda_form/views/formulario/instituicao.html',
                controller: 'InstitutionCtrl',
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
                //controller: 'DisciplineCtrl',
                link: function (sc, el, attrs) {
                }
            };
        }])
        .directive('member', ['Member', function () {
            var url = location.href;
            url = url.replace(/index.php/, '');
            return {
                restrict: 'E',
                templateUrl: url + '../wp-content/plugins/empreenda_form/views/formulario/member.html',
                controller: 'MemberCtrl',
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
                controller: 'OthersFeaturesCtrl',
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
                controller: 'FinancialResourcesCtrl',
                link: function (sc, el, attrs) {
                }
            };
        }]);
}());