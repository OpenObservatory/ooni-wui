StatusController.$inject = ['$scope', 'StatusPoller', 'Notification'];
function StatusController($scope, StatusPoller, Notification) {
  $scope.active_measurement_count = 0;
  var statusPoller = StatusPoller.get();
  statusPoller.start();
  statusPoller.promise.then(null, null, function(result) {
    if (result.status == 200) {
      $scope.status = result.data;
      $scope.active_measurement_count = Object.keys($scope.status.active_measurements).length;
    }
  });

  var notificationPoller = StatusPoller.get({
    'initializeUrl': null,
    'updateUrl': '/api/notify'
  });
  notificationPoller.start();
  notificationPoller.promise.then(null, null, function(result) {
    if (result.status == 200) {
      var ev = result.data;
      if (ev.type == "error") {
        Notification.error(ev.message);
      } else if (ev.type == "success") {
        Notification.success(ev.message);
      }
    }
  });
}

module.exports = StatusController;
