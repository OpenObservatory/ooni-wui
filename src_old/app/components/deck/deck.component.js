var template = require("./deck.html");
var controller = require("./deck.controller.js");
require("./deck.scss");

module.exports = {
  restrict: 'E',
  bindings: {},
  template: template,
  controller: controller
};
