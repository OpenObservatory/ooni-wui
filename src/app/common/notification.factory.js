var angular = require('angular');

var NotificationFactory = function() {
  var handlers = [];
  
  return {
    register_handler: function(fn) {
      handlers.push(fn);
    },

    got_message: function(text, type) {
      var message = {
        text: text,
        type: type
      };
      console.log(new Date());
      var idx = 0;
      angular.forEach(handlers, function(handler) {
        idx += 1;
        handler(message);
      });
    },

    success: function(text) {
      this.got_message(text, "success");
    },

    error: function(text, error) {
      if (error && error.data && error.data.error_code) {
        text += " error_code: " + error.data.error_code;
        text += " backend_message: " + error.data.error_message;
      }
      this.got_message(text, "danger");
    },

    info: function(text) {
      this.got_message(text, "info");
    },

    warning: function(text) {
      this.got_message(text, "warning");
    }
  }
}
 
module.exports = NotificationFactory;
