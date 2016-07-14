MeasurementSummaryController.$inject = ['$stateParams', '$scope', '$http', '$window'];
function MeasurementSummaryController($stateParams, $scope, $http) {

  $scope.measurementId = $stateParams.measurementId;

  $http.get('/api/measurement/'+$scope.measurementId)
    .then(function(response){
      $scope.measurements = response.data;
    }, function(error){
      console.log(error);
    });
}

module.exports = MeasurementSummaryController;
