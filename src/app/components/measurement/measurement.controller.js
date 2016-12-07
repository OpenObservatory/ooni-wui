MeasurementController.$inject = ['$stateParams', '$scope', '$http', '$window', 'Measurement'];
function MeasurementController($stateParams, $scope, $http,  $window, Measurement) {
  $scope.debug = false;
  var explorerBaseUrl = 'https://explorer.ooni.torproject.org/measurement/';

  Measurement.get($stateParams.measurementId, $stateParams.idx)
  .then(function(measurement){
    var explorerLink;
    $scope.measurement = measurement;
    $scope.testNameLong = measurement.test_name.replace(/_/g, " ");
    $scope.testNameLong = $scope.testNameLong[0].toUpperCase() + $scope.testNameLong.slice(1);
    explorerLink = explorerBaseUrl + $scope.measurement.report_id;
    if ($scope.measurement.input) {
      explorerLink += "?input=" + encodeURI($scope.measurement.input);
    }
    $scope.explorerLink = explorerLink;
  }, function(error) {
    console.log("Failed");
    console.log(error);
  });

  $scope.toggleDebug = function() {
    $scope.debug = !$scope.debug;
  }


}
module.exports = MeasurementController;
