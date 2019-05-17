<template>
    <div>
      <my-head :seller="seller"></my-head>
      <p class="top">
        <router-link to="/router_0">商家</router-link>
        <router-link to="/router_1">评论</router-link>
        <router-link to="/router_2">商品</router-link>
      </p>
      <router-view></router-view>
    </div>
</template>

<script>
  import Vue from 'vue';
  import VueRouter from 'vue-router';

  import header from './header';
  export default {
    created () {
      this.$http.get('/api/seller').then((data) => {
        this.seller = data.body.data;
      })
    },
    data() {
      return {
        seller: {}
      }
    },
    components: {
      "my-head": header
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus">
  .top
    display: flex
    flex-direction: row
    justify-content: space-around
    text-decoration: none
</style>
