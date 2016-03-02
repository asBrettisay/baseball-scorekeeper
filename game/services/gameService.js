angular.module('baseballScorekeeper')
.service('gameService', function() {



  this.updateBases = function(state, action) {
    var runs = state.scoreArr;
    var i = state.scoreIndex;
    var bases = state.bases;
    state.play = null;


    var advanceBases = function() {
      if (bases.third && bases.second && bases.first) {
        runs[i]++;
      }
      bases.third = bases.second;
      bases.second = bases.first;
      bases.first = null;
    }



    if (action === 'run') {
      // Run scored from third.
      bases.third = null;
      runs[i]++;
      state.play = 'Run scored!';
    }



    if (action === 'single') {

      if (bases.first) {
        advanceBases();
      }


      state.play = 'Single!';
      bases.first = bases.atBat;
      bases.atBat = null;
    }



    if (action === 'double') {

      if (bases.third && bases.second) {
        runs[i]++;
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
      bases.atBat = null;
      state.play = 'Double!';
    }



    if (action === 'triple') {

      if (bases.third) {
        runs[i]++
      }
      if (bases.second) {
        runs[i]++
      }
      if (bases.first) {
        runs[i]++
      }

      bases.third = bases.atBat;
      bases.second = null;
      bases.first = null;
      bases.atBat = null;
      state.play = 'Triple!';
    }



    if (action === 'homerun') {
            runs[i]++
            if (bases.third) {
              runs[i]++
            }
            if (bases.second) {
              runs[i]++
            }
            if (bases.first) {
              runs[i]++
            }
            bases.third = null;
            bases.second = null;
            bases.first = null;
            var homeRuns = ["Dinger!", "Yahtzee!", "Booyah!","Big Salami!", "Jack!", "Big Fly!", "Adios, Pelota!", "Bomb!", "Blasted!", "Big Dog!", "Four-Bagger!","Round Tripper!", "Get Outta Here Ball!"];
            var getHomeRun = function() {
              var num = Math.floor(Math.random() * homeRuns.length);
              return homeRuns[num];
            }
            state.play = getHomeRun();
    }
  }





  this.pitch = function(action, bases, state) {

    state.play = null;

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
      state.play = 'Strikeout!';
    } else if (state.balls === 4) {
      bases.first = bases.atBat;
      bases.atBat = null;
      state.strikes = 0;
      state.balls = 0;
      state.play = 'Base on balls!'
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

  this.initializeGameState = function(teams) {
    teams.home.battingIndex = 0;
    teams.home.runs = 0;
    teams.away.battingIndex = 0;
    teams.away.runs = 0;

    for (var j = 0, scoreArr = []; j < 18; j++) {
      scoreArr.push(0);
    }

    return {
      scoreIndex: 0,
      pitchCount: 0,
      strikes: 0,
      balls: 0,
      outs: 0,
      bases: {},
      home: teams.home,
      away: teams.away,
      scoreArr: scoreArr
    }

  }

  this.retireSide = function(state) {
    state.bases = {};
    state.balls = 0;
    state.strikes = 0;
    state.outs = 0;
    return state;
  }

})
