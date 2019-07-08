'use strict';
const { resolve } = require;
const { CSS_SCOPE } = require('../util/const');


module.exports = function (config) {

  config.module = config.module || {};
  config.module.rules = config.module.rules || [];


  let babelModuleRule = {
    test: /\.js|jsx$/,
    exclude: /node_modules/,
    use: {
      loader: resolve('babel-loader'),
      options: {
        compact: false,
        presets: [
          resolve('@babel/preset-react'),
          [
            resolve('@babel/preset-env'),
            {
              targets: {
                browsers: [
                  'last 2 versions',
                  'Firefox ESR',
                  '> 1%',
                  'ie >= 8',
                  'iOS >= 8',
                  'Android >= 4',
                ],
              },
            },
          ],
        ],
        plugins: [
          resolve('@babel/plugin-proposal-object-rest-spread'),
          [
            resolve('@babel/plugin-proposal-decorators'),
            {
              legacy: true,
            },
          ],
          resolve('@babel/plugin-proposal-class-properties'),
          resolve('@babel/plugin-proposal-export-default-from'),
          resolve('@babel/plugin-proposal-export-namespace-from'),
          [resolve('babel-plugin-import'), {
            libraryName: '@alipay/cook',
            style: true,
          }, '@alipay/cook'],
          [resolve('babel-plugin-import'), {
            libraryName: 'antd',
            style: true,
          }, 'antd'],
          resolve('babel-plugin-syntax-dynamic-import'),
          [resolve('babel-plugin-react-css-modules'),{
            context: 'src',
            generateScopedName: `${CSS_SCOPE}_[path][local]_[hash:base64:5]`,
            webpackHotModuleReloading: true
          }]
        ],
      }
    }
  };

  config.module.rules.push(babelModuleRule);
};