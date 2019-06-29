'use strict';

const BUILD_PATH = require('./util/const').BUILD_PATH;

module.exports = function () {
  return {
    mode: "production",
    entry: {},
    output: {
      publicPath: '',
      path: BUILD_PATH,
      filename: '[name].js',
      sourceMapFilename: '[file].map'
    },
    module: {},
    plugins: []
  };
};