var angular = require("angular");
var uiRouter = require("angular-ui-router");
var homeComponent = require("./home.component");

var homeModule = angular.module("home", [
  uiRouter
])
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    template: '<home></home>'
  });

})
.component("home", homeComponent)
.name;

module.exports = homeModule;
