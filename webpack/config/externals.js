'use strict';

module.exports = function(config) {
  config.externals = config.externals || {};
  
  config.externals['react'] = 'React';
  config.externals['react-dom'] = 'ReactDOM';
}
