/**
 * Created by Luiz Eduardi on 12/05/2017.
 */

(function () {
    'use strict';

    angular.module('eea_directives').controller('InstitutionCtrl', ['$scope', 'Instituicao', 'Discipline',
        function ($scope, Instituicao, Discipline) {

            $scope.addInstituicao = function () {
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
                ) {
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
                        "#instituicao_historic",
                        "#partnerships_for_pea",
                        "#partnerships_between_institutions",
                        "#partnerships_between_campus"
                    ]);
                } else {
                    $("#SignupForm").validate().form();
                }
            };

            $scope.addDiscipline = function () {
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

            $scope.addListener("#step1Next", function (e) {
                window.setTimeout(function () {
                    $scope.discipline = $scope.retrieveDisciplineFromCache();
                    $scope.instituicao = $scope.retrieveInstitutionFromCache();
                    $scope.$apply();
                }, 300);

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
        }]);
}());
