NettestController.$inject = ['$stateParams', '$scope', '$http', '$window', 'Notification'];
function NettestController($stateParams, $scope, $http,  $window, Notification) {

  var supportedTestIds = ["web_connectivity", "http_invalid_request_line",
                          "http_header_field_manipulation"];

  $http.get('/api/nettest')
    .then(function(response){
      var supportedNetTests = {};
      var experimentalNetTests = {};
      angular.forEach(response.data, function(netTest){
        if (supportedTestIds.indexOf(netTest.id) == -1) {
          experimentalNetTests[netTest.id] = netTest;
        } else {
          supportedNetTests[netTest.id] = netTest;
        }
      });
      $http.get('/api/input').then(function(response){
        $scope.supportedNetTests = supportedNetTests;
        $scope.experimentalNetTests = experimentalNetTests;
        console.log($scope.supportedNetTests);
        $scope.inputs = response.data;
        if ($stateParams.testName) {
          $scope.runNetTest($stateParams.testName);
        }
      }, function(error){
        Notification.error("Failed to fetch inputs", error);
      });

    }, function(error){
      Notification.error("Failed to list nettests", error);
    });

  $scope.runNetTest = function(testName) {
    if ($scope.supportedNetTests[testName]) {
      $scope.selectedNetTest = $scope.supportedNetTests[testName];
    } else if ($scope.experimentalNetTests[testName]) {
      // XXX maybe show a message saying this test is experimental and you
      // are running it at your own risk.
      $scope.selectedNetTest = $scope.experimentalNetTests[testName];
    }
    if ($scope.selectedNetTest) {
      $scope.selectedNetTest.options = {};
      $scope.selectedNetTest.advancedOptions = {};
      angular.forEach($scope.selectedNetTest.arguments,
        function(value, key){
          $scope.selectedNetTest.advancedOptions[key] = value;
        });
      angular.forEach($scope.selectedNetTest.simple_options,
        function(option){
          $scope.selectedNetTest.options[option.name] = $scope.selectedNetTest.advancedOptions[option.name];
          $scope.selectedNetTest.options[option.name]['type'] = option.type;
          delete $scope.selectedNetTest.advancedOptions[option.name];
        });
      $window.scrollTo(0, 0);
    }
  }

  $scope.startNetTest = function() {
    var options = {};
    $window.scrollTo(0, 0);
    angular.forEach($scope.selectedNetTest.arguments, function(value, key) {
      if (value.value != null) {
        options[key] = ''+value.value;
      } else {
        options[key] = value.value;
      }
    });

    $http
      .post(
        '/api/nettest/'+$scope.selectedNetTest.id+'/start',
        options
      )
      .then(function(response){
        Notification.success("Started "+$scope.selectedNetTest.name);
        $scope.selectedNetTest = undefined;
      }, function(error){
        Notification.error("Failed to start "+$scope.selectedNetTest.name, error);
        $scope.selectedNetTest = undefined;
      });
  }
}

module.exports = NettestController;
