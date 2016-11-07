var gulp = require('gulp');
var gulpSass = require("gulp-sass");
var gulpSequence = require("gulp-sequence");
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
  rootWeb: path.join(__dirname, root),
  templates: path.join(__dirname, 'generator', 'component/**/*.**')
}

var modulesPath = path.join(__dirname, "node_modules");

var resolveToComponents = function(glob) {
  glob = glob || '';
  return path.join(root, 'app/components', glob);
};

gulp.task("dist:mobile-css", function() {
  var bootstrapPath = path.dirname(require.resolve("bootstrap-sass/package.json"));
  var files = [
    path.join(root, "app", "components", "setup", "setup-mobile.scss"),
  ];

  return gulp.src(files)
    .pipe(
      gulpSass({
        includePaths: [
            modulesPath
        ]
      }).on("error", gulpSass.logError)
    )
    .pipe(gulp.dest(path.join(paths.dest, "css")));
});

gulp.task('dist:mobile', function(done) {
  return gulpSequence([
    "clean",
    "dist:mobile-css"
  ])(done);
});

gulp.task('build', ['clean'], function(done) {
  var config = require('./webpack.config');
  if (yargs.argv.watch) {
    config.watch = true;
  }
  if (yargs.argv.dest) {
    console.log("Will write output to", yargs.argv.dest);
    config.output.path = yargs.argv.dest;
  }
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

gulp.task('component', function() {
  var cap = function(val) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }
  var name = yargs.argv.name;
  var parentPath = yargs.argv.parent || '';
  var destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.templates)
    .pipe(template({
       name: name,
       upCaseName: cap(name)
    }))
    .pipe(rename(function(path){
      path.basename = path.basename.replace('templ', name);
    }))
    .pipe(gulp.dest(destPath));

});

gulp.task('clean', function(done) {
  del([paths.dest]).then(function(paths){
    gutil.log("[clean]", paths);
    done();
  });
});
