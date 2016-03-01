angular.module('baseballScorekeeper')
.service('archiveService', function(fb, $firebaseObject, $firebaseArray, $q) {
  var ref = new Firebase(fb.url);

  var archive = ref.child('archive');

  this.newGame = function() {
    return archive.push();

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

  this.getGameState = function(id, playId) {
    var defer = $q.defer();
    var game = archive.child(id);
    var playRef = game.child(playId);
    console.log(playRef);
    playRef.on('value', function(snapshot) {
      console.log("snapshot is",snapshot.val());
    }, function(error) {
      console.log(error.code);
    });
    var playObj = $firebaseObject(game.child(playId));
    defer.resolve(play);
    return defer.promise;

  }

})
