angular.module('baseballScorekeeper', ['ui.router', 'ngDragDrop'])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.html'
    })
    .state('game', {
      url: '/game',
      templateUrl: '/game/game.html',
      controller: 'gameCtrl',
      resolve: {
        teams: function(teamService) {
          return teamService.getTeams();
        }
      }
    })
})
