'use strict';

mixtape93.controller('authController',
  ['$scope', '$http', '$location', '$timeout',
  function ($scope, $http, $location, $timeout)
{
  SC.initialize({
    client_id: '0482da9ad987e87ba383f481c357f403',
    redirect_uri: 'http://6cc005fa.ngrok.com/api/oauth'
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
  ['$scope', '$http', '$sce',
  function ($scope, $http, $sce)
{
  // Initialize variables.
  $scope.sc = {
    stream: []
  };

  SC.get('/me/activities/all', function (activities) {
    $scope.sc.stream = $scope.sc.stream.concat.apply($scope.sc.stream,
      activities.collection);
    for (var i = 0; i < $scope.sc.stream.length; i++) {
      $scope.sc.stream[i].origin.stream_url =
        $sce.trustAsResourceUrl($scope.sc.stream[i].origin.stream_url
        + '?client_id=0482da9ad987e87ba383f481c357f403');
    }
    $scope.$digest();
  });
}]);