var template = require("./home.html");
var controller = require("./home.controller");
require("./home.scss");

module.exports = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: controller
};
