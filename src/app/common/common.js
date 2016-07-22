var angular = require("angular");
var notificationFactory = require("./notification.factory");

var commonModule = angular.module("app.common",[
])
.factory('Notification', [notificationFactory])
.name;

module.exports = commonModule;
