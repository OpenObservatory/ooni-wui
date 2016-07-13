var angular = require('angular');
var uiRouter = require('angular-ui-router');

var measurementComponent = require('./measurement.component');
var measurementFactory = require('./measurement.factory');

var webConnectivityDirective = require('./directives/web-connectivity');
var httpInvalidRequestLineDirective = require('./directives/http-invalid-request-line');
var httpHeaderFieldManipulation = require('./directives/http-header-field-manipulation');

var measurementModule = angular.module("measurement", [
  uiRouter,
  webConnectivityDirective,
  httpInvalidRequestLineDirective,
  httpHeaderFieldManipulation
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
