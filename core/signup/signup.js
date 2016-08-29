'use strict';


angular.module('myApp.signup', ['ngRoute']).controller('SignupCtrl', [
    '$scope', '$location', '$http',function($scope, $location, $http) {





  $scope.registrationForm = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      institute: '',
      address: '',
      city: '',
      postcode: '',
      country: '',
    };
  $scope.register = function() {
      var confirmation, field, hasErrors, jQconfirmation, jQfield, jQpassword, password, ref, value;
      hasErrors = false;
      $scope.errors = {};
      ref = $scope.registrationForm;
      for (field in ref) {
        value = ref[field];
        jQfield = $("#" + field + "-field");
        if (field === 'email' && !/^.+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,6})$/.test(value)) {
          hasErrors = true;
          jQfield.addClass('has-error');
          jQfield.find('.help-block').text('has invalid format (please ensure the domain is in lower case)');
        }  else if (value) {
          jQfield.removeClass('has-error');
          jQfield.find('.help-block').text('');
        } else {
          hasErrors = true;
          jQfield.addClass('has-error');
          jQfield.find('.help-block').text('is required');
        }
      }
      password = $scope.registrationForm.password;
      jQpassword = $('#password-field');
      if (password && password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password) && /\W/.test(password)) {
        jQpassword.removeClass('has-error');
        jQpassword.find('.help-block').text('');
      } else {
        hasErrors = true;
        jQpassword.addClass('has-error');
        jQpassword.find('.help-block').text('must be at least 8 characters and include letters, digits and special chars');
      }
      confirmation = $scope.registrationForm.password_confirmation;
      jQconfirmation = $('#password_confirmation-field');
      if (password !== confirmation) {
        hasErrors = true;
        jQconfirmation.addClass('has-error');
        jQconfirmation.find('.help-block').text('must match with Password');
      } else {
        jQconfirmation.removeClass('has-error');
        jQconfirmation.find('.help-block').text('');
      }
      if (hasErrors) {
        return;
      }

      $http({
        url: "/signup",
        method: "POST",
        data: JSON.stringify({
          password: $scope.registrationForm.password,
          first_name:  $scope.registrationForm.first_name,
          last_name:  $scope.registrationForm.last_name,
          email: $scope.registrationForm.email,
          institute: $scope.registrationForm.institute,
          address: $scope.registrationForm.address,
          city: $scope.registrationForm.city,
          postcode: $scope.registrationForm.postcode,
          country: $scope.registrationForm.country
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function(data, status, headers, config) {

      }).error(function(data, status, headers, config) {

      });
    };

  }
]);
