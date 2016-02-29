angular.module('baseballScorekeeper')
.controller('gameCtrl', function($scope, teams, gameService, menuService, GameState) {

  $scope.battingIndex = 0;
  $scope.runs = 0;
  $scope.gameState = {
    pitchCount: 0,
    strikes: 0,
    balls: 0,
    outs: 0,
    runs: 0,
    bases: {},
  }

  $scope.menuActive = false;
  $scope.batterActive = false;

  $scope.updateBases = function(action) {
    var result = gameService.updateBases($scope.gameState, $scope.gameState.bases, action);
    $scope.bases = result.bases.bases;
    $scope.gameState.runs = result.runs;
  }

  $scope.single = function() {
    if ($scope.gameState.bases.atBat === $scope.activePlayer) {
      $scope.updateBases('single');
      $scope.batterActive = false;
    } else if ($scope.activePlayer !== $scope.gameState.bases.first) {
      $scope.gameState = gameService.movePlayer($scope.activePlayer, 'first', $scope.gameState);
    }
  }
  $scope.double = function() {
    if ($scope.gameState.bases.atBat === $scope.activePlayer) {
      $scope.updateBases('double');
      $scope.batterActive = false;
    } else if ($scope.activePlayer !== $scope.gameState.bases.second) {
      $scope.gameState = gameService.movePlayer($scope.activePlayer, 'second', $scope.gameState);
    }
  }

  $scope.triple = function() {
    if ($scope.gameState.bases.atBat === $scope.activePlayer) {
      $scope.updateBases('triple');
      $scope.batterActive = false;
    } else if ($scope.activePlayer !== $scope.gameState.bases.third) {
      $scope.gameState = gameService.movePlayer($scope.activePlayer, 'third', $scope.gameState);
    }

  }

  $scope.home = function() {
    if ($scope.activePlayer = $scope.gameState.bases.third) {
      $scope.updateBases('run');
    }
  }

  $scope.newBatter = function() {
    $scope.battingIndex++;
    if ($scope.battingIndex > 8) {
      $scope.battingIndex = 0;
    }
    $scope.gameState.bases.atBat = $scope.gameState.battingTeam.players[$scope.battingIndex]

    $scope.batterActive = true;
  }


  //Listeners for directives.
  $scope.$on('menuAction', function(e, callback, args) {
    $scope[callback](args);
  })

  $scope.$on('playerActive', function(e, player) {
    $scope.activePlayer = player;
  })

  $scope.pitch = function(args) {
    var result = gameService.pitch(args, $scope.gameState.bases, $scope.gameState)
    $scope.gamestate = result.state;
    $scope.gameState.bases = result.bases;
    $scope.menuActive = false;
    $scope.$apply();
    console.log($scope.gameState)
  }

  $scope.ballInPlay = function(args) {
    $scope.gameState = gameService.ballInPlay(args, $scope.gameState)
    $scope.menuActive = false;
    $scope.batterActive = false;
    $scope.$apply();
    console.log($scope.gameState);
  }

  $scope.activatePitcher = function() {
    $scope.menuActive = true;
    $scope.menuOptions = menuService.getPitcherMenu();
  }

  $scope.activateBatter = function() {
    $scope.menuActive = true;
    $scope.menuOptions = menuService.getBatterMenu();
  }

  $scope.activateRunner = function() {
    $scope.menuActive = true;
    $scope.menuOptions = menuService.getRunnerMenu();
  }

  $scope.baseActivity = function(action) {
    $scope.menuActive = false;
    $scope.gameState = gameService.baseActivity(action, $scope.gameState, $scope.activePlayer);
  }

  $scope.teams = teams;



  $scope.gameState.home = $scope.teams.home;
  $scope.gameState.visitor = $scope.teams.away;

  $scope.gameState.battingTeam = $scope.gameState.visitor;
  // $scope.gameState.pitcher = $scope.gameState.visitor.activePitcher;

  // GameState.battingTeam = $scope.gameState.visitor;

  $scope.gameState.bases.atBat = $scope.gameState.battingTeam[0];

})
