var angular = require("angular");
var uiRouter = require("angular-ui-router");
var deckComponent = require("./deck.component");

var deckModule = angular.module("deck", [
  uiRouter
])
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('deck', {
    url: '/deck',
    template: '<deck></deck>'
  });

})
.component("deck", deckComponent)
.name;

module.exports = deckModule;
