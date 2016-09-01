'use strict';

/* Controllers */
angular.module('myApp.chair', ['ngRoute']).controller('ChairCtrl', [
  '$scope', '$location', '$http', 'localStorageService' ,function($scope, $location, $http, localStorageService) {

    //Get details of all chairpersons
    $scope.getAllChair = function() {
      $http({
        url: '/getAllChair',
        method: "GET"
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function(data, status, headers, config) {
        console.log(data)
      });
    }

    //Get details of all Reviewrs
    $scope.getAllReviewers = function() {
      $http({
        url: '/getAllReviewers',
        method: "GET"
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function(data, status, headers, config) {
        console.log(data)
      });
    }

    //Get details of all Authors
    $scope.getAllAuthors = function() {
      $http({
        url: '/getAllAuthors',
        method: "GET"
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function(data, status, headers, config) {
        console.log(data)
      });
    }

    $scope.assignReviewer = function() {
      console.log("inside assignReviewer")
      $http({
        url: '/assignReviewer',
        method: "POST",
        data: $scope.review
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function(data, status, headers, config) {
      });
    }
}
]);
