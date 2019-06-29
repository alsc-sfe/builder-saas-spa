#! /bin/bash

echo '执行 build.sh'

tnpm ii

# 指定构建文件地址（webpack cli 参考文档：http://webpack.github.io/docs/cli.html）
webpack --config ${BUILD_BUILDER_DIR}/webpack/webpack.build.config.js --display-error-details --bail