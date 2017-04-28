var path = require('path');
var webpack = require('webpack');


const PATHS = {
  app: path.join(__dirname, './app'),
  build: path.join('./dist')
};

module.exports = {
  entry: './app/index.js',
  output: {
    path: PATHS.app,
    filename: 'bundle.js',
    publicPath: '/app/assets/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};