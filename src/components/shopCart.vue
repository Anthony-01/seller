<template>
  <div class="shopCart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrap">
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <i class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{'highlight': totalPrice >= minPrice}">
          {{deliDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      selectedFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectedFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectedFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      deliDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
          return `还差￥${this.minPrice - this.totalPrice}元起送`;
        } else {
          return "去结算";
        }
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "../common/styl/mlxin.styl"
  .shopCart
    position: fixed;
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    /*background: #141d27*/
    .content
      display: flex
      background: #141d27
      font-size: 0;
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex 1;
        .logo-wrap
          display: inline-block;
          vertical-align: top
          position: relative;
          top -10px;
          margin: 0 12px;
          padding: 6px;
          width 56px;
          height: 56px;
          box-sizing: border-box;
          border-radius 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%;
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height 44px;
              font-size: 12px;
              color: #80858a
              &.highlight
                color: #fff
          .num
            position absolute
            right 0;
            top 0;
            width: 24px
            height: 16px;
            line-height: 16px;
            text-align center
            border-radius: 16px;
            font-size: 9px
            font-weight: 700;
            color: #fff
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);

        .price
          display: inline-block
          vertical-align top
          margin-top: 12px
          line-height: 24px;
          padding-right: 12px;
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px;
          font-weight 700px
          color: rgba(255, 255, 255, 0.4)
          &.highlight
            color: #fff
        .desc
          display inline-block;
          vertical-align top
          margin 12px 0 0 12px;
          line-height 24px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 10px
      .content-right
        flex 0 0 105px;
        width 105px;
        .pay
          height: 48px;
          font-weight: 700
          font-size 12px;
          line-height 48px;
          text-align center
          background: #2b333b
          &.highlight
            background: #00b43c
            color: #fff
</style>
