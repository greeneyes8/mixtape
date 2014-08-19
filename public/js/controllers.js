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
    stream: [],
    getEmbed: function getEmbed () {
      for (var i = 0; i < $scope.sc.stream.length; i++) {
        var uri = $scope.sc.stream[i].origin.uri;
        SC.oEmbed(uri, { auto_play: false }, function(oEmbed) {
          this.origin.oEmbed = oEmbed;
          this.origin.oEmbed.html = $sce.trustAsHtml(oEmbed.html);
          $scope.$apply();
        }.bind($scope.sc.stream[i]));
      }
      console.log($scope.sc.stream);
    }
  };

  SC.get('/me/activities/all', function (activities) {
    // console.log(JSON.stringify(activities,null,2));
    $scope.sc.stream = $scope.sc.stream.concat.apply($scope.sc.stream, activities.collection);
    $scope.sc.getEmbed();
  });
}]);