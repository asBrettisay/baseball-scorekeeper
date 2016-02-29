angular.module('baseballScorekeeper')
.service('teamService', function($q) {


  var activeTeam;


  var team1 = {
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
    var team2 = {
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

team1.activePitcher = team1.pitchers[0];
team2.activePitcher = team2.pitchers[0];
var teams = {
              home: team1,
              away: team2
            }

  this.getAllTeams = function() {
    var defer = $q.defer();
    defer.resolve([team1, team2])
    return defer.promise;
  }

  this.getTeams = function() {
    var defer = $q.defer();
    defer.resolve(teams);
    return defer.promise;
  }

  this.setActiveTeam = function(team) {
    activeTeam = team;
  }

  this.getActiveTeam = function() {
    return $q.when(activeTeam);
  }

  this.changePitcher = function(team, pitcher) {
    team.activePitcher = pitcher;
  }
})
