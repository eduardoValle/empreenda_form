/**
 * Created by Luiz Eduardo on 11/04/2017.
 */
(function () {
    'use strict';

    angular.module('eea', ['ngMask', 'eea_directives', 'eea_services'])
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
                if (!input) return '';
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

                $scope.removeValidation = function(id){
                    if (!Array.isArray(id)) {
                        $(id).rules("remove")
                            .data('rule-required', false)
                            .removeAttr('required');
                    } else {
                        id.map(i => {
                            if (typeof(i) === 'string') {
                                try {
                                    $(i).rules("remove");
                                    $(i).data('rule-required', false);
                                    $(i).removeAttr('required');
                                } catch (e) {}
                            }
                        });
                    }
                };

                $scope.addListener = function (id, validation) {
                    var interval = window.setInterval(function () {
                        if (jQuery(id).length > 0) {
                            jQuery(id).bindFirst('click', function (e) {
                                validation(e);
                            });
                            clearInterval(interval);
                        }
                    });
                };


                // ************** EDIT ITEM ************** //

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


                // ************** SAVE ITEM ************** //

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


                // ************** REMOVE ITEM ************** //

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


                $scope.loader = function (str) {
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


                // ************** REGISTER ITEM BD ************** //

                $scope.register = function () {

                    if(!$("#SignupForm").validate().form()) return;

                    $scope.loader('show');
                    var formData = new FormData();
                    formData.append("term_appointment", jQuery("#term_appointment")[0].files[0]);
                    formData.append("signupForm", JSON.stringify($scope.signupForm));

                    $http({
                        method: 'POST',
                        url: '/wordpress/wp-content/plugins/empreenda_form/controllers/formulario/validateData.php',
                        data: formData,
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    }).then(function (response) {

                        $scope.loader('hide');
                        switch (response.data.type) {

                            case 'success':
                                //Limpando o formulário.
                                // $scope.signupForm = $scope.SignupForm();
                                // localStorage.clear();
                                messageToast('Parabéns!!', 'Sua proposta foi enviada com sucesso!!', 'success');
                                //Redirecionando para a página principal.
                                // setTimeout(function () {
                                //     window.location.href = "http://www.empreendaemacao.com.br/";
                                // }, 2000);
                                 break;

                            case 'error database':
                                messageToast('Erro!', 'Erro ao conectar com o banco de dados!! \nPor favor, entre em contato com nossos administradores!!', 'error');
                                registrarLog($scope.signupForm, response);
                                break;

                            case 'insert database':
                                messageToast('Erro!', 'Erro ao inserir dados no banco de dados!! \nPor favor, entre em contato com nossos administradores!!', 'error');
                                registrarLog($scope.signupForm, response);
                                break;

                            default:
                                messageToast('Erro!!', 'Erro ao efetuar cadastro!!', 'error');
                                registrarLog($scope.signupForm, response);
                        }
                    }, function () {
                        // ERROR
                        messageToast('Erro!', 'Erro ao efetuar cadastro', 'error');
                        $scope.loader('hide');
                    });
                };

                /**
                 * Exibe a mensagem com um toast na tela.
                 * @param header
                 * @param text
                 * @param type
                 */
                function messageToast(header, text, type) {
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

                /**
                 * Registra no log o erro ocorrido.
                 * @param dados
                 * @param error
                 */
                function registrarLog(dados, error) {

                    var obj = {};
                    obj.error = error.data;
                    obj.coordenador = dados.coordenador.name;

                    var log = new FormData();
                    log.append("log_error", JSON.stringify(obj));
                    $http({
                        method: 'POST',
                        url: '/wordpress/wp-content/plugins/empreenda_form/controllers/formulario/log.php',
                        data: log,
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    }).then(function (res) {
                        // SUCCESS
                        console.log('Erro registrado na tebela de log!!');
                    }, function () {
                        // ERROR
                        console.log('Erro ao cadastrar log no banco de dados!!');
                    });
                }

                window.setInterval(function () {
                    if (!!$scope.signupForm) {
                        $scope.setInCache("SignupForm", $scope.signupForm);
                    }
                    if (!!$scope.members.name) {
                        $scope.setInCache("members", $scope.members);
                    }
                    if (!!$scope.discipline.name) {
                        $scope.setInCache("discipline", $scope.discipline);
                    }
                    if (!!$scope.instituicao.cnpj) {
                        $scope.setInCache("instituicao", $scope.instituicao);
                    }
                    if (!!$scope.others_features.name) {
                        $scope.setInCache("others_features", $scope.others_features);
                    }
                    if (!!$scope.financial_resources.name) {
                        $scope.setInCache("financial_resources", $scope.financial_resources);
                    }
                }, 10000);

                $scope._SignupFormClear = function () {
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
                            optional_features: ''
                        },
                        others_features: [],
                        financial_resources: []
                    };
                };

                $scope.getFromCache = function (cache) {
                    if (!!cache && cache !== 'undefined') {
                        return JSON.parse(cache);
                    } else {
                        return $scope._SignupFormClear();
                    }
                };

                $scope.setInCache = function (key, value) {
                    if (!!value && value !== 'undefined') {
                        localStorage.setItem(key, JSON.stringify(value));
                    }
                };

                $scope.retrieveMembersFromCache = function () {
                    var cache = localStorage.getItem("members");
                    return $scope.getFromCache(cache);
                };

                $scope.retrieveDisciplineFromCache = function () {
                    var cache = localStorage.getItem("discipline");
                    return $scope.getFromCache(cache);
                };

                $scope.retrieveInstitutionFromCache = function () {
                    var cache = localStorage.getItem("instituicao");
                    return $scope.getFromCache(cache);
                };

                $scope.retrieveOtherFeatureFromCache = function () {
                    var cache = localStorage.getItem("others_features");
                    return $scope.getFromCache(cache);
                };

                $scope.retrieveFinancialResourcesFromCache = function () {
                    var cache = localStorage.getItem("financial_resources");
                    return $scope.getFromCache(cache);
                };

                $scope._SignupFormRetrieveFromCache = function () {
                    var cache = localStorage.getItem("SignupForm");
                    return $scope.getFromCache(cache);
                };

                $scope.itemCheckedFromCache = function () {
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
