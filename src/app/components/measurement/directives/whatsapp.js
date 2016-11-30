var angular = require('angular');
var template = require('./whatsapp.html');
//var description = require('./facebook-messenger.md');
var description = "";
require('./whatsapp.scss');

var whatsappDirective = angular.module('whatsappDirective', [])
.directive('whatsapp', ['$sce', function($sce){
  function link(scope, element, attrs) {
    scope.description = $sce.trustAsHtml(description);
  }
  return {
    template: template,
    link: link
  }
}])
.name;

module.exports = whatsappDirective;
