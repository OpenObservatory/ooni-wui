var angular = require('angular');
var ngAnimate = require('angular-animate');
var uiRouter = require('angular-ui-router');
var AppComponent = require('./app.component');
var Common = require('./common/common');
var Components = require('./components/components');

require('normalize.css');

angular.module('app', [
    uiRouter,
    ngAnimate,
    Common,
    Components
  ])
  .component('app', AppComponent);
