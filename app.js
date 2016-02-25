angular.module('baseballScorekeeper', ['ui.router'])
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
      controller: 'gameCtrl'
    })
})
