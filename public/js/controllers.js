'use strict';

mixtape93.controller('mainController',
  ['$scope', '$http',
  function ($scope, $http)
{
  SC.initialize({
    client_id: '0482da9ad987e87ba383f481c357f403',
    redirect_uri: 'http://mixtape93.herokuapp.com/api/oauth'
  });
  $scope.authenticateToSoundcloud = function authenticateToSoundcloud () {
    // initialize client with app credentials
    SC.connect(function() {
      SC.get('/me/activities/all', function(activities) {
        console.log(activities);
      });
    });
  };
}]);