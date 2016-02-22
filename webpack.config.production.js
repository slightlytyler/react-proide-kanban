'use strict';

var path = require('path');
var webpack = require('webpack');
var rucksack = require('rucksack-css');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    Lumbur: './src/renderApp.js',
    DarkTheme: './src/themes/dark/index.js',
    LightTheme: './src/themes/light/index.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
    chunkFilename: '[id].min.js',
    publicPath: '/dist/',
    library: '[name]',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.DefinePlugin({
      'process.env.MIN_EXT': JSON.stringify('.min')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name].min.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel'
        ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?minimize&modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
        ),
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },
  postcss: [
    rucksack({
      autoprefixer: true
    })
  ]
};
