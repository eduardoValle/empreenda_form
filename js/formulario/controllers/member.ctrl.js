/**
 * Created by Luiz Eduardi on 12/05/2017.
 */

(function () {
    'use strict';

    angular.module('eea_directives').controller('MemberCtrl', ['$scope', 'Member',
        function ($scope, Member) {

            $scope.logo = 'layout/logo.png';

            $scope.getMemberFunction = function (id) {
                var list = [
                    '',
                    'Professor de disciplina',
                    'Tutor de projetos',
                    'Responsável pela comunicação com a central do PEA',
                    'Responsável pela formação da banca de avaliadores',
                    'Responsável pela organização do ELEA',
                    'Responsável pelas comunicações analógicas ou digitais de divulgação'
                ];
                return list[id];
            };

            $scope.mapItem = {
                professor: 'Professor de disciplina',
                tutor: 'Tutor de projetos',
                comunicacao: 'Responsável pela comunicação com a central do PEA',
                banca: 'Responsável pela formação da banca de avaliadores',
                organizacao: 'Responsável pela organização do ELEA',
                digitais: 'Responsável pelas comunicações analógicas ou digitais de divulgação'
            };

            $scope.functions = {
                professor: false,
                tutor: false,
                comunicacao: false,
                banca: false,
                organizacao: false,
                digitais: false
            };

            $scope.checkFunction = function (val) {
                if ($scope.itemChecked.length > 0) {
                    var comunicacao = 0;
                    var banca = 0;
                    var organizacao = 0;
                    var digitais = 0;

                    for (var i = 0; i < $scope.itemChecked.length; i++) {
                        var item = $scope.itemChecked[i];
                        comunicacao += (item.comunicacao ? 1 : 0);
                        banca += (item.banca ? 1 : 0);
                        organizacao += (item.organizacao ? 1 : 0);
                        digitais += (item.digitais ? 1 : 0);
                    }
                    try {
                        if (eval(val) >= 1) {
                            $scope.functions[val] = false;
                            messageToast('Erro!!', 'Apenas um membro pode ter essa função!', 'error');
                        }
                    } catch (e) {}
                }
            };

            $scope.addMember = function () {
                if (!!$scope.members.functions &&
                    !!$scope.members.name &&
                    !!$scope.members.cpf &&
                    !!$scope.members.email &&
                    !!$scope.members.mobile &&
                    // $scope.agreeMember &&
                    !!$scope.members.lattes
                ) {
                    if ($scope.functions.professor || $scope.functions.comunicacao ||
                        $scope.functions.tutor || $scope.functions.banca ||
                        $scope.functions.organizacao || $scope.functions.digitais) {

                        $scope.itemChecked.push(angular.copy($scope.functions));
                        for (var i in $scope.functions) {
                            if ($scope.functions[i]) {
                                $scope.members.functions.push({'function': angular.copy($scope.mapItem[i])});
                            }
                        }
                        $scope.functions = {
                            professor: false,
                            tutor: false,
                            comunicacao: false,
                            banca: false,
                            organizacao: false,
                            digitais: false
                        };
                    } else {
                        messageToast('Erro!!', 'Defina alguma função para o membro', 'error');
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
                        "#member_lattes"
                        // "#agreeMember"
                    ]);
                    return true;
                }

                $scope.addListener("#step0Next", function () {
                    jQuery('html,body').scrollTop(0);
                    $scope.members = $scope.retrieveMembersFromCache();
                    $scope.$apply();
                });

                $("#SignupForm").validate().form();
                return false;

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
            };
        }]);
}());
