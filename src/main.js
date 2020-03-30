// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import 'common/styl/index.styl'
import good from 'components/goods.vue'
import router_1 from 'components/router/router_1.vue'
import router_2 from 'components/router/router_2.vue'
Vue.use(VueResource)

//安装插件
Vue.use(VueRouter)
Vue.use(Vuex)

Vue.use(Vuex);
const state={//要设置的全局访问的state对象
  showFooter: true,
  changableNum:0
  //要设置的初始属性值
};
const store = new Vuex.Store({
  state
});

Vue.config.productionTip = false


let routes = [
  {path: '/', redirect: 'goods'},
  {path: '/goods', component: good},
  {path: '/router_1', component: router_1},
  {path: '/router_2', component: router_2}
];

let router = new VueRouter({
  routes
});
let app = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<app/>',
  data: {

  }
});

