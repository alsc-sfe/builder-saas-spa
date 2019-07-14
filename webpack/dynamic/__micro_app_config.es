const appName = '{{ appName }}';
const pages = JSON.parse('{{ pages }}');
const path = '{{ path }}';

const pageList = [];
Object.keys(pages).forEach(item => {
  if (item !== 'common') {
    pageList.push({
      pageName: item,
      getComponent: () => import(/* webpackChunkName: "[request]" */`./${item}`),
      route: pages[item].route,
    });
  }
});

export default {
  appName,
  pageList,
};