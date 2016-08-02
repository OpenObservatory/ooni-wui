var template = require("./setup.html");
var controller = require("./setup.controller");
require("./setup.scss");

module.exports = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: controller
};
