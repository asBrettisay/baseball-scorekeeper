angular.module('baseballScorekeeper')
.controller('gameCtrl', function($scope, teams, gameService, menuService, GameState, fb, gameObj, $stateParams) {

  $scope.ref = gameObj;
  console.log(gameObj)

  $scope.plays = $scope.ref.child('plays');

  $scope.battingTeam = 'away';
  $scope.gameState = {
    pitchCount: 0,
    strikes: 0,
    balls: 0,
    outs: 0,
    bases: {},
  }

  var teams = teams;


  $scope.gameState.home = teams.home;
  $scope.gameState.away = teams.away;

  $scope.gameState.away.battingIndex = 0;
  $scope.gameState.home.battingIndex = 0;
  $scope.gameState.away.runs = 0;
  $scope.gameState.home.runs = 0;

  $scope.gameState.bases.atBat = $scope.gameState[$scope.battingTeam].players[0];


  $scope.menuActive = false;
  $scope.batterActive = false;

  $scope.updateBases = function(action) {
    var result = gameService.updateBases($scope.gameState, $scope.gameState.bases, action);
    $scope.bases = result.bases.bases;
    $scope.gameState[$scope.battingTeam].runs += result.runs;
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

    $scope.gameState[$scope.battingTeam].battingIndex++;


    if ($scope.gameState[$scope.battingTeam].battingIndex > 8) {
      $scope.gameState[$scope.battingTeam].battingIndex = 0;
    }

    var i = $scope.gameState[$scope.battingTeam].battingIndex;

    $scope.gameState.bases.atBat = $scope.gameState[$scope.battingTeam].players[i];


    $scope.batterActive = true;

    $scope.plays.push($scope.gameState);
    console.log($scope.gameState)
  }


  //Listeners for directives.
  $scope.$on('menuAction', function(e, callback, args) {
    $scope[callback](args);
  })

  $scope.$on('playerActive', function(e, player) {
    $scope.activePlayer = player;
  })

  $scope.$watch('gameState.outs', function() {
    if ($scope.gameState.outs > 2) {
      retireSide();
    }
  })

  $scope.pitch = function(args) {
    var result = gameService.pitch(args, $scope.gameState.bases, $scope.gameState)
    $scope.gameState = result.state;
    $scope.gameState.bases = result.bases;
    $scope.menuActive = false;
    if ($scope.gameState.bases.atBat === null) {
      $scope.batterActive = false;
    }
    $scope.$apply();
  }

  $scope.ballInPlay = function(args) {
    $scope.gameState = gameService.ballInPlay(args, $scope.gameState)
    $scope.menuActive = false;
    $scope.batterActive = false;
    $scope.$apply();
    console.log($scope.gameState);
  }

  function retireSide() {
    $scope.gameState.bases = {};
    $scope.gameState.balls = 0;
    $scope.gameState.strikes = 0;
    $scope.gameState.outs = 0;
    if ($scope.battingTeam === 'away') {
      $scope.battingTeam = 'home';
    } else {
      $scope.battingTeam = 'away';
    }
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
})
