angular.module('baseballScorekeeper')
.service('archiveService', function(fb, $firebaseObject, $firebaseArray, $q) {
  var ref = new Firebase(fb.url);

  var archive = ref.child('archive');

  this.newGame = function() {
    var game = archive.push();
    return {game: game};
  }

  this.getArchive = function() {
    var defer = $q.defer();
    var games = $firebaseArray(archive);
    console.log(games)
    defer.resolve(games);
    return defer.promise;
  }

  this.getGame = function(id) {
    var defer = $q.defer();
    var game = archive.child(id);
    defer.resolve(game);

    return defer.promise;
  }

  this.getGameState = function(id, play) {
    var defer = $q.defer();
    var game = archive.child(id);
    var play = $firebaseObject(game.child(play));
    play.$loaded().then(function(data) {
      defer.resolve(data);
    })

    return defer.promise;

  }

})
