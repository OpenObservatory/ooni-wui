var angular = require('angular');
var template = require('./web-connectivity.html');
var description = require('./web-connectivity.md');
require('./web-connectivity.scss');

var webConnectivityDirective = angular.module('webConnectivityDirective', [])
.directive('webConnectivity', ['$sce', function($sce){
  function link(scope, element, attrs) {
    scope.description = $sce.trustAsHtml(description);
  }
  return {
    template: template,
    link: link
  }
}])
.name;

module.exports = webConnectivityDirective;
