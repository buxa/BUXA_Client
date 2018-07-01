// app.js
// =============================================================================
angular.module('mainApp', ['ngAnimate', 'ui.router'])
.controller('signInController', ['$scope', '$http', function($scope, $http) {

    $scope.formData = {};

    $scope.processForm = function() {
    	var encodedString = 'username=' +
                encodeURIComponent($scope.formData.username) +
                '&pass=' +
                encodeURIComponent($scope.formData.pass);

        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
        	console.log(data);
        	if(data.type == 'T')
            	window.location.href = '../testerDesktop/index.html';
            else if(data.type == 'A')
            	window.location.href = '../analystDesktop/index.html';
        })
        .error(function(data, status, headers, config) {
            
        })
    };

}]);