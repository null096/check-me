const path = require('path');
const { NODE_ENV } = process.env;

let devConfig;
if (NODE_ENV === 'development') {
  devConfig = {
    devtool: 'source-map',
    watch: true,
  };
}

module.exports = {
  ...devConfig,
  mode: NODE_ENV,
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  stats: {
    colors: true
  },
  bail: true
};