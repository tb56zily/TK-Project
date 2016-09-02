'use strict';

/* Controllers */
angular.module('myApp.reviewer', ['ngRoute']).controller('ReviewerCtrl', [
  '$scope', '$location', '$http', 'localStorageService' ,function($scope, $location, $http, localStorageService) {

    // $scope.expertiseArray = [{name:"Not_familiar",id:1,isDefault:true},
    // {name:"Familiar",id:2,isDefault:false},
    // {name:"Intermediate",id:3,isDefault:false},
    // {name:"Advanced",id:4,isDefault:false},
    // {name:"Expert",id:5,isDefault:false}];
    // $scope.currentExpertise = {};

//Update the Review with comments 
$scope.submitReview = function() {
  console.log("inside submitReview")
  $http({
    url: '/submitReview',
    method: "POST",
    data: $scope.review
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  }).success(function(data, status, headers, config) {
  });
}

//Get Submission By Id
$scope.getSubmissionById = function() {
  $http({
    url: '/getSubmissionById',
    method: "GET",
    params: {_id:'2'}
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  }).success(function(data, status, headers, config) {
    console.log(data)
  });
}

  }
]);
