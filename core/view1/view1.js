'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  })
  .when('/registerUser', {
    templateUrl: 'view1/userRegistration.html',
    controller: 'View1Ctrl'
  })
  .when('/editProfile', {
    templateUrl: 'view1/editProfile.html',
    controller: 'View1Ctrl'
  })
  .when('/mySubmissions', {
    templateUrl: 'view1/allMySubmissions.html',
    controller: 'View1Ctrl'
  })
  .when('/newSubmission', {
    templateUrl: 'view1/addNewSubmForm.html',
    controller: 'View1Ctrl'
  })
  .when('/allSubmissions', {
    templateUrl: 'view1/allSubmissions.html',
    controller: 'View1Ctrl'
  })
  .when('/users', {
    templateUrl: 'view1/allUsers.html',
    controller: 'View1Ctrl'
  })
  .when('/review', {
    templateUrl: 'view1/makeReviewForm.html',
    controller: 'View1Ctrl'
  })
  .when('/userLogin', {
    templateUrl: 'view1/userLogin.html',
    controller: 'View1Ctrl'
  });

}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {


  $scope.get = function () {
    $http({

      url: '/memberinfo',
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).success(function(data, status, headers, config) {
      console.log(data)
    }).error(function(data, status, headers, config) {

    });
  }
  // $scope.post = function () {
  //
  //
  //   $http({
  //     url: '/authenticate',
  //     method: "POST",
  //     data: JSON.stringify({
  //       'name': "Adnan",
  //       'password': "valar morghulis"
  //
  //     })
  //   }, {
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   }).success(function(data, status, headers, config) {
  //
  //     });

  $scope.addMySub = function() {
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

  $scope.getAllSubmissions = function() {
    $http({
      url: '/getAllSubmissions',
      method: "GET",

    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).success(function(data, status, headers, config) {
      console.log(data)
    });
  }


  $scope.addTopic = function() {
    $http({
      url: '/addNewConference',
      method: "POST",
      data: $scope.formData
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).success(function(data, status, headers, config) {

    });
  }


  $scope.getAllTopics = function() {
    $http({
      url: '/getAllConferences',
      method: "GET",

    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).success(function(data, status, headers, config) {
      console.log(data)
    });
  }


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


}]);
