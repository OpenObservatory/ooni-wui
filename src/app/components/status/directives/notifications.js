var angular = require('angular');

var notificationListTemplate = require('./notification-list.html');
var notificationTemplate = require('./notification.html');

var notificationsDirective = angular.module('notificationsDirective', [])
.directive('notificationList', function() {

  return {
    controller: ['$scope', 'Notification', function($scope, Notification) {
      $scope.notifications = [];
      Notification.register_handler(function(message) {
        console.log("Got message");
        console.log(message);
        $scope.notifications.push(message);
      });
    }],
    template: notificationListTemplate
  }
})
.directive('notification', ['$timeout', '$animate', function($timeout, $animate) {

  return {
    transclude: true,
    link: function (scope, element, attrs) {
      var timeout_interval = 8*1000;

      scope.dismiss = function(notification) {
        $animate.addClass(element, 'fade').then(function(){
          scope.notifications.pop(notification);
        });
      };

      element.on('mouseenter', function(){
        $timeout.cancel(timer);
      });

      element.on('mouseleave', function(){
        timer = $timeout(scope.dismiss, timeout_interval);
      });

      var timer = $timeout(scope.dismiss, timeout_interval);

    },
    template: notificationTemplate
  }
}])
.name;
module.exports = notificationsDirective;
