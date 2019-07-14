'use strict';
const { resolve } = require;
const babelLoader = require('./babel');

module.exports = function (config) {

  config.module = config.module || {};
  config.module.rules = config.module.rules || [];


  let tsModuleRule = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      babelLoader,
      {
        loader: resolve('ts-loader'),
        options: { transpileOnly: true }
      }
    ]
  };

  config.module.rules.push(tsModuleRule);
};