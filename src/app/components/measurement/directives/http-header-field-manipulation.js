var angular = require('angular');
var template = require('./http-header-field-manipulation.html');

var httpHeaderFieldManipulationDirective = angular.module('httpHeaderFieldManipulationDirective', [])
.directive('httpHeaderFieldManipulation', function(){
  return {
    template: template
  }
})
.name;

module.exports = httpHeaderFieldManipulationDirective;
