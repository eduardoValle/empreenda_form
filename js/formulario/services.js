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
            obj.clear = function () {
                return {
                    functions: [],
                    name: '',
                    cpf: '',
                    email: '',
                    mobile: '',
                    lattes: ''
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
            obj.new = function () {
                instituicao = [];
            };
            obj.clear = function () {
                return {
                    name: '',
                    cnpj: '',
                    address: '',
                    email: '',
                    phone: '',
                    responsible: '',
                    phone_responsible: '',
                    past_participations: 'Nada a declarar...',
                    term_appointment: '',
                    proposal: '1',
                    partnerships_historic: 'Nada a declarar...',
                    partnerships_between_institutions: 'Nada a declarar...',
                    partnerships_between_campus: 'Nada a declarar...',
                    partnerships_for_pea: 'Nada a declarar...'

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
            obj.new = function () {
                discipline = [];
            };
            obj.clear = function () {
                return {
                    name: '',
                    optional: '1',
                    code_discipline: '',
                    teacher: '',
                    n_students: ''

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
            obj.clear = function () {
                return {
                    name: ''
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
            obj.clear = function () {
                return {
                    own_resource: '1',
                    name: '',
                    partner_features: '',
                    address: '',
                    cnpj: '',
                    contact_person: '',
                    detailing: ''

                };
            };
            return obj;
        }]);
}());