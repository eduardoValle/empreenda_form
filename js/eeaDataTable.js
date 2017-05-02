/**
 * Created by Luiz Eduardo on 24/04/2017.
 */
(function () {
    'use strict';

    angular.module('ngAppDemo', ['ultimateDataTableServices']).controller('ngAppDemoController', ['$scope','datatable',function($scope,datatable) {

        //Simple example of configuration
        var datatableConfig = {
            "name":"simple_datatable",
            "columns":[
                {
                    "header": "test",
                    "property": "test",
                    "order": true,
                    "type": "text",
                    "edit": true
                },
                {
                    "header": "test2",
                    "property": "test2",
                    "order": true,
                    "type": "text"
                }
            ],
            "pagination": {
                "mode":'local'
            },
            "search": {
                'active': true,
                url:"theUrl",//Required if mode is remote
            },
            "filter": {
                active:true,//Active or not
                highlight:false,
                columnMode:false,
                showButton:false //Show the filter and reset buttons if true
            },
            "edit": {
                "active": false,
                "columnMode": false
            },
            "order": {
                "mode": 'local'
            },
            "remove": {
                "active": false,
                "mode": 'local'
            }
        };

        //Simple exemple of data
        var datatableData = [{"test":1, "test2":1000},{"test":2, "test2":1000},{"test":3, "test2":1000},
            {"test":4, "test2":1000},{"test":5, "test2":1000},{"test":6, "test2":1000},
            {"test":7, "test2":1000}];

        //Init the datatable with his configuration
        $scope.datatable = datatable(datatableConfig);
        //Set the data to the datatable
        $scope.datatable.setData(datatableData);
    }]);
}());