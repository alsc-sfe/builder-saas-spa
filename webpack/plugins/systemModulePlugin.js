class systemModulePlugin {
  constructor() {
    
  }

  apply(compiler) {
    const self = this
    compiler.hooks.emit.tap("systemModulePlugin", function (compilation, callback) {
      Object.keys(compilation.assets).forEach((data)=> {
        let content = compilation.assets[data].source(); // 欲处理的文本
        // console.log('plugin compilation: ', content)
        content = content.replace(/module && module.__esModule/g, 'module && (module.__esModule || module.__useDefault)');
        content = content.replace(/return module.exports/g, 'return module.exports && module.exports.__useDefault ? module.exports.default : module.exports');
        content = content.replace(/return installedModules\[moduleId\].exports/, 'let module = installedModules[moduleId]; return module.exports && module.exports.__useDefault ? module.exports.default : module.exports;');

        compilation.assets[data] = {
          source(){
              return content
          },
          size(){
              return content.length
          }
        }
      })
    })
  }
}

module.exports = systemModulePlugin