<template>
  <div>
    <my-head :seller="seller"></my-head>
<!--    <div class="top border-lpx">-->
<!--      <router-link to="/goods" class="route-item" >商品</router-link>-->
<!--      <router-link to="/ratings" class="route-item">评论</router-link>-->
<!--      <router-link to="/router_2" class="route-item">商家</router-link>-->
<!--    </div>-->
<!--    <router-view :seller="seller"></router-view>-->
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
  // import Vue from 'vue';
  // import VueRouter from 'vue-router';
  // import ShopCart from 'components/shopCart.vue'
  import tab from "components/tab/tab";
  import goods from "components/goods/goods";
  import ratings from "components/ratings/ratings";
  import sellers from 'components/router/router_2';

  import {getSeller} from "./model/api";
  import qs from 'query-string';

  import header from 'components/header';

  export default {
    created() {
      console.log(location.search);
      console.log(qs.parse(location.search).id);
      this.$http.get('/api/seller').then((data) => {
        this.seller = data.body.data;
      })
    },
    computed: {
      tabs() {
        return [{
          label: '商品', component: goods, data: { seller: this.seller }, id: 1
        }, {
          label: '评分', component: ratings, data: { seller: this.seller, id: 2 }
        }, {
          label: '商家', component: sellers, data: { seller: this.seller, id: 3 }
        }]
      }
    },
    methods: {
      async _getSeller() {
        try {
          let res = await getSeller({
            id: this.seller.id
          });
          // 成功响应 reslove
          if (res.errno === 0) {
            this.seller = Object.assign({}, this.seller, res.data)
          }
        } catch (error) {
          // 失败响应reject
          console.log(error)
        } finally {

        }
      }
    },
    data() {
      return {
        seller: {
          id: qs.parse(location.search).id
        }
      }
    },
    components: {
      "my-head": header,
      tab
    }
  }
</script>

<style scoped type="text/stylus" lang="stylus">

  @import './common/styl/mlxin.styl'
  .tab-wrapper
    position: fixed
    top 136px;
    right: 0
    left: 0
    bottom: 0

  .top
      display: flex
      flex-direction: row
      justify-content: space-around
      text-decoration: none
      height 40px;
      line-height 40px;
      margin 0
      align-items center

      border-1px(rgba(7, 17, 27, 0.1))
      .route-item
          text-decoration: none
          color: rgb(77, 85, 93);
          font-size 14px;
          line-height 14px
          &:hover
            color: rgb(240, 20, 20)

</style>
