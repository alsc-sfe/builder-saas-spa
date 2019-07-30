echo '执行 build.bat'
:: 指定构建文件地址（webpack cli 参考文档：http://webpack.github.io/docs/cli.html）
webpack --config %BUILD_BUILDER_DIR%/webpack/webpack.build.config.js --display-error-details --bail