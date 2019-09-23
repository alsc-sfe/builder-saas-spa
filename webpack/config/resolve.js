'use strict';

const path = require('path');
const ROOT_PATH = require('../util/const').ROOT_PATH;

module.exports = function (config) {
  config.resolve = config.resolve || {};

  config.resolve.extensions = ['.js', '.jsx', '.less', '.ts', '.tsx'];

  const mPath = [
    'node_modules',
    path.join(ROOT_PATH, "node_modules"),
    path.join(__dirname, "../../", "node_modules"),
  ];

  // 创建 import 或 require 的别名
  config.resolve.alias = {
    'saas-fetch': '@ali/saas-fetch',
    'mtop-adapter': '@ali/mtop-adapter',
  };

  config.resolve.modules = mPath;

  config.resolveLoader = {
    modules: mPath,
  };
};
