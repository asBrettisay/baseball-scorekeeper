angular.module('baseballScorekeeper')
.service('rosterService', function(teamService) {
  this.changePitcher = function(state, pitcher) {
    state.pitcher = pitcher;
  }
})
