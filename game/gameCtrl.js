angular.module('baseballScorekeeper')
.controller('gameCtrl', function($scope, teams) {

  $scope.battingIndex = 0;
  $scope.bases = {
    first: {player: null},
    second: {player: null},
    third: {player: null}
  }

  $scope.updateBases = function() {
    gameService.updateBases();
  }

  $scope.single = function() {
    console.log("single!")
    $scope.bases.first.player = $scope.atBat.player;
    $scope.newBatter();
  }
  $scope.double = function() {
    console.log("double!")
    $scope.bases.second.player = $scope.atBad.player;
  }

  $scope.triple = function() {
    $scope.bases.third = true;
  }

  $scope.newBatter = function() {
    $scope.battingIndex++;
    if ($scope.battingIndex > 9) {
      $scope.battingIndex = 0;
    }
    $scope.atBat.player = $scope.team1[$scope.battingIndex]
  }

  $scope.team1 = teams;

  $scope.atBat = {};

  $scope.atBat.player = $scope.team1[0];

})
