const appName = '{{ appName }}';
const pages = JSON.parse('{{ pages }}');

const pageList = [];
Object.keys(pages).forEach(item => {
  if (item !== 'common') {
    pageList.push({
      miniAppName: item,
      getComponent: () => import(/* webpackChunkName: "[request]" */`./${item}`),
      route: pages[item].route,
    });
  }
});

export default {
  appName,
  pageList,
};
