angular.module('myApp')
  .factory('myHttpInterceptor', ['$q', '$injector', '$rootScope', '$location', 'localStorageService', function ($q, $injector, $rootScope, $location, localStorageService) {
    return {
           request: function(config){
             var session = localStorageService.get('session');
             if (session) {
              config.headers.token=session.token
              console.log(config)
             }
             else {
               var url = config.url;
               console.log(url)
               if (url.indexOf('http') != 0 && url != 'signup/signup.html')
                $location.url("/login/");
             }


             console.log('Request started'); // LOG AT REQUEST START
             return config || $q.when(config);
            }
    };
}]);
