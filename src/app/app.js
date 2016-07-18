var angular = require('angular');
var uiRouter = require('angular-ui-router');
var AppComponent = require('./app.component');
var Common = require('./common/common');
var Components = require('./components/components');

require('normalize.css');

angular.module('app', [
    uiRouter,
    Common,
    Components
  ])
  .component('app', AppComponent);
