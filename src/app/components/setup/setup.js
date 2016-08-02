var angular = require("angular");
var uiRouter = require("angular-ui-router");
var setupComponent = require("./setup.component");

var step1 = require("./step1.html");
var step2 = require("./step2.html");
var step3 = require("./step3.html");
var step4 = require("./step4.html");

var setupModule = angular.module("setup", [
  uiRouter
])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider.state('setup', {
    url: '/setup',
    template: '<setup></setup>'
  })
  .state('setup.step1', {
    url: '/step1',
    template: step1
  })
  .state('setup.step2', {
    url: '/step2',
    template: step2
  })
  .state('setup.step3', {
    url: '/step3',
    template: step3
  })
  .state('setup.step4', {
    url: '/step4',
    template: step4
  });

  $urlRouterProvider.otherwise('/step1');
})
.component("setup", setupComponent)
.name;

module.exports = setupModule;
