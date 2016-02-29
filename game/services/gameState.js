angular.module('baseballScorekeeper')
.factory('GameState', function($rootScope) {
  var scope = $rootScope.$new(true);
  scope.data = {activePitcher: 'glen'};
  return scope;
})
