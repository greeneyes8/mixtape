mixtape93.config( ['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.
  when('/', {
    templateUrl: 'public/views/pages/auth.html',
    controller: 'authController'
  }).
  when('/stream/', {
    templateUrl: 'public/views/pages/stream.html',
    controller: 'streamController'
  }).
  when('/api/oauth', {
    templateUrl: 'public/views/callback.html',
    controller: 'authController'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);