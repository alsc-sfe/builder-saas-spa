'use strict';

const path = require('path');
const webpack = require('webpack');
const get = require('lodash/get');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const systemModulePlugin = require('@ali/saas-webpack-system-module');
const { ROOT_PATH, SAAS_CONFIG } = require('../util/const');
const miniAppName = get(SAAS_CONFIG, 'miniAppName', '');

module.exports = function(config){
  config.plugins = config.plugins || [];

  config.plugins.push(new systemModulePlugin());
  config.plugins.push(new CleanWebpackPlugin([path.join(ROOT_PATH, 'build')]));
  config.plugins.push(new webpack.DefinePlugin({
    'MINI_APPNAME': JSON.stringify(miniAppName),
  }));
};
