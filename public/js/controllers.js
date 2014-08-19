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
    console.log($scope.stream);

    $scope.$apply();

    $scope.getEmbed();
  });

  $scope.getEmbed = function getEmbed () {
    for (var i = 0; i < $scope.stream.length; i++) {
      var uri = $scope.stream[i].origin.uri;

      var _this = this;

      SC.oEmbed(uri, { auto_play: false }, function(oEmbed) {
        console.log(JSON.stringify(oEmbed, null, 2));
        this.origin.oEmbed = oEmbed;
      }.bind($scope.stream[i]));
    }

    console.log($scope.stream);

    $scope.$apply();
  };
}]);