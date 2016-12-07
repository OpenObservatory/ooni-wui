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
  $scope.search = {};
  $scope.toggleNormal = function() {
    if (angular.isUndefined($scope.search.anomaly)) {
      $scope.search.anomaly = true;
    } else {
      delete $scope.search.anomaly;
    }
  }

  $http.get('/api/measurement/'+$scope.measurementId)
    .then(function(response){
      var summary = response.data;
      if (summary['results'].length == 1) {
        $state.go('measurement', {
          measurementId: $scope.measurementId, idx: 0
        });
      }
      $scope.summary = summary;
      $scope.testNameLong = summary.test_name.replace(/_/g, " ");
      $scope.testNameLong = $scope.testNameLong[0].toUpperCase() + $scope.testNameLong.slice(1);
    }, function(error) {
      $scope.error = error.data;
    });
}

module.exports = MeasurementSummaryController;
