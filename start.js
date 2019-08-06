const webpack = require('webpack');
const chokidar = require('chokidar');
const portfinder = require('portfinder');
const querystring = require('querystring');
const open = require('open');
const path = require('path');
const get = require('lodash/get');
const WebpackDevServer = require('webpack-dev-server');

const webpackDevConfig = require("./webpack/webpack.dev.config");
const { SAAS_CONFIG } = require('./webpack/util/const');

const compiler = webpack(webpackDevConfig);

const start = async () => {
  const getStartParam = async () => {
    let devServer = get(SAAS_CONFIG, 'webpack.devServer', {});
    const port = await portfinder.getPortPromise();
    devServer.port = port;
    let startParam = Object.assign({
      host: 'local.koubei.test',
      path: '',
      query: {},
      port: 3333,
    }, devServer);
    let url = `http://${startParam.host}:${startParam.port}/index.html`;
    if (startParam.path) {
      url += `#/${startParam.path}`
    }
  
    const query = querystring.stringify(startParam.query);
    if (query) {
      url += `?${query}`;
    }
  
    return {
      url,
      port
    };
  };

  const startParam = await getStartParam();

  // 第一次编译成功时： 打开页面
  let hasCompile = false;
  compiler.plugin('done', async stats => {
    if (!stats.hasErrors() && !hasCompile) {
      open(startParam.url);
      hasCompile = true;
    }
  });

  // set devServerOption
  const devServerOption = {
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    compress: true,
    disableHostCheck: true,
    quiet: false,
    host: 'local.koubei.test',
  }

  // compile and start server
  const server = new WebpackDevServer(compiler, devServerOption);
  server.listen(startParam.port, '0.0.0.0')
}

const watch = () => {
  const appConfigPath = path.join(process.cwd(), 'app.config.ts');
  chokidar.watch(appConfigPath).on('change', () => {
    process.send('restart');
  });
}

(async () => {
  await start();
  watch();
})();
