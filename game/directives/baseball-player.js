angular.module('baseballScorekeeper')
.directive('baseballPlayer', function($rootScope, idGen) {
  return {
    restrict: 'A',
    scope: {
      player: '=playerObject'
    },
    link: function(scope, element, attrs) {
      scope.$watch('player', function(nv, ov) {
        scope.player = nv;
        element.text("#" + scope.player.number)
        console.log(scope.player)
      })

    }
    }
  });
