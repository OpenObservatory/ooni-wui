var angular = require('angular');
var template = require('./http-invalid-request-line.html');

var httpInvalidRequestLineDirective = angular.module('httpInvalidRequestLineDirective', [])
.directive('httpInvalidRequestLine', function(){
  return {
    template: template
  }
})
.name;

module.exports = httpInvalidRequestLineDirective;
