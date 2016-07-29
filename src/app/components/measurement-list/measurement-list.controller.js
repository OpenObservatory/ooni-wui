MeasurementListController.$inject = ['$scope', '$http', 'Notification'];
function MeasurementListController($scope, $http, Notification) {
  $http.get('/api/measurement')
    .then(function(response) {
      $scope.measurements = response.data['measurements'];
    }, function(error){
      Notification.error("Failed to list measurements", error);
    });

  $scope.deleteMeasurement = function(measurement) {
    $http.delete('/api/measurement/'+measurement.id)
      .then(function(response) {
        var idx = $scope.measurements.indexOf(measurement);
        $scope.measurements.splice(idx, 1);
        Notification.success("Measurement deleted");
      }, function(error) {
        Notification.error("Failed to delete measurement", error);
      });
  }

  $scope.keepMeasurement = function(measurement) {
    $http.post('/api/measurement/'+measurement.id+'/keep')
      .then(function(response) {
        Notification.success("This measurement will not be deleted");
      }, function(error) {
        Notification.error("Failed to delete measurements", error);
      });
  }

}
module.exports = MeasurementListController;
