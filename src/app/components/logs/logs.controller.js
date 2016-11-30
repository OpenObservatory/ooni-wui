LogsController.$inject = ['$scope', '$http', '$anchorScroll', 'Notification'];
function LogsController($scope, $http) {
  $http.get('/api/logs')
    .then(function(response){
      $scope.logs = response.data;
    });

  $scope.submitting = false;

  $scope.shareLatestLog = function() {
    $scope.submitting = true;
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
    });
  };
}

module.exports = LogsController;
