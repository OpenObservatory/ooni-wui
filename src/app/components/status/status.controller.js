StatusController.$inject = ['$scope', '$rootScope', 'StatusPoller', 'Notification'];
function StatusController($scope, $rootScope, StatusPoller, Notification) {
  var resetStatus = function() {
    $scope.status = {
      "director_started": false,
      "software_name": "ooniprobe",
      "asn": "AS0",
      "software_version": "unknown",
      "country_code": "ZZ",
      "agent_running": false
    }
    $rootScope.directorStarted = false;
  }
  resetStatus();

  var statusPoller = StatusPoller.get();
  statusPoller.start();
  statusPoller.promise.then(null, null, function(result) {
    if (result.status == 200) {
      $scope.status = result.data;
      $scope.status["agent_running"] = true;
      $rootScope.directorStarted = $scope.status.director_started;
    } else {
      resetStatus();
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
