MeasurementSummaryController.$inject = ['$stateParams', '$scope', '$http', '$state'];
function MeasurementSummaryController($stateParams, $scope, $http, $state) {
  var singleEntryTests = [
    'http_invalid_request_line',
    'http_header_field_manipulation',
    'captiveportal',
    'vanilla_tor',
    'lantern',
    'psiphon',
    'netalyz'
  ];
  $scope.measurementId = $stateParams.measurementId;

  $http.get('/api/measurement/'+$scope.measurementId)
    .then(function(response){
      var summary = response.data;
      if (singleEntryTests.indexOf(summary['test_name']) != -1) {
        $state.go('measurement', {
          measurementId: $scope.measurementId, idx: 0
        });
      }
      $scope.summary = summary;
    }, function(error) {
      $scope.error = error.data;
    });
}

module.exports = MeasurementSummaryController;
