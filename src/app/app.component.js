var template = require('./app.html');
require('./app.scss');

var appComponent = {
  template,
  restrict: 'E'
};

module.exports = appComponent;
