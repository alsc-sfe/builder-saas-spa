const miniAppName = '{{ appName }}';
const pages = JSON.parse('{{ pages }}');

const modules = [];
Object.keys(pages).forEach(item => {
  if (item !== 'common') {
    modules.push({
      moduleName: item,
      getComponent: () => import(/* webpackChunkName: "[request]" */`./src/${item}`),
      route: pages[item].route,
    });
  }
});

export default {
  miniAppName,
  modules,
};
