angular.module('baseballScorekeeper')
.directive('scoreBoard', function() {
  return {
    restrict: 'E',
    templateUrl: 'game/views/scoreboard.html',
    scope: {
      state: '=gameState'
    },
    controller: function($scope) {
      console.log($scope.state)
      $scope.scoreArr = $scope.state.scoreArr;
      $scope.scoreArr = $scope.state.scoreArr;

      $scope.homeName = $scope.state.home.name;
      $scope.awayName = $scope.state.away.name;

    }
  }
})
