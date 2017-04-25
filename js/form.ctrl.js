/**
 * Created by Luiz Eduardo on 11/04/2017.
 */
(function () {
	'use strict';

	angular.module('eea', [])
		.filter('wordcount', function () {

			/*
			* @param string input is the string that have to count
			* @param number/boolean limit is a flag that means if we limit by
			                          a number like: 10/1000 which 1000 is
			                          the limit value. Or is false, catch the
			                          attribute maxvalue os the input/textarea
			                          by the id
			* @param string id to catch the maxvalue value
			* @return string in format: <string.length>/<limit>
			*/

			return function (input, limit, id) {
				//verifica se o limit está setado
				var stringSize = input.length;
				if (!!limit) {
					return '' + stringSize + '/' + limit;
				} else {
					if (!!id) {
						var _limit = jQuery("#" + id).attr("maxlength");
						return '' + stringSize + '/' + _limit;
					} else {
						return '';
					}
				}

			}

		})
		.controller('EeaForm', ['$scope', 'Member', 'Instituicao', 'OthersFeatures', 'FinancialResources', 'Discipline', '$http',
        function ($scope, Member, Instituicao, OthersFeatures, FinancialResources, Discipline, $http) {

				$scope.getMemberFunction = (id) => {
					var list = [
					'',
					'Professor da disciplina',
				   'Responsável pela comunicação com a central do PEA',
				   'Tutor de projetos',
				   'Responsável pela formação da banca de avaliadores',
				   'Organizador do ELEA', 'Responsável pelas comunicações analógicas ou digitais de divulgação'
				]
					return list[id];
				}

				$scope.members = {
					functions: '1',
					name: '',
					cpf: '',
					email: '',
					mobile: '',
					lattes: '',
				};

				$scope.discipline = {
					name: '',
					Optional: '1',
					code_discipline: '',
					teacher: '',
					n_students: '',

				};

				$scope.instituicao = {
					name: '',
					cnpj: '',
					address: '',
					email: '',
					phone: '',
					responsible: '',
					phone_responsible: '',
					pastParticipations: '',
					termAppointment: '',
					partnerships: {
						historic: '',
						partnerships_between_institutions: '',
						partnerships_between_campus: '',
						partnerships_for_pea: '',
					}

				};

				$scope.others_features = {
					name: '',

				};

				$scope.financial_resources = {
					own_resource: '',
					name: '',
					partner_features: '',
					address: '',
					cnpj: '',
					contact_person: '',
					detailing: '',

				};

				$scope.signupForm = {
					coordenador: {
						name: '',
						cpf: '',
						address: '',
						email: '',
						phone: '',
						mobile: '',
						responsible: '',
						lattes: '',
						experience: '',
						external_participation: '',
						motivation: '',
						disseminationPlan: ''
					},
					members: Member.get(),
					instituicao: Instituicao.get(),
					discipline: Discipline.get(),
					host_institutions: {
						identification: '',
						name: '',
						address: '',
						maximum_capacity: '',
						optional_features: '',
						others_features: OthersFeatures.get(),

					},
					financial_resources: FinancialResources.get(),
				};




				$scope.addMember = () => {
					if (!!$scope.members.functions &&
						!!$scope.members.name &&
						!!$scope.members.cpf &&
						!!$scope.members.email &&
						!!$scope.members.mobile &&
						!!$scope.members.lattes
					) {
						Member.add($scope.members);
						$scope.members = {
							functions: '1',
							name: '',
							cpf: '',
							email: '',
							mobile: '',
							lattes: '',
						};

						$scope.signupForm.members = Member.get();
					}
				}

				$scope.addInstituicao = () => {
					if (!!$scope.instituicao.name &&
						!!$scope.instituicao.cnpj &&
						!!$scope.instituicao.address &&
						!!$scope.instituicao.email &&
						!!$scope.instituicao.phone &&
						!!$scope.instituicao.responsible &&
						!!$scope.instituicao.phone_responsible &&
						!!$scope.instituicao.pastParticipations &&
						!!$scope.instituicao.termAppointment &&
						!!$scope.instituicao.partnerships.historic &&
						!!$scope.instituicao.partnerships.partnerships_between_institutions &&
						!!$scope.instituicao.partnerships.partnerships_between_campus &&
						!!$scope.instituicao.partnerships.partnerships_for_pea
					) {
						Instituicao.add($scope.instituicao);
						$scope.instituicao = {
							name: '',
							cnpj: '',
							address: '',
							email: '',
							phone: '',
							responsible: '',
							phone_responsible: '',
							pastParticipations: '',
							termAppointment: '',
							partnerships: {
								historic: '',
								partnerships_between_institutions: '',
								partnerships_between_campus: '',
								partnerships_for_pea: '',
							}

						};

						$scope.signupForm.instituicao = Instituicao.get();
					}
				}

				$scope.addDiscipline = () => {
					if (!!$scope.discipline.name &&
						!!$scope.discipline.optativa &&
						!!$scope.discipline.code_disciplina &&
						!!$scope.discipline.teacher &&
						!!$scope.discipline.n_students
					) {
						Discipline.add($scope.discipline);
						$scope.discipline = {
							name: '',
							optativa: '',
							code_disciplina: '',
							teacher: '',
							n_students: '',

						};

						$scope.signupForm.discipline = Discipline.get();
					}
				}

				$scope.addFinancialResources = () => {
					if (!!$scope.financial_resources.own_resource &&
						!!$scope.financial_resources.partner_features &&
						!!$scope.financial_resources.address &&
						!!$scope.financial_resources.cnpj &&
						!!$scope.financial_resources.contact_person &&
						!!$scope.financial_resources.detailing
					) {
						FinancialResources.add($scope.financial_resources);
						$scope.financial_resources = {
							own_resource: '',
							partner_features: '',
							address: '',
							cnpj: '',
							contact_person: '',
							detailing: '',

						};

						$scope.signupForm.financial_resources = FinancialResources.get();
					}
				}

				$scope.addOthersFeatures = () => {
					if (
						!!$scope.others_features.name
					) {
						OthersFeatures.add($scope.others_features);
					$scope.others_features = {
						name: '',

					};

						$scope.signupForm.others_features = OthersFeatures.get();
					}
				}

				$scope.addListener = function (id, validation) {
					var interval = window.setInterval(() => {
						if (jQuery(id).length > 0) {
							jQuery(id).bindFirst('click', (e) => {
								validation(e);
							});
							clearInterval(interval);
						}

					}, 1000);
				};


				$scope.addListener("#step1Next", function (e) {
					$scope.addMember();
				});

				$scope.addListener("#step3Next", function (e) {
					$scope.addInstituicao();
					$scope.addDiscipline();
				});

				$scope.addListener("#step4Next", function (e) {
					$scope.addOthersFeatures()

				});

				$scope.register = function () {
					//if (camposNulos()) {
					//	toastMessage('Nenhum dos campos podem estar em branco!!');
					//	return;
					//} else {

					var formData = new FormData();
					formData.append("termAppointment", jQuery("#termAppointment")[0].files[0]);

					formData.append("signupForm", JSON.stringify($scope.signupForm));

					$http({
						method: 'POST',
						url: '../wp-content/plugins/empreenda_form/views/upload.php',
						data: formData,
						transformRequest: angular.identity,
						headers: {
							'Content-Type': undefined
						}
					}).then(function (response) {
						console.log(response);
						// SUCSESS
						//toastMessage('Email enviado com sucesso!');
					}, function () {
						// ERROR
						//toastMessage('Email não encontrado!');
					});

					//	}

				};


        }])
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
	}])
		.service('Member', [function () {
			var members = [];
			var obj = {};
			obj.get = function () {
				return members;
			};
			obj.add = function (x) {
				members.push(x);
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
			return obj;
	}])
}());
