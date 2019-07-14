'use strict';

const BUILD_PATH = require('./util/const').BUILD_PATH;

module.exports = function () {
  return {
    mode: "production",
    // mode: "development",
    entry: {},
    output: {
      path: BUILD_PATH,
      filename: '[name].js',
      libraryTarget: 'system',
      chunkFilename: '[name].chunk.js'
    },
    module: {
      rules: [
        // If building code using the System global in Webpack, the following config is needed to avoid rewriting
        { parser: { system: false } }
      ]
    },
    plugins: []
  };
};