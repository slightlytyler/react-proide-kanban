'use strict';

var path = require('path');
var webpack = require('webpack');
var rucksack = require('rucksack-css');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    Lumbur: [
      'webpack-hot-middleware/client',
      './src/renderApp.js'
    ],
    DarkTheme: './src/themes/dark/index.js',
    LightTheme: './src/themes/light/index.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/dist/',
    library: '[name]',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.DefinePlugin({
      'process.env.MIN_EXT': JSON.stringify('')
    }),
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel?'+JSON.stringify({
            plugins: [
              ['react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }]
              }]
            ]
          })
        ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
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
