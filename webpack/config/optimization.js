'use strict';

const path = require('path');
const saasConfig = require(path.join(process.cwd(), 'saas.config.js'));

module.exports = function (config) {
  config.optimization = config.optimization || {};

  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "common",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  };
}