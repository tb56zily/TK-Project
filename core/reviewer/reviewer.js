'use strict';

/* Controllers */
angular.module('myApp.reviewer', ['ngRoute']).controller('ReviewerCtrl', [
  '$scope', '$location', '$http', 'localStorageService' ,function($scope, $location, $http, localStorageService) {


//Add a new Review from my account
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
