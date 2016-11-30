var angular = require("angular");
var Home = require("./home/home");
var Status = require("./status/status");
var Setup = require("./setup/setup");
var Nettest = require("./nettest/nettest");
var Deck = require("./deck/deck");
var Measurement = require("./measurement/measurement");
var MeasurementList = require("./measurement-list/measurement-list");
var MeasurementSummary = require("./measurement-summary/measurement-summary");
var Logs = require("./logs/logs");

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
