StatusController.$inject = ['$scope', 'StatusPoller'];
function StatusController($scope, StatusPoller) {
  $scope.active_measurement_count = 0;
  var statusPoller = StatusPoller.get();
  statusPoller.start();
  statusPoller.promise.then(null, null, function(result) {
    if (result.status == 200) {
      $scope.status = result.data;
      $scope.active_measurement_count = Object.keys($scope.status.active_measurements).length;
    }
  });
}

module.exports = StatusController;
