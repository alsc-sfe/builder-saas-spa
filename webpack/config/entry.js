'use strict';

const path = require('path');
const fs = require('fs');
const get = require('lodash/get');
const nunjucks = require('nunjucks');
const { SRC_PATH, SAAS_CONFIG, ROOT_PATH } = require('../util/const');
const { name: appName } = require(path.join(ROOT_PATH, 'package.json'));

nunjucks.configure('*', {
  autoescape: false,
});

module.exports = function (config, argv) {
  let entries = config.entry || {};
  let hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
  const pages = get(SAAS_CONFIG, 'page', {});
  fs.writeFileSync(
    path.join(SRC_PATH, '__micro_app_config.js'),
    nunjucks.renderString(fs.readFileSync(path.join(__dirname, '../dynamic/__micro_app_config.es')).toString(), {
      appName,
      pages: JSON.stringify(pages),
    }),
  );

  // micro app config file
  entries['app-config'] = path.join(SRC_PATH, '__micro_app_config.js');
  config.entry = entries;
}