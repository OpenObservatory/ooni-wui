var angular = require("angular");
var Home = require("./home/home");
var Status = require("./status/status");
var Setup = require("./setup/setup");
var Nettest = require("./nettest/nettest");
var Measurement = require("./measurement/measurement");
var MeasurementList = require("./measurement-list/measurement-list");
var MeasurementSummary = require("./measurement-summary/measurement-summary");

var componentsModule = angular.module("app.components", [
  Status,
  Setup,
  Home,
  Nettest,
  Measurement,
  MeasurementList,
  MeasurementSummary
])
.name;

module.exports = componentsModule;
