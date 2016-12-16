LogsController.$inject = ['$scope', '$http', '$anchorScroll', 'Notification'];
function LogsController($scope, $http) {
  $scope.logs = {
    latest: "Loading..."
  };

  $http.get('/api/logs')
    .then(function(response){
      $scope.logs = response.data;
    });

  $scope.submitting = false;
  $scope.submitFailed = false;

  $scope.shareLatestLog = function() {
    $scope.submitting = true;
    $scope.submitFailed = false;
    $http.post('https://api.github.com/gists', {
      'description': 'ooniprobe logs',
      'public': false,
      'files': {
        'ooniprobe-logs.txt': {
          'content': $scope.logs.latest
        }
      }
    }).then(function(response) {
      $scope.submitting = false;
      $scope.shareLink = response.data.html_url;
    }, function(error){
      $scope.submitFailed = true;
    });
  };
  $scope.loadAll = function() {
    $scope.loadingOlder = true;
    $http.get('/api/logs?all=true')
      .then(function(response){
        $scope.loadingOlder = false;
        $scope.logs = response.data;
      });
  }
}

module.exports = LogsController;
