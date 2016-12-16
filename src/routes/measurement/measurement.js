var angular = require('angular');
var uiRouter = require('angular-ui-router');

var measurementComponent = require('./measurement.component.js');
var measurementFactory = require('./measurement.factory.js');

var webConnectivityDirective = require('./directives/web-connectivity');
var httpInvalidRequestLineDirective = require('./directives/http-invalid-request-line');
var httpHeaderFieldManipulationDirective = require('./directives/http-header-field-manipulation');

var facebookMessengerDirective = require('./directives/facebook-messenger');
var whatsappDirective = require('./directives/whatsapp');

var measurementModule = angular.module("measurement", [
  uiRouter,
  webConnectivityDirective,
  httpInvalidRequestLineDirective,
  httpHeaderFieldManipulationDirective,

  facebookMessengerDirective,
  whatsappDirective
])
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('measurement', {
    url: '/measurement/:measurementId/:idx',
    template: '<measurement></measurement>'
  });

})
.factory('Measurement', ['$http', '$q', measurementFactory])
.component("measurement", measurementComponent)
.name;

module.exports = measurementModule;
