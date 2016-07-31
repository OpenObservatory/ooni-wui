var httpInvalidRequestLineDescription = require('../measurement/directives/http-invalid-request-line.md');
var httpHeaderFieldManipulationDescription = require('../measurement/directives/http-header-field-manipulation.md');

NettestDetailController.$inject = ['$state', '$stateParams', '$scope', '$sce', '$http'];
function NettestDetailController($state, $stateParams, $scope, $sce, $http) {

  var detailsfor = {
//    "web_connectivity": webConnectivityDescription,
    "http_invalid_request_line": httpInvalidRequestLineDescription,
    "http_header_field_manipulation": httpHeaderFieldManipulationDescription
  };

  $http.get('/api/nettest')
    .then(function(response){
      var tests = {};
      angular.forEach(response.data, function(netTest){
        tests[netTest.id] = netTest;
      });
      if ($stateParams.id && tests[$stateParams.id]) {
        $scope.NetTest = tests[$stateParams.id];
      }
      if (detailsfor[$stateParams.id]) {
        $scope.description = $sce.trustAsHtml(detailsfor[$stateParams.id]);
      }
    });

  $scope.closeNettestDetail = function() {
    $scope.NetTest = undefined;
    $state.go('nettest');
  };
};

module.exports = NettestDetailController;
