angular.module('baseballScorekeeper')
.directive('baseballPlayer', function($rootScope, idGen) {
  return {
    restrict: 'E',
    template: '<div ng-drag="true" class="player"></div>',
    link: function(scope, element, attrs) {
      element.attr('ng-drag', 'true');
      element.css('height', '100px');
      element.css('width', '100px');
    }
  }
});
