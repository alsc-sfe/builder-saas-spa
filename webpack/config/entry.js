'use strict';

const path = require('path');
const fs = require('fs');
const get = require('lodash/get');
const nunjucks = require('nunjucks');
const { ROOT_PATH, SAAS_CONFIG } = require('../util/const');
const minAppName = get(SAAS_CONFIG, 'microConfig.minAppName', '');

nunjucks.configure('*', {
  autoescape: false,
});

module.exports = function (config, argv) {
  let entries = config.entry || {};
  let hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
  const pages = get(SAAS_CONFIG, 'page', {});
  fs.writeFileSync(
    path.join(ROOT_PATH, '.micro_app_config.js'),
    nunjucks.renderString(fs.readFileSync(path.join(__dirname, '../dynamic/micro_app_config.es')).toString(), {
      appName: minAppName,
      pages: JSON.stringify(pages),
    }),
  );

  // micro app config file
  entries['app-config'] = path.join(ROOT_PATH, '.micro_app_config.js');
  config.entry = entries;
}