var gulp = require('gulp');
var webpack = require('webpack');
var path = require('path');
var rename = require('gulp-rename');
var template = require('gulp-template');
var gutil = require('gulp-util');
var fs = require('fs');
var yargs = require('yargs');
var del = require('del');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var root = 'src';

var paths = {
  entry: {
    mobile: path.join(__dirname, root, 'app/mobile.js'),
    app: path.join(__dirname, root, 'app/app.js')
  },
  fixtures: path.join(__dirname, 'fixtures', 'measurement.js'),
  dest: path.join(__dirname, 'dist'),
  rootWeb: path.join(__dirname, root)
}

gulp.task('build', ['clean'], function(done) {
  var config = require('./webpack.config');
  if (yargs.argv.mobile) {
    config.entry = {
      mobile: paths.entry.mobile
    }
    if (yargs.argv.fixtures) {
      config.plugins.push(
        new HtmlWebpackPlugin({
          template: path.join(paths.rootWeb, 'mobile.html'),
          inject: 'body',
          hash: true,
          filename: 'mobile.html'
        })
      );

    }
    if (yargs.argv.watch) {
      config.watch = true;
    }
  }
  webpack(config, function(err, status){
    if (err) {
      throw new gutil.PluginError("build", err);
    }
    gutil.log("[build]", status.toString());
    if (!yargs.argv.watch) {
        done();
    }
  });
});

gulp.task('clean', function(done) {
  del([paths.dest]).then(function(paths){
    gutil.log("[clean]", paths);
    done();
  });
});
