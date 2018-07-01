// app.js
// =============================================================================
var formApp = angular.module('formApp', ['ngAnimate', 'ui.router']);

// configuring routes 
// =============================================================================
formApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
            controller: 'formController'
        })

        // nested states 
        // url will be /form/subject
        .state('form.subject', {
            url: '/subject',
            templateUrl: 'form-subject.html'
        })

        // url will be /form/testCases
        .state('form.testCases', {
            url: '/testCases',
            templateUrl: 'form-testCases.html'
        })

        // url will be /form/collectionMeasureas
        .state('form.collectionMeasureas', {
            url: '/collectionMeasureas',
            templateUrl: 'form-collectionMeasureas.html'
        })

        // url will be /form/collectionMeasureas
        .state('form.instructions', {
            url: '/instructions',
            templateUrl: 'form-instructions.html'
        })

        // url will be /form/payment
        .state('form.submitSession', {
            url: '/submitSession',
            templateUrl: 'form-submitSession.html'
        });

    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/subject');
});


// Controllers for the form
// =============================================================================
formApp.controller('formController', ['$scope', '$http', function($scope, $http) {

    $scope.formData = {};
    $scope.testCaseID = {};
    $scope.prevTestCase = {};
    $scope.testCasesList = [];
    $scope.CMList = [];
    $scope.selectedCM = [];
    $scope.instructionsList = [];
    var modal, showen = 0;

    // function to process the form
    $scope.processForm = function() {
        alert("cool");
    };

    $scope.boxModel = function() {
        modal = document.getElementById('boxModel');
        var btn = document.getElementById("startBtn");
        var span = document.getElementsByClassName("close")[0];

        modal.style.display = "block";
    };

    $scope.spanBoxModelClose = function() {
        modal.style.display = "none";
    };

    $scope.init = function() {
        if($scope.testCasesList[0] == null)
            $scope.generateTestCaseList();
        if($scope.CMList[0] == null)
            $scope.generateCollectionMeasuresList();
        if($scope.prevTestCase != $scope.formData.testCaseID)
           $scope.generateInstructionsList();
    };

    $scope.generateTestCaseList = function() {                
        $http({
            method: 'POST',
            url: 'http://localhost:3000/listOfTestCaseType',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            for(var i in data) {
                $scope.testCasesList.push(data[i]);
            }
        })
        .error(function(data, status, headers, config) {
            $scope.errorMsg = 'Could not access data';
        })
    };


    $scope.generateCollectionMeasuresList = function() {                  
        $http({
            method: 'POST',
            url: 'http://localhost:3000/getAllCollectionMeasures',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            for(var i in data) {
                $scope.CMList.push(data[i]);
            }
        })
        .error(function(data, status, headers, config) {
            $scope.errorMsg = 'Could not access data';
        })
    };

    $scope.saveSelectedCM = function(){
      angular.forEach($scope.CMList, function(cm){
        if (cm.checked) 
            $scope.selectedCM.push(cm);
      })
    }

    $scope.generateInstructionsList = function() {

        $scope.prevTestCase = $scope.formData.testCaseID;

        var encodedString = 'tastCaseID=' +
                encodeURIComponent($scope.formData.testCaseID);        

        $http({
            method: 'POST',
            url: 'http://localhost:3000/findInstructionByTastCase',
            data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            $scope.instructionsList = [];
            for(var i in data) {
                $scope.instructionsList.push(data[i]);
            }
        })
        .error(function(data, status, headers, config) {
            $scope.errorMsg = 'Could not access data';
        })
    };

    

}]);