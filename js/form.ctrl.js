/**
 * Created by Luiz Eduardo on 11/04/2017.
 */
(function () {
	'use strict';

	angular.module('eea', [])
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
						motivation: ''
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
					return !($scope.signupForm.coordenador.name || $scope.signupForm.coordenador.cpf || $scope.signupForm.coordenador.address || $scope.signupForm.coordenador.email || $scope.signupForm.coordenador.phone || $scope.signupForm.coordenador.mobile || $scope.signupForm.coordenador.responsible || $scope.signupForm.coordenador.lattes || $scope.signupForm.coordenador.experience || $scope.signupForm.coordenador.external_participation || $scope.signupForm.coordenador.motivation)
				}
				$scope.testar=function(){
					var formData = new FormData();
					var obj =  {"coordenador":{"name":"aaaaaaaaaaaaaa","cpf":"","address":"","email":"","phone":"","mobile":"","responsible":"","lattes":"","experience":"","external_participation":"","motivation":""},"members":[],"instituicao":[],"discipline":[],"host_institutions":{"identification":"","name":"","address":"","maximum_capacity":"","optional_features":"","others_features":[]},"financial_resources":[]};
                    formData.append( 'signupForm', JSON.stringify(obj));
                    formData.append( 'termAppointment', jQuery("#file")[0].files[0]);
					var url = window.location.href;
					url = url.replace(/index.php\/+/,'');
					url= url + '../wp-content/plugins/empreenda_form/views/teste.php';
                    $http({
                        method: 'POST',
                        url: url,
                        data: formData,
                        headers: { 'Content-Type': undefined},
						transformRequest: angular.identity
                    }).then(function (data) {
                    	console.log( data );
                        // SUCSESS
                       // toastMessage('Email enviado com sucesso!');
                    }, function () {
                        // ERROR
                        //toastMessage('Email não encontrado!');
                    });
                };
				$scope.addListener = function (id, validation) {
					var interval = window.setInterval(() => {
						if (jQuery(id).length > 0) {
							jQuery(id).bind('click', () => {
								validation();
							});
							clearInterval(interval);
						}
					}, 1000);
				};


				$scope.addListener("#step0Next", function () {
					if(campusCoordenador()){
						alert("Preencha os campos corretamente!");			
					}
				});

				$scope.addListener("#step1Next", function () {
					//campusMember;
					//addMember();
				});

				/*				function camposNulos() {

									return !(
										//Coordenador
										$scope.signupForm.name || $scope.signupForm.cpf || $scope.signupForm.address || $scope.signupForm.email || $scope.signupForm.phone || $scope.signupForm.mobile || $scope.signupForm.coordCurso || $scope.signupForm.cvLattes || $scope.signupForm.experience || $scope.signupForm.external_participation || $scope.signupForm.motivation ||
										//Outros membros da instituição ou membros externos que compõem a equipe local do PEA
										$scope.signupForm.nameFunc || $scope.signupForm.nameMember || $scope.signupForm.cpfMember || $scope.signupForm.emailMember || $scope.signupForm.mobileMember || $scope.signupForm.cvLattesMember ||
										//Proposta
										$scope.signupForm.proposal ||
										//Instituição/Campus
										$scope.signupForm.nameInstitution || $scope.signupForm.cnpjInstitution || $scope.signupForm.addressInstitution || $scope.signupForm.emailInstitution || $scope.signupForm.phoneInstitution || $scope.signupForm.responsibleInstitution || $scope.signupForm.pastParticipations || $scope.signupForm.termAppointment ||
										//Disciplina		 
										$scope.signupForm.nameDIscipline || $scope.signupForm.discOptional || $scope.signupForm.codeDiscipline || $scope.signupForm.teacher || $scope.signupForm.nStudents ||
										//Parcerias estabelecidas na comunidade local para ações empreendedoras
										$scope.signupForm.partnerships || $scope.signupForm.partnershipsForPea || $scope.signupForm.partnershipsBetweenInstitutions || $scope.signupForm.partnershipsBetweenCampus ||
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
					$http({
						method: 'POST',
						url: 'auth/formPea',
						data: $scope.signupForm
					}).then(function () {
						// SUCSESS
						toastMessage('Email enviado com sucesso!');
					}, function () {
						// ERROR
						toastMessage('Email não encontrado!');
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
