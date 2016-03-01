angular.module('baseballScorekeeper')
.directive('scoreBoard', function() {
  return {
    restrict: 'E',
    templateUrl: 'game/views/scoreboard.html'
  }
})
