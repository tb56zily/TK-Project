'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
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
             data: $scope.formData
           }, {
             headers: {
               "Content-Type": "application/json"
             }
           }).success(function(data, status, headers, config) {

             });

         }


        $scope.getMySubs = function() {
          $http({
              url: '/getMySubmissions',
              method: "GET",
              params: {username:'iio'}
               }, {
                 headers: {
                 "Content-Type": "application/json"
                     }
               }).success(function(data, status, headers, config) {
             console.log(data)
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
