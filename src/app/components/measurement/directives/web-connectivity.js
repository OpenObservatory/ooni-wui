var angular = require('angular');
var template = require('./web-connectivity.html');
require('./web-connectivity.scss');

var webConnectivityDirective = angular.module('webConnectivityDirective', [])
.directive('webConnectivity', function(){
  return {
    template: template
  }
})
.name;

module.exports = webConnectivityDirective;
