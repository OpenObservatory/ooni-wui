var MeasurementFactory = function($http, $q) {
  var get;
  if (typeof MeasurementJSON != "undefined") {
    get = function(measurement_id, idx) {
      return $q(function(resolve, reject) {
        try {
          var measurement_str = MeasurementJSON.get();
          resolve(JSON.parse(measurement_str));
        } catch (err) {
          reject(err);
        }
      });
    }
  } else {
    get = function(measurement_id, idx) {
      return $q(function(resolve, reject){
        $http.get('/api/measurement/'+measurement_id+'/'+idx)
        .then(function(response) {
          resolve(response.data);
        }, function(error) {
          reject(error);
        });
      })
    }
  }
  return {
    get: get
  }
}

module.exports = MeasurementFactory;
