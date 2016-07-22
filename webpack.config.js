var fs = require('fs');
var path = require('path');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;

var node_env = process.env.NODE_ENV || 'development';

var context = path.join(__dirname);

var rootWebPath = "./src";
var contextRoot = path.join(context, rootWebPath);

module.exports = {
  entry: {
    app: [path.join(contextRoot, "app", "app.js")]
  },
  output: {
    path: path.join(context, "dist", "build"),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: [/node_modules/], loader: 'ng-annotate'  },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2|otf)(\?v=\d+\.\d+\.\d+)?$/, loader:"url?prefix=font/&limit=10000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  plugins: [
    //new ImageminPlugin(),
    //new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      customBeforeBodyEnd: "",
      template: path.join(rootWebPath, 'index.html'),
      inject: 'body',
      hash: true
    })
  ]

}
