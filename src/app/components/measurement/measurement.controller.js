MeasurementController.$inject = ['$stateParams', '$scope', '$http', '$window', 'Measurement'];
function MeasurementController($stateParams, $scope, $http,  $window, Measurement) {
  $scope.debug = false;

  Measurement.get($stateParams.measurementId, $stateParams.idx)
  .then(function(measurement){
    $scope.measurement = measurement;
    $scope.testNameLong = measurement.test_name.replace(/_/g, " ");
    $scope.testNameLong = $scope.testNameLong[0].toUpperCase() + $scope.testNameLong.slice(1);
  }, function(error) {
    console.log("Failed");
    console.log(error);
  });

  $scope.toggleDebug = function() {
    $scope.debug = !$scope.debug;
  }
}
module.exports = MeasurementController;
