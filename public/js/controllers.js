'use strict';

mixtape93.controller('authController',
  ['$scope', '$http', '$location',
  function ($scope, $http, $location)
{
  SC.initialize({
    client_id: '0482da9ad987e87ba383f481c357f403',
    redirect_uri: 'http://mixtape93.herokuapp.com/api/oauth'
  });
  $scope.authenticateToSoundcloud = function authenticateToSoundcloud () {
    SC.connect(function() {
      $location.url('/stream/');
      console.log('redirecting to stream');
    });
  };
}]);

mixtape93.controller('streamController',
  ['$scope', '$http',
  function ($scope, $http)
{
  SC.get('/me/activities/all', function(activities) {
    console.log(activities);
  });
}]);