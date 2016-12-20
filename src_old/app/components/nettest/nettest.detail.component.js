var template = require("./nettest.detail.html");
var controller = require("./nettest.detail.controller.js");
require("./nettest.css");

module.exports = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: controller
};
