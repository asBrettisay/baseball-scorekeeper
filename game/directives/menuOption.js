angular.module('baseballScorekeeper')
.directive('menuOption', function() {
  function link(scope, element, attrs) {
    element.on('click', function() {
      scope.$emit('menuAction', scope.data.callback, scope.data.action);
    })
    element.text(scope.data.title)
  };

  return {
    restrict: 'A',
    link: link,
    scope: {
      data: '=scope',
    }
  }
})
