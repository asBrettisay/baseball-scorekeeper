angular.module('baseballScorekeeper')
.directive('playerBatter', function($rootScope, idGen) {
  return {
    restrict: 'A',
    scope: {
      player: '=playerObject'
    },
    link: function(scope, element, attrs) {
      scope.$watch('player', function(nv, ov) {
        scope.player = nv;
        if (scope.player)
          element.text("#" + scope.player.number);
      })

      element.on('mousedown', function() {
        scope.$emit('playerActive', scope.player);
      })
      element.on('mouseup', function() {
        scope.$emit('playerInactive');
      })
    }
  }
});
