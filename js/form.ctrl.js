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
				if(!input) return '';
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
    		$scope.edit = false;
			$scope.agreeMember = false;
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
					$scope.agreeMember &&
					!!$scope.members.lattes
				) {
					if( $scope.functions.professor || $scope.functions.comunicacao || 
						$scope.functions.tutor || $scope.functions.banca || 
						$scope.functions.organizacao || $scope.functions.digitais ){

						$scope.itemChecked.push(angular.copy($scope.functions));
						for(var i in $scope.functions){
							if($scope.functions[i]){
								$scope.members.functions.push({'function': angular.copy($scope.mapItem[i])});
							}
						}
						$scope.functions = {
							professor:false,
							comunicacao:false,
							tutor:false,
							banca:false,
							organizacao:false,
							digitais:false
						};
					}else{
						messageToast('Defina alguma função para o membro', 'Erro!!', 'error');
						return false;
					}

					Member.add($scope.members);
					$scope.members = Member.clear();

					$scope.signupForm.members = Member.get();
					$scope.removeValidation([
						"#members_functions",
						"#member_name",
						"#member_cpf",
						"#member_mobile",
						"#member_email",
						"#member_lattes",
						"#agreeMember"
					]);
					return true;
				}
				$("#SignupForm").validate().form();
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
					!!$scope.instituicao.partnerships_for_pea
					)
				{
					$scope.term = false;
					$scope.addDiscipline();
					$scope.instituicao.discipline = angular.copy(Discipline.get());
					Instituicao.add($scope.instituicao);
					Discipline.new();

					var tipoProposta = $scope.instituicao.proposal;
					$scope.instituicao = Instituicao.clear();
					$scope.instituicao.proposal = tipoProposta;

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
						"#partnerships_between_campus"
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
					$scope.signupForm.instituicao.discipline = angular.copy(Discipline.get());
					$scope.removeValidation([
						"#discipline_name",
						"#code_discipline",
						"#discipline_teacher",
						"#n_students"
					]);
				}
			};


			/** RECURSOS FINANCEIROS **/

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


			$scope.addFinancialResources = () => {
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
			}

			$scope.addOthersFeatures = () => {
				if (!!$scope.others_features.name) {
					OthersFeatures.add($scope.others_features);
					$scope.others_features = OthersFeatures.clear();
					$scope.signupForm.others_features = OthersFeatures.get();

					return true;
				}
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
				});
			};

				$scope.addListener("#step0Next", function (e) {
					jQuery('html,body').scrollTop(0);
					$scope.members = $scope.retrieveMembersFromCache();
					$scope.$apply();
				});
				$scope.addListener("#step1Next", function (e) {
					window.setTimeout(()=>{
						$scope.discipline = $scope.retrieveDisciplineFromCache();
						$scope.instituicao = $scope.retrieveInstitutionFromCache();
						$scope.$apply();
					},300);

					if ($scope.addMember()) {
						$scope.$apply();
					} else {
						if ($scope.signupForm.members.length > 0) {
							$scope.$apply();
						} else {
							$scope.$apply();
							e.stopImmediatePropagation();
							e.preventDefault();
							return false;
						}
					}
					jQuery('html,body').scrollTop(0);
				});


			$scope.addListener("#step2Next", function (e) {
				$scope.addInstituicao();
				$scope.addDiscipline();
				if (!$("#SignupForm").validate().form() ||
					$scope.signupForm.instituicao.length === 0
				) {
					e.stopImmediatePropagation();
					e.preventDefault();
					return false;
				} else {
					$scope.$apply();
				}
				jQuery('html,body').scrollTop(0);
			});

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

			$scope.addListener("#step4Next", function(e){
					jQuery('html,body').scrollTop(0);
					window.setTimeout(()=>{
						$scope.financial_resources = $scope.retrieveFinancialResourcesFromCache();
						$scope.others_features = $scope.retrieveOtherFeatureFromCache();
						$scope.$apply();
					},300);
				});

			$scope.addListener("#SaveAccount", function () {
				$scope.addFinancialResources();
				$scope.$apply();

			});

			$scope.mapItem =  {
				professor: 'Professor de disciplina',
				comunicacao: 'Responsável pela comunicação com a central do PEA',
				tutor: 'Tutor de projetos',
				banca: 'Responsável pela formação da banca de avaliadores',
				organizacao: 'Responsável pela organização do ELEA',
				digitais: 'Responsável pelas comunicações analógicas ou digitais de divulgação'
			};

			$scope.functions = {
				professor:false,
				comunicacao:false,
				tutor:false,
				banca:false,
				organizacao:false,
				digitais:false
			}
			$scope.checkFunction = (val)=>{
				if( $scope.itemChecked.length > 0){
					var comunicacao = 0;
					var banca = 0;
					var organizacao = 0;
					var digitais = 0;

					for( var i = 0; i<$scope.itemChecked.length; i++ ){
						var item = $scope.itemChecked[i];
						comunicacao += (item.comunicacao?1:0);
						banca += (item.banca?1:0);
						organizacao += (item.organizacao?1:0);
						digitais += (item.digitais?1:0);
					}
					try{
						if( eval(val) >=1 ){
							$scope.functions[val] = false;
							messageToast('Essa função só pode ser atribuída a um membro!', 'Erro!!', 'error');
						}
					}catch(e){}
				}
			};

			// ************** EDIT ************** //

			$scope.editItem = function (type, item) {
				if (!!type) {
					$scope.edit = true;
					switch (type) {
						case 'member':
							$scope.members = item;
							break;
						case 'discipline':
							$scope.instituicao.discipline = item;
							break;
						case 'institution':
							$scope.instituicao = item;
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
							$scope.instituicao.discipline = angular.copy(Discipline.get());
							break;
						case 'institution':
							$scope.instituicao = angular.copy(Instituicao.get());
							break;
						case 'financial_resources':
							$scope.financial_resources = angular.copy(FinancialResources.get());
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
							$scope.itemChecked.splice(index, 1);
							break;
						case 'discipline':
							$scope.signupForm.instituicao.discipline.splice(index, 1);
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
					if (str === 'show') {
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
					$scope.loader('hide');
					switch(response.data){
						case 'success':
							//Limpando o form.
							// $scope.signupForm = $scope.SignupForm();
							console.log('teste');
							localStorage.clear();
                            messageToast('Sua proposta foi enviada com sucesso!!', 'Parabéns!!', 'success');
							//Redirecionando para a página principal.
							setTimeout(function () {
								window.location.href = "http://www.empreendaemacao.com.br/";
							}, 2000);
							break;
						case 'error database':
							messageToast('Erro ao conectar com o banco de dados!! \nPor favor, entre em contato com nossos administradores!!', 'Erro!', 'error');
							break;
						default:
							messageToast('Erro ao efetuar cadastro!!', 'Erro!!', 'error');
					}
				}, function () {
					// ERROR
					messageToast('Erro ao efetuar cadastro', 'Erro!', 'error');
					$scope.loader('hide');
				});
			};

			function messageToast(text, header, type) {
				jQuery.toast({
					text: text, // Text that is to be shown in the toast
					heading: header, // Optional heading to be shown on the toast
					icon: type, // Type of toast icon
					showHideTransition: 'fade', // fade, slide or plain
					allowToastClose: true, // Boolean value true or false
					hideAfter: false, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
					stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
					position: 'mid-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
					textAlign: 'left', // Text alignment i.e. left, right or center
					loader: true, // Whether to show loader or not. True by default
					loaderBg: '#9EC600' // Background color of the toast loader
				});
			}

			window.setInterval(()=>{
				if( !!$scope.signupForm){
					$scope.setInCache("SignupForm", $scope.signupForm);
				}
				if( !!$scope.members.name ){
					$scope.setInCache("members", $scope.members);
				}
				if( !!$scope.discipline.name){
					$scope.setInCache("discipline", $scope.discipline);
				}
				if( !!$scope.instituicao.cnpj){
					$scope.setInCache("instituicao", $scope.instituicao);
				}
				if( !!$scope.others_features.name){
					$scope.setInCache("others_features", $scope.others_features);
				}
				if( !!$scope.financial_resources.name){
					$scope.setInCache("financial_resources", $scope.financial_resources);
				}

			},10000);

			$scope._SignupFormClear = () => {
				//retorna um objeto membro vazio
				$scope.members = Member.clear();
				$scope.setInCache("members", $scope.members);
				//retorna um objeto disciplina vazio
				$scope.discipline = Discipline.clear();
				$scope.setInCache("discipline", $scope.discipline);
				//retorna um objeto instituicao vazio
				$scope.instituicao = Instituicao.clear();
				$scope.setInCache("instituicao", $scope.instituicao);
				//retorna um objeto vazio
				$scope.others_features = OthersFeatures.clear();
				$scope.setInCache("others_features", $scope.others_features);
				//retorna um objeto vazio
				$scope.financial_resources = FinancialResources.clear();
				$scope.setInCache("financial_resources", $scope.financial_resources);
				$scope.itemChecked = [];
				$scope.setInCache("itemChecked", $scope.itemChecked);
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
			$scope.getFromCache = (cache)=>{
				if(!!cache && cache !== 'undefined'){
					return JSON.parse(cache);
				}else{
					return $scope._SignupFormClear();
				}
			};
			$scope.setInCache = (key, value)=>{
				if(!!value && value !== 'undefined'){
					localStorage.setItem(key, JSON.stringify(value));
				}
			};
			$scope.retrieveMembersFromCache= ()=>{
				var cache = localStorage.getItem("members");
				return $scope.getFromCache(cache);
			};
			$scope.retrieveDisciplineFromCache= ()=>{
				var cache = localStorage.getItem("discipline");
				return $scope.getFromCache(cache);
			};
			$scope.retrieveInstitutionFromCache= ()=>{
				var cache = localStorage.getItem("instituicao");
				return $scope.getFromCache(cache);
			};
			$scope.retrieveOtherFeatureFromCache= ()=>{
				var cache = localStorage.getItem("others_features");
				return $scope.getFromCache(cache);
			};
			$scope.retrieveFinancialResourcesFromCache= ()=>{
				var cache = localStorage.getItem("financial_resources");
				return $scope.getFromCache(cache);
			};

			$scope._SignupFormRetrieveFromCache = () => {
				var cache = localStorage.getItem("SignupForm");
				return $scope.getFromCache(cache);
			};
			$scope.itemCheckedFromCache = () => {
				var cache = localStorage.getItem('itemChecked');
				return $scope.getFromCache(cache);
			};

			$scope.signupForm = $scope._SignupFormRetrieveFromCache();
			
			$scope.members = $scope.retrieveMembersFromCache();
			$scope.discipline = $scope.retrieveDisciplineFromCache();
			$scope.instituicao = $scope.retrieveInstitutionFromCache();
			$scope.others_features = $scope.retrieveOtherFeatureFromCache();
			$scope.financial_resources = $scope.retrieveFinancialResourcesFromCache();
			$scope.itemChecked = $scope.itemCheckedFromCache();
        }]);

}());
