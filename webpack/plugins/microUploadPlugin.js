const BASIC_ENV = require('../util/env');
const CONST_EVN = require('../util/const');

class microUploadPlugin {
  constructor() {
    
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('microUploadPlugin', (compilation) => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync('microUploadPlugin', (data, callback) => {
          // 获取构建资源列表
          const chunks = data.assets.chunks || {};
          const ASSETS_URL = CONST_EVN.ASSETS_URL;
          const pages = CONST_EVN.SAAS_CONFIG.page;
          const BUILD_GIT_PROJECT = BASIC_ENV.BUILD_GIT_PROJECT;
          const BUILD_GIT_BRANCH = BASIC_ENV.BUILD_GIT_BRANCH;
          const map = {};
          Object.keys(chunks).forEach(key => {
            map[key] = {
              route: pages[key].route,
              js: ASSETS_URL + chunks[key].entry
            };
          });
          const assetsMap = {
            [BUILD_GIT_PROJECT]: {
              branch: BUILD_GIT_BRANCH,
              map,
            }
          };

          process.env.assets = JSON.stringify({
            assetsMap,
            buildAssets: data.assets,
            BASIC_ENV,
            CONST_EVN,
          });

          callback(null, data);
        }
      )

      compiler.plugin('emit', (compilation, callback) => {
        // 存储构建资源列表
        compilation.assets['assets.json'] = {
          source: function() {
            return process.env.assets;
          },
          size: function() {
            return process.env.assets.length;
          }
        };
    
        callback();
      });
    })
  }
}

module.exports = microUploadPlugin