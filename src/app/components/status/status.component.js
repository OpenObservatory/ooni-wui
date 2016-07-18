var template = require("./status.html");
var controller = require("./status.controller");
require("./status.scss");

module.exports = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: controller
};
