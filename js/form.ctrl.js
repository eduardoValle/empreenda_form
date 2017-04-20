/**
 * Created by Luiz Eduardo on 11/04/2017.
 */
(function () {
    'use strict';

    angular.module('eea', []);

    angular.module('eea').controller('EeaForm', ['$scope',
        function ($scope) {

        	$scope.title='';
        	$scope.description = '';
        	$scope.index = null;

            $scope.logo = 'layout/logo.png';

            $scope.instituicao=[
	            {
	            	title:"Card title",
	            	description: "Some quick example text to build on the card title and make up the bulk of the card's content."
	            },

            ];
            $scope.inserir = ()=>{
            	if( $scope.index == null ){
	            	$scope.instituicao.push( {
	            		title: $scope.title,
	            		description: $scope.description,
	            	});
	        		$scope.title = '';
	        		$scope.description = '';
            	}else{
            		console.log( $scope.index );
            		$scope.instituicao[$scope.index].title = $scope.title;
            		$scope.instituicao[$scope.index].description = $scope.description;
            		$scope.index = null;
            	}

            }
        	$scope.editar = (card, index)=>{
    			$scope.index = index;
    			$scope.title = card.title;
        		$scope.description = card.description;
        		console.log( "INDEX: ", $scope.index  );

        	};


        }]);
}());