'use strict';

const BUILD_PATH = require('./util/const').BUILD_PATH;

module.exports = function () {
  return {
    mode: "development",
    entry: {},
    output: {
      path: BUILD_PATH,
      filename: '[name].js',
      libraryTarget: 'system',
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