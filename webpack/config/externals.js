'use strict';

module.exports = function(config) {
  config.externals = config.externals || {};
  
  config.externals['react'] = 'React';
  config.externals['react-dom'] = 'ReactDOM';
  config.externals['antd'] = 'antd';
  config.externals['@ant-desin/icons'] = 'AntDesignIcons';
  config.externals['single-spa'] = 'singleSpa';
}
