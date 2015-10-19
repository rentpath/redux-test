var webpack = require('webpack');
var path = require('path');

var webpackConfig = {
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions: ['', '.js', '.jsx']
  },
  entry:  [
    './client'
  ],
  output: {
    path: path.resolve('./build/js'),
    publicPath: '/public/js/',
    filename: 'main.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
    ]
  },
  node: {
    setImmediate: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  devtool: 'source-map'
};

module.exports = webpackConfig;
