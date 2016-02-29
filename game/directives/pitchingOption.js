angular.module('baseballScorekeeper')
.directive('pitchingOption', function() {
  return {
    restrict: 'A',
    scope: {
      action: '@action',
    },
    link: function(scope, element, attrs) {
      element.on('click', function(e) {
        scope.$emit('pitchAction', scope.action)
      })
    }
  }
})
