var angular = require('angular');
var template = require('./http-invalid-request-line.html');
var description = require('./http-invalid-request-line.md');

var httpInvalidRequestLineDirective = angular.module('httpInvalidRequestLineDirective', [])
.directive('httpInvalidRequestLine', ['$sce', function($sce) {
  function link(scope, element, attrs) {
    scope.description = $sce.trustAsHtml(description);
  }

  return {
    template: template,
    link: link
  }
}])
.name;

module.exports = httpInvalidRequestLineDirective;
