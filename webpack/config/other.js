'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackSystemRegister = require('webpack-system-register');
const replacePlugin = require('./systemModulePlugin');
const { ROOT_PATH } = require('../util/const');

module.exports = function(config){
  config.plugins = config.plugins || [];
  
  config.plugins.push(new replacePlugin());
  // config.plugins.push(new CleanWebpackPlugin([path.join(ROOT_PATH, 'build')]));
  // config.plugins.push(new WebpackSystemRegister({
  //   systemjsDeps: [
  //     /^react/,
  //     'react-dom', 
  //   ],
  // }));
};



