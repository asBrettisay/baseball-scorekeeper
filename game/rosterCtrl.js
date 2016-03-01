angular.module('baseballScorekeeper')
.controller('rosterCtrl', function($scope, $state, teams, teamService, GameState) {

  $scope.teams = teams;
  $scope.$state = $state;

  $scope.selectTeam = function(team) {
    teamService.setActiveTeam(team);
  }


  $scope.changePitcherHome = function(pitcher) {
    GameState.home.activePitcher = pitcher;
  }


  $scope.changePitcherAway = function(pitcher) {
    GameState.away.activePitcher = pitcher;
    console.log(GameState)
  }


})
