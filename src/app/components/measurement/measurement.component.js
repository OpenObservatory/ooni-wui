var template = require("./measurement.html");
var controller = require("./measurement.controller");
require("./measurement.scss");

module.exports = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: controller
};
