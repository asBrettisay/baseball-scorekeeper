angular.module('baseballScorekeeper')
.service('gameService', function() {

  this.updateBases = function(state, bases, action) {
    var runs = 0;
    var advanceBases = function() {
      bases.third = bases.second;
      bases.second = bases.first;
      bases.first = null;
    }

    if (action === 'run') {
      bases.third = null;
      runs++;
    }

    if (action === 'single') {
      if (bases.third) {
        runs++;
        state.play = 'single';
      }
      if (bases.first) {
        advanceBases();
      }
      bases.first = bases.atBat;
      bases.atBat = null;
    } else if (action === 'double') {
      if (bases.third && bases.second) {
        runs++;
        advanceBases();
      }
      else if (bases.second) {
        bases.third = bases.second;
      }
      if (bases.first) {
        bases.third = bases.first;
        bases.first = null;
      }
      bases.second = bases.atBat;
      state.play = 'double';
    } else if (action === 'triple') {

      if (bases.third) {
        runs++
      }
      if (bases.second) {
        runs++
      }
      if (bases.first) {
        runs++
      }

      bases.third = bases.atBat;
      bases.second = null;
      bases.first = null;
      state.play = 'triple';
    } else if (action === 'homerun') {
      bases.forEach(function(base) {
        runs += 1;
        base = null;
      })
      state.play = 'homerun';
    }
    return {runs: runs, bases: bases}
  }

  this.pitch = function(action, bases, state) {

    function wildPitchAction() {
      if (bases.third) {
        runs++;
      }
      bases.third = bases.second;
      bases.second = bases.first;
      bases.first = bases.null;
      bases.atBat = null;
    }

    state.pitchCount++;

    if (action === 'strike') {
      state.strikes++;
    } else if (action === 'ball') {
      state.balls++
    }
    if (state.strikes === 3) {
      state.outs++;
      state.strikes = 0;
      state.balls = 0;
      bases.atBat = null;
    } else if (state.balls === 4) {
      bases.first = bases.atBat;
      bases.atBat = null;
    }

    if (action === "foul") {
      if (state.strikes < 2)
        state.strikes++;
    }

    if (action === 'passedBall') {
      wildPitchAction();
    }
    if (action === 'wildPitch') {
      wildPitchAction();
    }

    if (state.outs === 3) {
      state.battingTeam = (state.battingTeam === state.home) ? state.visitor : state.home;
    }

    return {
      bases: bases,
      state: state,
    }
  }

  this.ballInPlay = function(action, state) {
    if (action === 'flyout') {
      state.outs++;
      state.bases.atBat = null;
      state.play = 'flyout';
    }
    else if (action === 'groundout') {
      state.outs++;
      state.bases.atBat = null;
      state.play = 'groundout';
    }
    return state;
  }

  this.baseActivity = function(action, state, player) {
    if (action === 'steal') {
      if (state.bases.third === player) {
        runs++;
        state.bases.third = null;
        return state;
      }

      var baseArray = [state.bases.first, state.bases.second, state.bases.third];
      var pIndex = baseArray.indexOf(player);
      if (baseArray[pIndex + 1]) {
        state.doubleSteal = true;
        return state;
      }
      baseArray[pIndex+1] = player;
      baseArray[pIndex] = null;
      state.bases.first = baseArray[0];
      state.bases.second = baseArray[1];
      state.bases.third = baseArray[2];

      return state;
    }
  }

  this.movePlayer = function(player, target, state) {
    for (var prop in state.bases) {
      if (state.bases[prop] === player) {
        state.bases[prop] = null;
        state.bases[target] = player;
      }
    }
    return state;
  }

})
