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

				$scope.members = {
					functions: '',
					name: '',
					cpf: '',
					email: '',
					mobile: '',
					lattes: '',
				};

				$scope.discipline = {
					name: '',
					Optional: '',
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
					Member.add($scope.members);
					$scope.members = {
						functions: '',
						name: '',
						cpf: '',
						email: '',
						mobile: '',
						lattes: '',
					};
					console.log(Member.get());
				}

				$scope.addInstituicao = () => {
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
					console.log(Instituicao.get());
				}

				$scope.addDiscipline = () => {
					Discipline.add($scope.discipline);
					$scope.discipline = {
						name: '',
						optativa: '',
						code_disciplina: '',
						teacher: '',
						n_students: '',

					};
					console.log(Discipline.get());
				}

				$scope.addFinancialResources = () => {
					FinancialResources.add($scope.financial_resources);
					$scope.financial_resources = {
						own_resource: '',
						partner_features: '',
						address: '',
						cnpj: '',
						contact_person: '',
						detailing: '',

					};
					console.log(FinancialResources.get());
				}

				$scope.addOthersFeatures = () => {
					OthersFeatures.add($scope.others_features);
					$scope.others_features = {
						name: '',

					};
					console.log(OthersFeatures.get());
				}


				function campusCoordenador() {
					return !($scope.signupForm.coordenador.name && $scope.signupForm.coordenador.cpf && $scope.signupForm.coordenador.address && $scope.signupForm.coordenador.email && $scope.signupForm.coordenador.phone && $scope.signupForm.coordenador.mobile && $scope.signupForm.coordenador.responsible && $scope.signupForm.coordenador.lattes && $scope.signupForm.coordenador.experience && $scope.signupForm.coordenador.external_participation && $scope.signupForm.coordenador.motivation)
				}

				function campusMember() {
					return !($scope.members.name && $scope.members.cpf && $scope.members.email && $scope.members.mobile && $scope.members.lattes)
				}
			
				function campusInstituicao() {
					return !(
						
						$scope.instituicao.name && $scope.instituicao.cnpj && $scope.instituicao.address && $scope.instituicao.email && $scope.instituicao.phone && $scope.instituicao.responsible && $scope.instituicao.phone_responsible && $scope.instituicao.pastParticipations && $scope.instituicao.termAppointment && 
							 
							 
							 $scope.discipline.name && $scope.discipline.Optional && $scope.discipline.code_discipline && $scope.discipline.teacher && $scope.discipline.n_students && 
							 
							 
							 $scope.partnerships.historic && $scope.partnerships.partnerships_for_pea && $scope.partnerships.partnerships_between_institutions && $scope.partnerships.partnerships_between_campus)
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

				$scope.addListener("#step0Next", function (e) {
					if (campusCoordenador()) {
						//e.stopImmediatePropagation();

					} else {
						//alert("Teste")
					}
					e.preventDefault();
					return false;
				});
			
				$scope.addListener("#step1Next", function (e) {
					if (campusMember()) {
						//e.stopImmediatePropagation();

					} else {
						//alert("GO")
					}
					e.preventDefault();
					return false;
				});
			
				$scope.addListener("#step3Next", function (e) {
					if (campusInstituicao()) {
						//e.stopImmediatePropagation();

					} else {
						//alert("GO")
					}
					e.preventDefault();
					return false;
				});



				/*				

				function camposNulos() {

					return !(
						//Outros membros da instituição ou membros externos que compõem a equipe local do PEA
						$scope.signupForm.nameFunc || $scope.signupForm.nameMember || $scope.signupForm.cpfMember || $scope.signupForm.emailMember || $scope.signupForm.mobileMember || $scope.signupForm.cvLattesMember ||
						//Proposta
						$scope.signupForm.proposal ||
						//Instituição/Campus
						
						//Recursos econômicos apresentados como contrapartida	
						$scope.signupForm.idLocal || $scope.signupForm.nameLocal || $scope.signupForm.addressLocal || $scope.signupForm.maximumCapacity || $scope.signupForm.optionsCounterpart || $scope.signupForm.others ||
						//Plano de divulgação do PEA	
						$scope.signupForm.disseminationPlan ||
						//Recursos financeiros apresentados como contrapartida, quando houver	
						$scope.signupForm.resources || $scope.signupForm.namePartner || $scope.signupForm.featuresValue || $scope.signupForm.addressPartner || $scope.signupForm.responsibleContact || $scope.signupForm.detailingResources);
				}
				*/

				function agreeMember() {
					return !($scope.signupForm.agreeMember == false);
				}

				function agreeResources() {
					return !($scope.signupForm.agreeMember == false);
				}

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
   						headers: {'Content-Type': undefined}
					}).then(function ( response) {
						console.log( response );
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
