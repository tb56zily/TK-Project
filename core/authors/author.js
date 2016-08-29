'use strict';

/* Controllers */
angular.module('myApp.author', ['ngRoute']).controller('AuthorCtrl', [
  '$scope', '$location', '$http', 'localStorageService' ,function($scope, $location, $http, localStorageService) {

    localStorageService.clearAll();
    $scope.loginForm = {};
    $scope.errors = {};


    //Add a new Submission from my account
    $scope.addMySub = function() {
      console.log("inside addmysub")
      $http({
        url: '/addNewSubmission',
        method: "POST",
        data: $scope.submission
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function(data, status, headers, config) {
      });
    }

    //upload pdf file with submission
    $scope.uploadFile = function() {
      $http({
        url: '/uploadFile',
        method: "POST",
      }, {
        headers: {
          "Content-Type": "file/pdf"
        }
      }).success(function(data, status, headers, config) {

      });
    }

    //Get all my Submissions
    $scope.getMySubmissions = function() {
      $http({
        url: '/getMySubmissions',
        method: "GET",
        params: {username:'username'}
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function(data, status, headers, config) {
        console.log(data)
      });
    }


    //Withdraw my Submission
    $scope.withdrawMySub = function() {
      $http({
        url: '/withdrawMySub',
        method: "POST",
        params: {_id:'2'}
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function(data, status, headers, config) {
        console.log(data)
      });
    }

    //open Review form forselected submission
    $scope.reviewSub = function() {
      $http({
        url: '/getReviewForm',
        method: "GET",
        params: {username:'username'}
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function(data, status, headers, config) {
        console.log(data);
        $location.path("./reviewer/makeReviewForm");
      });
    }


  }
]);
