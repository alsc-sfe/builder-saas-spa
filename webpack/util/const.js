'use strict';

const path = require('path');
const url = require('url-join');
const parse = require('yargs-parser');
const BUILDER_ENV = require('./env');
const ROOT_PATH = process.cwd();
const SAAS_CONFIG = require(path.join(ROOT_PATH, 'saas.config.ts'));

const BUILD_ENV = BUILDER_ENV.BUILD_ENV;
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = BUILDER_ENV.BUILD_DEST ? path.join(ROOT_PATH, BUILDER_ENV.BUILD_DEST) : path.resolve(ROOT_PATH, 'build');
const BUILD_GIT_GROUP = BUILDER_ENV.BUILD_GIT_GROUP;
const BUILD_GIT_PROJECT = BUILDER_ENV.BUILD_GIT_PROJECT;
const BUILD_GIT_VERSION = BUILDER_ENV.BUILD_GIT_VERSION;

// 取得当前是日常还是生产环境
let argv = !!BUILDER_ENV.BUILD_ARGV_STR ? parse(BUILDER_ENV.BUILD_ARGV_STR) : [];

let CDN_BASE = '//g.alicdn.com/';
if (argv.def_publish_env === 'daily') {
  CDN_BASE = '//g-assets.daily.taobao.net/';
}

let ASSETS_URL = './';

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

// console.log('PATH_PARAMS:');
// console.log(JSON.stringify(PATH_PARAMS, null, 2));

module.exports = PATH_PARAMS;