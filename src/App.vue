<template>
    <div>
      <my-head :seller="seller"></my-head>
      <div class="top border-lpx">
        <router-link to="/goods" class="route-item">商品</router-link>
        <router-link to="/router_1" class="route-item">评论</router-link>
        <router-link to="/router_2" class="route-item">商家</router-link>
      </div>
      <router-view :seller="seller"></router-view>
    </div>
</template>

<script>
  import Vue from 'vue';
  import VueRouter from 'vue-router';
  import ShopCart from 'components/shopCart.vue'

  import header from 'components/header';
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
      "my-head": header,
      "shop-cart": ShopCart
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus">

  @import './common/styl/mlxin.styl'

  .top
    display: flex
    flex-direction: row
    justify-content: space-around
    text-decoration: none
    height 40px;
    line-height 40px;
    margin 0

    border-1px(rgba(7, 17, 27, 0.1))
    .route-item
      text-decoration:none

</style>
