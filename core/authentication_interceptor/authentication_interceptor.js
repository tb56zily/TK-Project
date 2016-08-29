angular.module('app')
    .factory('AuthenticationInterceptor', ['$q', '$injector', '$rootScope', '$location', 'localStorageService', function ($q, $injector, $rootScope, $location, localStorageService) {
      return {
        request: function (pConfig) {
          var session = localStorageService.get('session');
          if (session) {
            $rootScope['login'] = {id: 'present'};
            pConfig.headers.Authorization = session.auth;
            pConfig.headers['TWTOKEN'] = session.id;
          } else {
            var url = pConfig.url;
            if (url.indexOf('http') != 0 && url != '/login/login.html'
                && url != '/partials/signup.html') {

              $location.url("/dashboard/login");
            }
          }
          return pConfig;
        }
      };
    }]);
