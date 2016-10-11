SetupController.$inject = ['$rootScope', '$scope', '$http', '$state', 'Notification'];
function SetupController($rootScope, $scope, $http, $state, Notification) {
  $scope.answer = {
    question1: undefined,
    question2: undefined
  };
  $scope.answeredQuiz = $state.current.url == '/step4';

  $scope.$state = $state;

  $scope.configuration = {
    include_ip: false,
    include_asn: true,
    include_country: true,
    should_upload: true,
    preferred_backend: 'onion',
    deck_config: {}
  };

  $http.get('/api/initialize')
    .then(function(result){
      $scope.availableDecks = result.data['available_decks'];
      angular.forEach($scope.availableDecks, function(deck){
        $scope.configuration.deck_config[deck.id] = deck.enabled;
      });
    });

  $scope.configure = function() {
    Notification.success("Configuring your node.");
    $http.post('/api/initialize', $scope.configuration)
      .then(function(result) {
        Notification.success("Successfully configured ooniprobe. You are" +
          " all set to go!");
        $rootScope.initialized = true;
        $state.go('home');
      }, function(error){
        Notification.error("Failed to configure ooniprobe", error);
      });
  }

  $scope.verifyQuestions = function() {
    var result = (
      ($scope.answer.question1 === 'one') &&
      ($scope.answer.question2 === 'two')
    );
    if (result == false) {
      Notification.error("Your answers to one or more of the quiz questions" +
        " is wrong. Please read the Risks documentation and try again.");
      $state.go('setup.step2');
    } else {
      Notification.success("You answered to the quiz correctly. Carry on.");
      $scope.answeredQuiz = true;
      $state.go('setup.step4');
    }
  }
}

module.exports = SetupController;
