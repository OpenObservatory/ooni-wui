var angular = require("angular");
var uiRouter = require("angular-ui-router");
var nettestComponent = require("./nettest.component");
var nettestDetailComponent = require("./nettest.detail.component");
var detailTemplate = require("./nettest.detail.html");


var nettestModule = angular.module("nettest", [
  uiRouter
])
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('nettest', {
    url: '/nettest',
    template: '<nettest></nettest>'
  })
  .state('nettest.detail', {
    url: '/:id',
    template: '<testdetail></testdetail>'
  });

})
.component("nettest", nettestComponent)
.component("nettest.detail", nettestDetailComponent)
.name;

module.exports = nettestModule;
