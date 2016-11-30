var angular = require("angular");
var uiRouter = require("angular-ui-router");
var logsComponent = require("./logs.component");

var logsModule = angular.module("logs", [
  uiRouter
])
.directive('showTail', function () {
  return function (scope, elem, attr) {
    scope.$watch(function () {
        return elem[0].value;
    },
      function (e) {
        elem[0].scrollTop = elem[0].scrollHeight;
      });
  }
})
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('logs', {
    url: '/logs',
    template: '<logs></logs>'
  });

})
.component("logs", logsComponent)
.name;

module.exports = logsModule;
