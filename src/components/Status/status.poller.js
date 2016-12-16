var angular = require('angular');

var StatusPollerFactory = function($interval, $q, $http) {
  
  var defaults = {
    initializeUrl: "/api/status",
    updateUrl: "/api/status/update",
    delay: 1*1000
  };
  
  function StatusPoller(options) {
    var props = [
      'updateUrl',
      'delay',
      'initializeUrl'
    ];
    var self = this;

    angular.forEach(props, function(prop) {
      if (options && options[prop]) {
        self[prop] = options[prop];
      } else {
        self[prop] = defaults[prop];
      }
    });
  }

  StatusPoller.prototype.initalState = function() {
    // This fetches the first state.
    var self = this;
    $http.get(self.initializeUrl).then(
      function(result) {
        self.deferred.notify(result);
      },
      function(error) {
        self.deferred.notify(error);
      }
    );
  }
  
  StatusPoller.prototype.start = function() {
    var delay = this.delay;
    var initializeUrl = this.initializeUrl;
    var self = this;
    var current;

    this.deferred = this.deferred || $q.defer();
    if (angular.isDefined(initializeUrl)) {
      this.initalState();
    }
 
    function tick() {
      // If we haven't resolved the request don't send another one
      if (angular.isUndefined(current) ||
          current.$resolved) {
        current = $http.get(self.updateUrl).then(
          function(result){
            current.$resolved = true;
            self.deferred.notify(result);
          },
          function(error) {
            current.$resolved = true;
            self.deferred.notify(error);
          }
        );
        current.$resolved = false;
      }

    }
    
    tick();
    this.interval = $interval(tick, delay);
    this.promise = this.deferred.promise;
    
  }

  return {
    get: function(options) {
      return new StatusPoller(options);
    }
  }
}

module.exports = StatusPollerFactory;
