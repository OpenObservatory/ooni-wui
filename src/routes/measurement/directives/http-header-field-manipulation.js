var angular = require('angular');
var template = require('./http-header-field-manipulation.html');
var description = require('./http-header-field-manipulation.md');

var httpHeaderFieldManipulationDirective = angular.module('httpHeaderFieldManipulationDirective', [])
.directive('httpHeaderFieldManipulation', ['$sce', function($sce){
  function link(scope, element, attrs) {
    scope.description = $sce.trustAsHtml(description);
    scope.anomaly = false;
    angular.forEach(scope.measurement.test_keys.tampering, function(value, key){
      if (value == true) {
        scope.anomaly = true;
      }
    });
  }

  return {
    template: template,
    link: link
  }
}])
.name;

module.exports = httpHeaderFieldManipulationDirective;
