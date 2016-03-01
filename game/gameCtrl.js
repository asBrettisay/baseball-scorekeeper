angular.module('baseballScorekeeper')
.controller('gameCtrl', function($scope, teams, gameService, menuService, GameState, fb, gameObj, $stateParams, $firebaseObject, $firebaseArray) {

  $scope.plays = gameObj.child('plays');
  $scope.battingTeam = 'away';
  var teams = teams
  $scope.gameState = gameService.initializeGameState(teams);
  $scope.menuActive = false;



  $scope.updateBases = function(action, base) {
    if ($scope.gameState.bases.atBat === $scope.activePlayer) {
      var runs = gameService.updateBases($scope.gameState, $scope.gameState.bases, action);
      if (runs) {
        $scope.gameState[$scope.battingTeam].runs += runs;
      }
      $scope.batterActive = false;
    }
    else if (base && ($scope.activePlayer !== $scope.gameState.bases[base])) {
      gameService.movePlayer($scope.activePlayer, base, $scope.gameState)
    }
    else if (action === 'run') {
      gameService.updateBases($scope.gameState, $scope.gameState.bases, 'run');
    }
  }


  $scope.newBatter = function() {
    var b = $scope.gameState[$scope.battingTeam];

    b.battingIndex++
    if (b.battingIndex > 8) {
      b.battingIndex = 0;
    }
    $scope.gameState.bases.atBat = b.players[b.battingIndex];
    $scope.batterActive = true;
    $scope.plays.push($scope.gameState);
    $scope.plays.push('test');
    console.log($scope.gameState)
  }

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

  $scope.activateMenu = function(menu) {
    $scope.menuActive = true;
    $scope.menuOptions = menuService.getMenu(menu);
  }

  $scope.baseActivity = function(action) {
    $scope.menuActive = false;
    $scope.gameState = gameService.baseActivity(action, $scope.gameState, $scope.activePlayer);
  }

  $scope.ballInPlay = function(args) {
    $scope.gameState = gameService.ballInPlay(args, $scope.gameState)
    $scope.menuActive = false;
    $scope.batterActive = false;
    $scope.$apply();
    console.log($scope.gameState);
  }

  function retireSide() {
    $scope.gameState = gameService.retireSide($scope.gameState);
    if ($scope.battingTeam === 'away') {
      $scope.battingTeam = 'home';
    } else {
      $scope.battingTeam = 'away';
    }
  }

  //Listeners.
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

})
