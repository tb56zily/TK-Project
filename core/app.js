'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'LocalStorageModule',
  'ui.bootstrap',
  'myApp.view1',
  'myApp.view2',
  'myApp.login',
  'myApp.signup',
  'myApp.author',
  'myApp.chair',
  'myApp.reviewer',

  'myApp.version'
]).
config(['$locationProvider', '$routeProvider','$httpProvider','localStorageServiceProvider', function($locationProvider, $routeProvider, $httpProvider,localStorageServiceProvider) {
  $routeProvider.
  when('/view1/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  }).
  when('/view2/', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  }).
  when('/login/', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  }).
  when('/signup/', {
    templateUrl: 'signup/signup.html',
    controller: 'SignupCtrl'
  })
  .
  when('/editProfile/', {
    templateUrl: 'my account/editProfile.html',
    //controller: 'SignupCtrl'
  })
  .
  when('/resetPassword/', {
    templateUrl: 'my account/newPassword.html',
    //controller: 'SignupCtrl'
  })
  .when('/mySubmissions/', {
    templateUrl: 'authors/allMySubmissions.html',
    controller: 'AuthorCtrl'
  })
  .when('/newSubmission/', {
    templateUrl: 'authors/addNewSubmForm.html',
    controller: 'AuthorCtrl'
  })
  .when('/reviewSubmissions/', {
    templateUrl: 'authors/submissionsToReview.html',
    controller: 'AuthorCtrl'
  })
  .when('/review/', {
    templateUrl: 'reviewer/makeReviewForm.html',
    controller: 'ReviewerCtrl'
  })
  .when('/allSubmissions', {
    templateUrl: 'chair/allSubmissions.html',
    controller: 'ChairCtrl'
  })
  .when('/users', {
    templateUrl: 'chair/allUsers.html',
    controller: 'ChairCtrl'
  })
  .otherwise('/view1');


  $locationProvider.html5Mode(true);
  localStorageServiceProvider.setStorageType('sessionStorage')

  $httpProvider.interceptors.push('myHttpInterceptor');




}]);
