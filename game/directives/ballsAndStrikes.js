angular.module('baseballScorekeeper')
.directive('ballsAndStrikes', function() {
  return {
    restrict: 'E',
    templateUrl: 'game/views/ballsAndStrikes.html',
    scope: {
      state: "=gameState"
    },
    controller: function($scope) {
      $scope.strike1 = {};
      $scope.strike2 = {};
      $scope.ball1 = {};
      $scope.ball2 = {};
      $scope.ball3 = {};

      $scope.$watch('state.strikes', function() {
        if ($scope.state.strikes === 1) {
          $scope.strike1 = {'background-color': 'red'};
        }
        if ($scope.state.strikes === 2) {
          console.log('Strike 2!');
          $scope.strike2 = {'background-color': 'red'};
        }
        if ($scope.state.strikes === 0) {
          $scope.strike1 = {};
          $scope.strike2 = {};
        }
      })

      $scope.$watch('state.balls', function() {
        if ($scope.state.balls === 1) {
          $scope.ball1 = {'background-color': 'green'};
        }
        if ($scope.state.balls === 2) {
          $scope.ball2 = {'background-color': 'green'};
        }
        if ($scope.state.balls === 3) {
          $scope.ball3 = {'background-color': 'green'};
        }
        if ($scope.state.balls === 0) {
          $scope.ball1 = {};
          $scope.ball2 = {};
          $scope.ball3 = {};
        }
      })

      $scope.$watch('state.outs', function() {
        if ($scope.state.outs === 1) {
          $scope.out1 = {'background-color': 'black'}
        }
        if ($scope.state.outs === 2) {
          $scope.out2 = {'background-color': 'black'}
        }
        if ($scope.state.outs === 0) {
          $scope.out1 = {};
          $scope.out2 = {};
        }
      })
    }
  }
})
