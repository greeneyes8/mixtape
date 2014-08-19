'use strict';

mixtape93.controller('authController',
  ['$scope', '$http', '$location', '$timeout',
  function ($scope, $http, $location, $timeout)
{
  SC.initialize({
    client_id: '0482da9ad987e87ba383f481c357f403',
    redirect_uri: 'http://mixtape93.herokuapp.com/api/oauth'
  });
  $scope.authenticateToSoundcloud = function authenticateToSoundcloud () {
    SC.connect(function () {
      $timeout(function () {
        $scope.currentPath = $location.path('/stream');
      }, 0);
    });
  };
}]);

mixtape93.controller('streamController',
  ['$scope', '$http',
  function ($scope, $http)
{
  // Initialize variables.
  var stream = $scope.stream = [];

  SC.get('/me/activities/all', function (activities) {
    // console.log(JSON.stringify(activities,null,2));
    $scope.stream = stream.concat.apply(stream, activities.collection);
    $scope.$apply();
    console.log($scope.stream);
  });
}]);