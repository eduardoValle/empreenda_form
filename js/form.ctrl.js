/**
 * Created by Luiz Eduardo on 11/04/2017.
 */
(function () {
	'use strict';

	angular.module('eea', ['eea_directives', 'eea_services'])
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
				];
					return list[id];
				}
				$scope._SignupForm = () => {
					//retorna um objeto membro vazio
					$scope.members = Member.clear();
					//retorna um objeto disciplina vazio
					$scope.discipline = Discipline.clear();
					//retorna um objeto instituicao vazio
					$scope.instituicao = Instituicao.clear();
					//retorna um objeto vazio
					$scope.others_features = OthersFeatures.clear();
					//retorna um objeto vazio
					$scope.financial_resources = FinancialResources.clear();

					return {
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
						members: [],
						instituicao: [],
						discipline: [],
						host_institutions: {
							identification: '',
							name: '',
							address: '',
							maximum_capacity: '',
							optional_features: '',
						},
						others_features: [],
						financial_resources: []
					};
				};

				$scope.signupForm = $scope._SignupForm();
				$scope.edit = false;

				$scope.removeValidation = (id) => {
					if (!Array.isArray(id)) {
						$(id).rules("remove")
							.data('rule-required', false)
							.removeAttr('required');
					} else {
						id.map(i => {
							if (typeof (i) === 'string') {
								try {
									$(i).rules("remove");
									$(i).data('rule-required', false)
									$(i).removeAttr('required');
								} catch (e) {}
							}
						});
					}
				}

				$scope.addMember = () => {
					if (!!$scope.members.functions &&
						!!$scope.members.name &&
						!!$scope.members.cpf &&
						!!$scope.members.email &&
						!!$scope.members.mobile &&
						!!$scope.members.lattes
					) {
						Member.add($scope.members);
						$scope.members = Member.clear();

						$scope.signupForm.members = Member.get();
						$scope.removeValidation([
							"#members_functions",
							"#member_name",
							"#member_cpf",
							"#member_mobile",
							"#member_email",
							"#member_lattes"
						]);
						return true;
					}
					return false;
				}

				$scope.addInstituicao = () => {
					if (!!$scope.instituicao.name &&
						!!$scope.instituicao.cnpj &&
						!!$scope.instituicao.address &&
						!!$scope.instituicao.email &&
						!!$scope.instituicao.phone &&
						!!$scope.instituicao.responsible &&
						!!$scope.instituicao.phone_responsible &&
						!!$scope.instituicao.past_participations &&
						!!$scope.instituicao.partnerships_historic &&
						!!$scope.instituicao.partnerships_between_institutions &&
						!!$scope.instituicao.partnerships_between_campus &&
						!!$scope.instituicao.partnerships_for_pea &&
						(
							$scope.signupForm.discipline.length > 0 || (!!$scope.discipline.name &&
								!!$scope.discipline.optional &&
								!!$scope.discipline.code_discipline &&
								!!$scope.discipline.teacher &&
								!!$scope.discipline.n_students
							)
						)
					) {
						$scope.term = false;
						Instituicao.add($scope.instituicao);


						$scope.instituicao = Instituicao.clear();
						$scope.signupForm.instituicao = Instituicao.get();
						$scope.removeValidation([
							"#proposal",
							"#instituicao_name",
							"#cnpj_instituicao",
							"#past_participations",
							"#instituicao_address",
							"#instituicao_email",
							"#instituicao_phone",
							"#instituicao_responsible",
							"#phone_responsible",
							"#term_appointment",
							"#instituicao_historic",
							"#partnerships_for_pea",
							"#partnerships_between_institutions",
							"#partnerships_between_campus",
						]);
					} else {
						$("#SignupForm").validate().form();
					}
				}

				$scope.addDiscipline = () => {
					if (!!$scope.discipline.name &&
						!!$scope.discipline.optional &&
						!!$scope.discipline.code_discipline &&
						!!$scope.discipline.teacher &&
						!!$scope.discipline.n_students
					) {
						Discipline.add($scope.discipline);
						$scope.discipline = Discipline.clear();

						$scope.signupForm.discipline = Discipline.get();
						$scope.removeValidation([
							"#discipline_name",
							"#code_discipline",
							"#discipline_teacher",
							"#n_students"
						]);
					}
				}

				$scope.addFinancialResources = () => {
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

				$scope.addOthersFeatures = () => {
					OthersFeatures.add($scope.others_features);
					$scope.others_features = OthersFeatures.clear();
					$scope.signupForm.others_features = OthersFeatures.get();
					return true;

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
					if ($scope.addMember()) {
						$scope.$apply();
					} else {
						if ($scope.signupForm.members.length > 0) {
							$scope.$apply();
						} else {
							e.stopImmediatePropagation();
							e.preventDefault();
							return false;
						}
					}
				});

				$scope.addListener("#step2Next", function (e) {
					$scope.addInstituicao();
					$scope.addDiscipline();
					if (!$("#SignupForm").validate().form() ||
						$scope.signupForm.instituicao.length == 0 ||
						$scope.signupForm.discipline.length == 0
					) {
						e.stopImmediatePropagation();
						e.preventDefault();
						return false;
					} else {
						$scope.$apply();
					}
				});

				$scope.addListener("#step3Next", function (e) {
					if ($scope.addOthersFeatures()) {
						$scope.$apply();
					} else {
						e.stopImmediatePropagation();
						e.preventDefault();
						return false;
					}

				});

				$scope.addListener("#SaveAccount", function () {
					$scope.addFinancialResources();
					$scope.$apply();

				});

				// ************** EDIT ************** //


				$scope.editItem = function (type, item) {
					if (!!type) {
						$scope.edit = true;
						switch (type) {
							case 'member':
								$scope.members = item;
								break;
							case 'discipline':
								$scope.discipline = item;
								break;
							case 'institution':
								$scope.instituicao = item;
								break;
							case 'financial_resources':
								$scope.financial_resources = item;
								break;
							case 'financial_resources':
								$scope.financial_resources = item;
								break;
						}
					} else {
						console.error("type undefined");
					}

				};
				$scope.saveItem = function (type) {
					if (!!type) {
						$scope.edit = false;
						switch (type) {
							case 'member':
								$scope.members = angular.copy(Member.get());
								break;
							case 'discipline':
								$scope.discipline = angular.copy(Discipline.get());
								break;
							case 'institution':
								$scope.instituicao = angular.copy(Instituicao.get());
								break;
							case 'financial_resources':
								$scope.financial_resources = angular.copy(FinancialResources.get());;
								break;
						}
					} else {
						console.error("type undefined");
					}

				};
				$scope.removeItem = function (type, index) {
					if (!!type) {
						$scope.edit = false;
						switch (type) {
							case 'member':
								$scope.signupForm.members.splice(index, 1);
								break;
							case 'discipline':
								$scope.signupForm.discipline.splice(index, 1);
								break;
							case 'institution':
								$scope.signupForm.instituicao.splice(index, 1);
								break;
							case 'financial_resources':
								$scope.signupForm.financial_resources.splice(index, 1);
								break;

						}
					} else {
						console.error("type undefined");
					}

				};



				// ************** REGISTER ************** //
				$scope.loader = (str) => {
					if (!!str) {
						if (str == 'show') {
							$(".preloader").show();
							$(".status").show();
						} else {
							$(".preloader").hide();
							$(".status").hide();
						}
					} else {
						$(".preloader").hide();
						$(".status").hide();
					}
				};
				$scope.register = function () {
					//if (camposNulos()) {
					//	toastMessage('Nenhum dos campos podem estar em branco!!');
					//	return;
					//} else {
					$scope.loader('show');
					var formData = new FormData();
					formData.append("term_appointment", jQuery("#term_appointment")[0].files[0]);

					formData.append("signupForm", JSON.stringify($scope.signupForm));

					$http({
						method: 'POST',
						url: '/wordpress/wp-content/plugins/empreenda_form/controllers/validateData.php',
						data: formData,
						transformRequest: angular.identity,
						headers: {
							'Content-Type': undefined
						}
					}).then(function (response) {
						console.log(response);
						//limpando o form;
						$scope.signupForm = $scope._SignupForm();

						// SUCSESS
						//toastMessage('Email enviado com sucesso!');
						$scope.loader('hide');
						jQuery.toast({
							text: "Sua proposta foi enviada com sucesso", // Text that is to be shown in the toast
							heading: 'Parabéns', // Optional heading to be shown on the toast
							icon: 'success', // Type of toast icon
							showHideTransition: 'fade', // fade, slide or plain
							allowToastClose: true, // Boolean value true or false
							hideAfter: false, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
							stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
							position: 'mid-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
							textAlign: 'left', // Text alignment i.e. left, right or center
							loader: true, // Whether to show loader or not. True by default
							loaderBg: '#9EC600', // Background color of the toast loader
						});

						setTimeout(function () {
							window.location.href = "http://www.empreendaemacao.com.br/"; //will redirect to your blog page (an ex: blog.html)
						}, 2000);

					}, function () {
						// ERROR
						//toastMessage('Email não encontrado!');
						$scope.loader('hide');
					});

					//	}

				};


        }]);


}());
