'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { ROOT_PATH } = require('../util/const');

module.exports = function(config){
  config.plugins = config.plugins || [];
  
  config.plugins.push(new CleanWebpackPlugin([path.join(ROOT_PATH, 'build')]));
};



