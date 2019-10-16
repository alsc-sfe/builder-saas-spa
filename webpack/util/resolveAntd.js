/**
 *  @description 解决antd样式污染问题， 通过alias指定到文件
 * */

const fs = require('fs');
const path = require('path');

const toHump = (name) => {
  const str = name.replace(/\-(\w)/g, (all, letter) => {
      return letter.toUpperCase();
  });
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = function(alias) {
  const antdFolder = path.join(__dirname, '../../node_modules/antd');
  const items = fs.readdirSync(path.join(antdFolder, 'lib'));
  items.filter(item => {
    const styleFilePath = `antd/lib/${item}/style`;
    alias[styleFilePath] = path.join(__dirname, '../mock/antdEmpty.less');
    // const jsFilePath = `antd/lib/${item}`;
    // alias[jsFilePath] = `window.antd.${toHump(item)}`;
  });
};