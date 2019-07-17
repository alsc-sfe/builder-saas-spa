const miniAppName = '{{ appName }}';
const pages = JSON.parse('{{ pages }}');

const pageList = [];
Object.keys(pages).forEach(item => {
  if (item !== 'common') {
    pageList.push({
      pageName: item,
      getComponent: () => import(/* webpackChunkName: "[request]" */`./src/${item}`),
      route: pages[item].route,
    });
  }
});

export default {
  miniAppName,
  pageList,
};
