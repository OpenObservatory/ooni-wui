var template = require("./measurement-summary.html");
var controller = require("./measurement-summary.controller.js");
require("./measurement-summary.scss");

module.exports = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: controller
};
