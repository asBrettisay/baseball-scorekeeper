describe('baseballScorekeeper', function() {
  beforeEach(module('baseballScorekeeper'));

  describe('gameCtrl', function() {

    var gameService, state, bases, action, controller, scope, teamService, teams;
    beforeEach(inject(function(_gameService_, $controller, $rootScope, _teamService_, _teams_) {
      scope = $rootScope.$new();
      teamService = _teamService_;
      teams = {team1: 'team1', team2: 'team2'}
      controller = $controller('gameCtrl', {$scope: scope})
    }))

    it('should update runs correctly', function() {
      state.bases.third = 'player1';
      state.bases.atBat = 'player2';
      state.runs = 0;

      var fakeResult = {
        bases: {
          third: 'player2',
        },
        runs: 1
      }

      spyOn(gameService, 'updateBases').and.returnValue(fakeResult)



      var result = scope.updateBases('single');

      expect(result.runs).toEqual(1);
    })
  })

  describe('gameService', function() {

    var gameService, state, bases, action;
    beforeEach(inject(function(_gameService_) {
      gameService = _gameService_;

      state = {
                battingTeam: 'team1',
                visitor: 'team1',
                home: 'team2',
                pitchCount: 0,
                strikes: 0,
                balls: 0,
                outs: 0,
                runs: 0,
                bases: {
                          first: 'player2',
                          second: 'player3',
                          third: 'player4',
                          atBat: 'player1'
                        }
              }
    }))

    it('should return a results object', function() {
      var result = gameService.updateBases(state, state.bases, action);
      expect(result).toEqual(jasmine.any(Object));
    })

    it('should credit one run when a player from third makes it home', function() {
      var runs = state.runs;
      var result = gameService.updateBases(state, state.bases, 'run');

      expect(result.runs).toEqual(runs + 1);

      state.bases.third = 'playerX';

      result = gameService.updateBases(state, state.bases, 'run');

      expect(result.runs).toEqual(runs + 2);
    })

    it('should place the batter on first when a single', function() {
      var batter = state.bases.atBat;
      var result = gameService.updateBases(state, state.bases, 'single');

      expect(result.bases.first).toEqual(batter);
    })

    it('should switch sides when there are 3 outs', function() {
      state.strikes = 2;
      state.outs = 2;
      var battingTeam = state.battingTeam;
      var result = gameService.pitch('strike', state.bases, state);
      expect(result.state.battingTeam).not.toEqual(battingTeam);
    })

    it('should give a strike on a foul ball, but not a strikeout', function() {
      state.strikes = 1;
      state.outs = 0;
      var result = gameService.pitch('foul', state.bases, state);
      expect(result.state.strikes).toEqual(2);
      var result = gameService.pitch('foul', state.bases, state);
      expect(result.state.strikes).toEqual(2);
      expect(result.state.outs).not.toEqual(1);
    })

    it('should strikeout and remove a batter with three strikes', function() {
      state.strikes = 2;
      state.outs = 0;
      var batter = state.bases.atBat;
      var result = gameService.pitch('strike', state.bases, state);
      expect(result.state.outs).toEqual(1);
      expect(result.state.bases.atBat).not.toEqual(batter)
    })

    it('should steal bases properly', function() {
      state.bases.second = null;
      var runner = state.bases.first;
      var result = gameService.baseActivity('steal', state, runner);

      expect(result.bases.second).toEqual(runner);
    })
  })

  describe('teamService', function() {

    var teamService, team1, team2;
    beforeEach(inject(function(_teamService_) {
      teamService = _teamService_;

      team1 = {
        name: 'Turtles',
        pitchers: [{
          name: 'carol',
          number: '55',
        },
        {
          name: 'hank',
          number: '66'
        }],
        players: [{
                      name: "jeff",
                      number: '1',
                    },
                    {
                      name: 'bill',
                      number: '2',
                    },
                    {
                      name: "pete",
                      number: '3',
                    },
                    {
                      name: 'dude',
                      number: '4'
                    },
                    {
                      name: 'edward',
                      number: '5'
                    },
                    {
                      name: 'babe',
                      number: '6',
                    },
                    {
                      name: 'joe',
                      number: '7',
                    },
                    {
                      name: 'mike',
                      number: '8',

                    },
                    {
                      name: 'cal',
                      number: '9'
                    },
                    {
                      name: 'ed',
                      number: '37'
                    }]
                  }
        team2 = {
          name: 'Owls',
          pitchers: [{
            name: 'Studebaker',
            number: '77',
          },
          {
            name: 'Gregory',
            number: '99'
          }],
          players: [{
                        name: "tim",
                        number: '10',
                      },
                      {
                        name: 'bill',
                        number: '11',
                      },
                      {
                        name: "pete",
                        number: '12',
                      },
                      {
                        name: 'dude',
                        number: '13'
                      },
                      {
                        name: 'edward',
                        number: '14'
                      },
                      {
                        name: 'babe',
                        number: '15',
                      },
                      {
                        name: 'joe',
                        number: '16',
                      },
                      {
                        name: 'mike',
                        number: '17',

                      },
                      {
                        name: 'cal',
                        number: '18'
                      },
                      {
                        name: 'louie',
                        number: '81'
                      }]
                    }
    }))

    it('should change pitchers', function() {
      var team = team1;
      team.activePitcher = {
        name: 'carol',
        number: '55',
      }

      var pitcher = team.activePitcher;

      teamService.changePitcher(team, pitcher);

      expect(team1.activePitcher).toEqual(pitcher);
    })
  })
})
