/**
 * dev配置文件
 */
// process.env.NODE_ENV = 'development';
const applyEntryConfig = require('./config/entry');
const applyResolveConfig = require('./config/resolve');
const applyBabelConfig = require('./config/babel');
const applyHtmlConfig = require('./config/html');
const applyImageConfig = require('./config/image');
const applyStyleConfig = require('./config/style');
const applyExternalConfig = require('./config/externals');
const applyOptimizationConfig = require('./config/optimization');
const applyUflifyConfig = require('./config/uglify');
const applyOtherConfig = require('./config/other');
const resolveAppConfig = require('./util/resolveAppConfig');

// webpack 基础配置
const getWebpackBase = require('./webpack.base.config');
let baseConfig = getWebpackBase();

// js入口
applyEntryConfig(baseConfig);
// webpack.resolve
applyResolveConfig(baseConfig);
// babel-loader js/jsx
applyBabelConfig(baseConfig);
// html模板替换
applyHtmlConfig(baseConfig);
// 图片 loader
applyImageConfig(baseConfig);
// css样式
applyStyleConfig(baseConfig);
// 外部引用类库
applyExternalConfig(baseConfig);
// common文件
// applyOptimizationConfig(baseConfig);
// uglify
// applyUflifyConfig(baseConfig);
// other
applyOtherConfig(baseConfig);

// 业务自定义配置
baseConfig = resolveAppConfig(baseConfig);

module.exports = baseConfig;