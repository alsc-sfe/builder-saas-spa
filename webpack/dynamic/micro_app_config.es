const microAppName = '{{ appName }}';
const pages = JSON.parse('{{ pages }}');

const modules = [];
Object.keys(pages).forEach(item => {
  if (item !== 'common') {
    modules.push({
      moduleName: item,
      getComponent: () => System.import(PUBLIC_PATH + item + '.js'),
      route: pages[item].route,
    });
  }
});

export default {
  microAppName,
  modules,
};
