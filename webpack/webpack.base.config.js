'use strict';

const BUILD_PATH = require('./util/const').BUILD_PATH;

module.exports = function () {
  return {
    mode: "production",
    entry: {},
    output: {
      path: BUILD_PATH,
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'singleApp',
    },
    module: {},
    plugins: []
  };
};