'use strict';

const chalk = require("chalk");
const path = require('path');
const url = require('url-join');
const parse = require('yargs-parser');
const BUILDER_ENV = require('./env');
const ROOT_PATH = process.cwd();
const SAAS_CONFIG = require(path.join(ROOT_PATH, 'app.config.ts'));

const BUILD_ENV = BUILDER_ENV.BUILD_ENV;
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = BUILDER_ENV.BUILD_DEST ? path.join(ROOT_PATH, BUILDER_ENV.BUILD_DEST) : path.resolve(ROOT_PATH, 'build');
const BUILD_GIT_GROUP = BUILDER_ENV.BUILD_GIT_GROUP;
const BUILD_GIT_PROJECT = BUILDER_ENV.BUILD_GIT_PROJECT;
const BUILD_GIT_VERSION = BUILDER_ENV.BUILD_GIT_VERSION;

let argv = !!BUILDER_ENV.BUILD_ARGV_STR ? parse(BUILDER_ENV.BUILD_ARGV_STR) : {};

// 取得当前是日常还是生产环境
// 日常： --def_publish_type=assets --def_publish_env=daily
// 生产：
console.log('获取构建环境：');
console.log(BUILDER_ENV.BUILD_ARGV_STR);
// 云构建时校验是否开启线上构建
if (BUILD_ENV === 'cloud' && !argv.def_publish_env) {
  console.log(chalk.red('未开启线上构建, 参考文档：https://yuque.antfin-inc.com/alsc-saas/vt2tmg/ehge2p#UqnpK'));
  process.exit(0);  
}

let CDN_BASE = '//g.alicdn.com/';
if (argv.def_publish_env === 'daily') {
  CDN_BASE = '//g-assets.daily.taobao.net/';
}

let ASSETS_URL = '/';

// 云构建时使用设置ASSETS_URL
if (BUILD_ENV === 'cloud') {
  ASSETS_URL = url(CDN_BASE, BUILD_GIT_GROUP, BUILD_GIT_PROJECT, BUILD_GIT_VERSION, '/');
}

// CSS MODULE NAMESPACE
let CSS_SCOPE = ROOT_PATH.split('/').pop().split('-').pop();

const PATH_PARAMS = {
  ROOT_PATH,
  SRC_PATH,
  BUILD_PATH,
  CDN_BASE,
  ASSETS_URL,
  SAAS_CONFIG,
  CSS_SCOPE
};

// console.log('PROCESS_ENV');
// console.log(JSON.stringify(process.env, null, 2));

// console.log('PATH_PARAMS:');
// console.log(JSON.stringify(PATH_PARAMS, null, 2));

module.exports = PATH_PARAMS;