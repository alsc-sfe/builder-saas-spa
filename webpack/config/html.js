'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const get = require('lodash/get');
const { ASSETS_URL, SAAS_CONFIG } = require('../util/const');
const plugins = require('../util/resolvePlugins')();

const { resolveHeads, resolveBodies } = plugins;

module.exports = function (config, argv) {
  config.plugins = config.plugins || [];

  let htmlWebpackPlugins = [];
  let pages = get(SAAS_CONFIG, 'page', {});
  let debug = get(SAAS_CONFIG, 'debug', false);
  let miniAppName = get(SAAS_CONFIG, 'miniAppName', '');
  let isCommonApp = get(SAAS_CONFIG, 'isCommonApp', false);

  miniAppName = miniAppName ? miniAppName : 'common';
  const commonAppName = isCommonApp ? miniAppName : 'common';

  htmlWebpackPlugins.push(new HtmlWebpackPlugin({
    inject: false,
    template: require.resolve('./template.html'),
    filename: 'index.html',
    pages: JSON.stringify(pages),
    debug: debug,
    heads: resolveHeads,
    bodies: resolveBodies,
    assets_url: ASSETS_URL,
    miniAppName,
    commonAppName,
    env: process.env.NODE_ENV || 'production',
  }));

  config.plugins = config.plugins.concat(htmlWebpackPlugins);
}