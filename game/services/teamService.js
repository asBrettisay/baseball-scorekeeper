angular.module('baseballScorekeeper')
.service('teamService', function($q) {
  var team1 = [{
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
                }]

  this.getTeams = function() {
    var defer = $q.defer();
    defer.resolve(team1);
    return defer.promise;
  }
})
