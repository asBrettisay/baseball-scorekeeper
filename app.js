angular.module('baseballScorekeeper', ['ui.router', 'ngDragDrop', 'ui.sortable', 'firebase'])
.constant('fb', {url: 'https://baseballscorekeeper.firebaseio.com/'})
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home/home.html'
    })
    .state('game', {
      url: '/game/:game',
      templateUrl: '/game/game.html',
      controller: 'gameCtrl',
      resolve: {
        teams: function(teamService) {
          return teamService.getTeams();
        },
        gameObj: function(archiveService, $stateParams) {
          if ($stateParams.game === 'new') {
            return archiveService.newGame();
          }
          console.log($stateParams)
        }
      }
    })
    .state('game.rosters', {
      url: '/rosters',
      templateUrl: '/game/views/rosters.html',
      controller: 'rosterCtrl'
    })
    .state('archive', {
      url: '/archive',
      templateUrl: '/archive/views/archive.html',
      controller: 'archiveCtrl',
      resolve: {
        archive: function(archiveService) {
          return archiveService.getArchive();
        }
      }
    })
    .state('archiveDetail', {
      url: '/archive/:gameId',
      templateUrl: '/archive/views/detail.html',
      // controller: function($scope, game) {
      //   $scope.game = game;
      // },
      // resolve: {
      //   game: function(archiveService, $stateParams) {
      //     return archiveService.getGame($stateParams.gameId)
      //   }
      // }
    })
})
