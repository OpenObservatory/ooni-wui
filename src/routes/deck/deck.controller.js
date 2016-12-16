DeckController.$inject = ["$scope", "$http", "Notification"]
function DeckController($scope, $http, Notification) {
  var listDecks = function() {
     $http.get('/api/deck').then(function(result) {
      $scope.decks = result.data;
    }, function(error){
      Notification.error("Failed to list decks", error);
    });
  }
 
  $scope.enableDeck = function(deck_id) {
    $http.post('/api/deck/' + deck_id + '/enable')
      .then(function(result){
        Notification.success("Enabled deck "+deck_id);
        listDecks();
      }, function(error) {
        Notification.error("Failed to enable deck "+deck_id, error);
      });
  };
  
  $scope.disableDeck = function(deck_id) {
     $http.post('/api/deck/' + deck_id + '/disable')
      .then(function(result){
        Notification.success("Disabled deck "+deck_id);
        listDecks();
      }, function(error) {
        Notification.error("Failed to disable deck " + deck_id, error);
      });   
  };
  
  $scope.runDeck = function(deck_id) {
    $http.post('/api/deck/' + deck_id + '/run')
      .then(function(result){
        Notification.success("Running deck "+deck_id);
      }, function(error) {
        Notification.error("Failed to run deck " + deck_id, error);
      });      
  };

  listDecks();  
}

module.exports = DeckController;
