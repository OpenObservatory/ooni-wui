var template = require("./logs.html");
var controller = require("./logs.controller.js");
require("./logs.scss");

module.exports = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: controller
};
