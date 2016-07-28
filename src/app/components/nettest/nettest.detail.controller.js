NettestDetailController.$inject = ['$stateParams', '$scope'];
function NettestDetailController($stateParams, $scope) {

  var detailsfor = ["web_connectivity", "http_invalid_request_line",
                          "http_header_field_manipulation"];
  $scope.NetTest = {
    name: "HI",
    version: 1
  };

};

module.exports = NettestDetailController;
