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
import router from "./router";
import './cube-ui'
import './common/styl/index.styl'
Vue.use(VueResource)

//安装插件
Vue.use(VueRouter)

Vue.use(Vuex);

Vue.config.productionTip = false

let app = new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<app/>',
});

