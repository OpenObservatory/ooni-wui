MeasurementController.$inject = ['$stateParams', '$scope', '$http', '$window', 'Measurement'];
function MeasurementController($stateParams, $scope, $http,  $window, Measurement) {
  console.log("In the measurementController");
  Measurement.get($stateParams.measurementId, $stateParams.measurementIdx)
  .then(function(measurement){
    $scope.measurement = measurement;
    $scope.testNameLong = measurement.test_name.replace("_", " ");
    $scope.testNameLong = $scope.testNameLong[0].toUpperCase() + $scope.testNameLong.slice(1);
  }, function(error){
    console.log("Failed");
    console.log(error);
  });
}
module.exports = MeasurementController;
