var angular = require("angular");
var uiRouter = require("angular-ui-router");
var measurementSummaryComponent = require("./measurement-summary.component");

var measurementSummaryModule = angular.module("measurementSummary", [
  uiRouter
])
.filter('cut', function () {
  return function (value, wordwise, max, tail) {
    if (!value) return '';

    max = parseInt(max, 10);
    if (!max) return value;
    if (value.length <= max) return value;

    value = value.substr(0, max);
    if (wordwise) {
      var lastspace = value.lastIndexOf(' ');
      if (lastspace != -1) {
        //Also remove . and , so its gives a cleaner result.
        if (value.charAt(lastspace - 1) == '.' || value.charAt(lastspace - 1) == ',') {
          lastspace = lastspace - 1;
        }
        value = value.substr(0, lastspace);
      }
    }

    return value + (tail || ' …');
  };
})
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('measurement-summary', {
    url: '/measurement/:measurementId',
    template: '<measurement-summary></measurement-summary>'
  });

})
.component("measurementSummary", measurementSummaryComponent)
.name;

module.exports = measurementSummaryModule;
