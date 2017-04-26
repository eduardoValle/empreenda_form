/**
 * Created by motok4 on 05/04/2017.
 */
(function () {
	'use strict';

	angular.module('eea_directives', [])
	.directive('member', ['Member', function (add) {
			return {
				restrict: 'E',
				templateUrl: '../wp-content/plugins/empreenda_form/views/member.html',
				link: function (sc, el, attrs) {}
			};
	}])
		.directive('instituicao', ['Instituicao', function (add) {
			return {
				restrict: 'E',
				templateUrl: '../wp-content/plugins/empreenda_form/views/instituicao.html',
				link: function (sc, el, attrs) {}
			};
	}])
		.directive('othersFeatures', ['OthersFeatures', function (add) {
			return {
				restrict: 'E',
				templateUrl: '../wp-content/plugins/empreenda_form/views/othersFeatures.html',
				link: function (sc, el, attrs) {}
			};
	}])
		.directive('financialResources', ['FinancialResources', function (add) {
			return {
				restrict: 'E',
				templateUrl: '../wp-content/plugins/empreenda_form/views/financialResources.html',
				link: function (sc, el, attrs) {}
			};
	}])
		.directive('discipline', ['Discipline', function (add) {
			return {
				restrict: 'E',
				templateUrl: '../wp-content/plugins/empreenda_form/views/discipline.html',
				link: function (sc, el, attrs) {}
			};
	}]);
}());