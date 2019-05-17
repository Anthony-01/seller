// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router';
import routerTest from './components/router-test.vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

//安装插件
Vue.use(VueRouter);

Vue.config.productionTip = false;


import router_0 from 'components/router/router_0.vue';
import router_1 from 'components/router/router_1.vue';
import router_2 from 'components/router/router_2.vue';

let routes = [
  {path: '/router_0', component: router_0},
  {path: '/router_1', component: router_1},
  {path: '/router_2', component: router_2}
];

let router = new VueRouter({
  routes
});
//router,
let app = new Vue({
  el: '#app',
  router,
  components: {routerTest},
  template: '<routerTest/>',
  data: {

  }
});




/* eslint-disable no-new */
// Vue.directive('focus', {
//   // 当被绑定的元素插入到 DOM 中时……
//   inserted: function (el) {
//     // 聚焦元素
//     el.focus()
//   }
// })
// new Vue({
//   el: '#app',
//   router,
//   components: { TodoList },
//   template: '<TodoList/>',
//   data: {
//     message: '页面加载于 ' + new Date().toLocaleString(),
//     todos: [
//       { text: '学习 JavaScript' },
//       { text: '学习 Vue' },
//       { text: '整个牛项目' }
//     ]
//   }
// })

