/**
 * Created by motok4 on 05/04/2017.
 */
 (function () {
	'use strict';
	angular.module('eea_services', [])
	.service('Member', [function () {
			var members = [];
			var obj = {};
			obj.get = function () {
				return members;
			};
			obj.add = function (x) {
				members.push(x);
			};
			obj.clear = ()=>{
				return{
					functions: '1',
					name: '',
					cpf: '',
					email: '',
					mobile: '',
					lattes: '',
				};
			};
			return obj;
	}])
		.service('Instituicao', [function () {
			var instituicao = [];
			var obj = {};
			obj.get = function () {
				return instituicao;
			};
			obj.add = function (x) {
				instituicao.push(x);
			};
			obj.clear=()=>{
				return {
					name: '',
					cnpj: '',
					address: '',
					email: '',
					phone: '',
					responsible: '',
					phone_responsible: '',
					past_participations: '',
					term_appointment: '',
					proposal: '1',
					partnerships_historic: '',
					partnerships_between_institutions: '',
					partnerships_between_campus: '',
					partnerships_for_pea: '',

				};
			};
			return obj;
	}])
		.service('Discipline', [function () {
			var discipline = [];
			var obj = {};
			obj.get = function () {
				return discipline;
			};
			obj.add = function (x) {
				discipline.push(x);
			};
			obj.clear = ()=>{
				return {
					name: '',
					optional: '1',
					code_discipline: '',
					teacher: '',
					n_students: '',

				};
			};
			return obj;
	}])
		.service('OthersFeatures', [function () {
			var othersFeatures = [];
			var obj = {};
			obj.get = function () {
				return othersFeatures;
			};
			obj.add = function (x) {
				othersFeatures.push(x);
			};
			obj.clear= ()=>{
				return {
					name: '',

				};
			};
			return obj;
	}])
		.service('FinancialResources', [function () {
			var financialResources = [];
			var obj = {};
			obj.get = function () {
				return financialResources;
			};
			obj.add = function (x) {
				financialResources.push(x);
			};
			obj.clear= ()=>{
				return {
					own_resource: '1',
					name: '',
					partner_features: '',
					address: '',
					cnpj: '',
					contact_person: '',
					detailing: '',

				};
			};
			return obj;
	}]);
}());