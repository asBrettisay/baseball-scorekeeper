angular.module('baseballScorekeeper')
.directive('scoreBoard', function() {
  return {
    restrict: 'E',
    templateUrl: 'game/views/scoreboard.html',
    scope: {
      state: '=gameState'
    },
    controller: function($scope) {
      $scope.scoreArr = $scope.state.scoreArr;
      $scope.index = 0;
      $scope.scoreArr = $scope.state.scoreArr;
      $scope.awayScore = $scope.state.away;
      $scope.homeScore = $scope.state.home;
    }
  }
})
