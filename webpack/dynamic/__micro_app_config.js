const appName = 'web-boh-common';
const pages = JSON.parse('{"navbar":{"route":true},"menu":{"route":true}}');
const path = '/Users/yongbao.fyb/Desktop/sass/BOH/web-boh-common/src';

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