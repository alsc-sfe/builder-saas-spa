'use strict';

const path = require('path');
const { SRC_PATH, SAAS_CONFIG } = require('../util/const');
const plugins = require('../util/resolvePlugins')();
const { resolveEntry } = plugins;

module.exports = function (config, argv) {
  let entries = config.entry || {};
  let hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
  let pages = SAAS_CONFIG.page;

  Object.keys(pages).forEach(chunkName => {
    let entryValue = [];

    //每个页面的index.jsx入口文件
    let jsEntryFile = path.join(SRC_PATH, chunkName, 'index');
    let commonEntryFile = path.join(SRC_PATH, 'common/index');
  
    entryValue.push(commonEntryFile, jsEntryFile);
    // process.env.NODE_ENV === 'development' && entryValue.push(hotMiddlewareScript);
    // merge plugin entry
    entryValue = entryValue.concat(resolveEntry);
    entries[chunkName] = entryValue;
  })

  // console.log('entry:');
  // console.log(entries);

  config.entry = entries;
}