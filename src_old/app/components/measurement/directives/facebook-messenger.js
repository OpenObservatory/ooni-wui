var angular = require('angular');
var template = require('./facebook-messenger.html');
//var description = require('./facebook-messenger.md');
var description = "";
require('./facebook-messenger.scss');

var facebookMessengerDirective = angular.module('facebookMessengerDirective', [])
.directive('facebookMessenger', ['$sce', function($sce){
  function link(scope, element, attrs) {
    scope.description = $sce.trustAsHtml(description);
  }
  return {
    template: template,
    link: link
  }
}])
.name;

module.exports = facebookMessengerDirective;
