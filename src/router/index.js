import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import router0 from '../components/router/router_0.vue';
import router1 from '../components/router/router_1';
import router2 from '../components/router/router_2';
import todo from '../TodoList.vue';
// import Admin from '../components/router/admin_0';

const User = {
  template: '<div>User {{ $route.params.id }}</div>'
};

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/router0',
      component: router0
    },
    {
      path: '/router1',
      component: router1
    },
    {
      path: '/router2',
      component: router2
    },
    {
      path: '/todo',
      name: "todoCom",
      component: todo
    },
    {
      path: '/user/:id',
      component: User
    }
    //,
    // {
    //   //使用通配符匹配路由器
    //   path: "*",
    //   component: Admin
    // }
  ]
});

export default router;

const app = new Vue({
  router
}).$mount('#app');
