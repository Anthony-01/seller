import Vue from 'vue'
import Router from 'vue-router'
import ratings from "../components/ratings/ratings";
import router2 from '../components/router/router_2';
import good from "@/components/goods/goods";
// import Admin from '../components/router/admin_0';

const User = {
  template: '<div>User {{ $route.params.id }}</div>'
};

Vue.use(Router);

const router = new Router({
  routes: [
      {
          path: '/goods',
          component: good
      },
      {
          path: '/ratings',
          component: ratings
      },
      {
          path: '/router2',
          component: router2
      },
      {
          path: '/user/:id',
          component: User
      }
  ]
});

export default router;

const app = new Vue({
  router
}).$mount('#app');
