var angular = require('angular');
var uiRouter = require('angular-ui-router');
var Common = require('./common/common');
var Measurement = require('./.././measurement');
var AppComponent = require('./mobile.component');

require('normalize.css');

angular.module('app', [
    uiRouter,
    Common,
    Measurement
  ])
  .component('app', AppComponent)
  .run(['$state', function($state) {
    $state.go('measurement');
  }]);
