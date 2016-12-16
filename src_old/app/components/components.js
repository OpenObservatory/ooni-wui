var angular = require("angular");
var Home = require("./home/home");
var Status = require("./../.././status");
var Setup = require("./../.././Onboard");
var Nettest = require("./../.././nettest");
var Deck = require("./../.././deck");
var Measurement = require("./../.././measurement");
var MeasurementList = require("./../.././Measurements");
var MeasurementSummary = require("./../.././measurement-summary");
var Logs = require("./../.././logs");

var componentsModule = angular.module("app.components", [
  Deck,
  Home,
  Logs,
  Nettest,
  Measurement,
  MeasurementList,
  MeasurementSummary,
  Setup,
  Status
])
.name;

module.exports = componentsModule;
