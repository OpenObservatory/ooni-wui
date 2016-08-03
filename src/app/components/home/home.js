var angular = require("angular");
var uiRouter = require("angular-ui-router");
var homeComponent = require("./home.component");
var setupModule = require("../setup/setup");

var homeModule = angular.module("home", [
  uiRouter,
  setupModule
])
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('home', {
    url: '/',
    template: '<home></home>'
  });

  $urlRouterProvider.otherwise('/');
})
.component("home", homeComponent)
.name;

module.exports = homeModule;
