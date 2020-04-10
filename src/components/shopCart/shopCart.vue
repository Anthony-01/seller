<template>
  <div class="shopCart">
    <transition name="mask" @after-enter="maskAfterEnter" @before-leave="maskBeforeLeave">
      <div class="list-mask" v-show="listShow" @click="hiddenMask"></div>
    </transition>
    <div class="content" @click="toggleList">
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
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="{'highlight': totalPrice >= minPrice}">
          {{deliDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition name="drop" v-for="(item, index) in balls" :key="index" @before-enter="dropBeforeEnter"
                  @after-enter="dropAfterEnter" @enter="dropEnter">
        <div class="ball" v-show="item.show">
          <div class="inner"></div>
        </div>
      </transition>
    </div>
    <transition name="fold" @after-enter="foldAfterEnter" @before-leave="foldBeforeLeave">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <span class="title">购物车</span>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li v-for="(item, index) in selectedFoods" class="food" :key="index">
                <span class="name">{{item.name}}</span>
                <div class="price">
                  <span>￥{{item.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="item"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </transition>


  </div>


</template>

<script>
  import BScroll from 'better-scroll'
  import cartControl from 'components/cartControl'
  export default {
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      }
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
      },
      listShow() {
        if (this.totalCount <= 0) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh();
          }

        }
        return show;
      }
    },
    methods: {
      drop(el) {

        for (let n = 0; n < this.balls.length; n++) {
          let ball = this.balls[n];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            console.log(this.balls, this.dropBalls);
            return
          }
        }
      },
      dropBeforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let pos = ball.el.getBoundingClientRect();
            let x = pos.left - 32;
            let y = -(window.innerHeight - pos.top - 22);
            el.style.display = "";
            el.style.transform = `translate3d(0px, ${y}px, 0)`;
            el.style.webkitTransform = `translate3d(0px, ${y}px, 0)`;
            let inner = el.getElementsByClassName('inner')[0];
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
          }
        }

      },
      dropEnter(el) {
        let ref = el.offsetHeight;
        this.$nextTick(() => {
          el.style.transform = 'translate3d(0px, 0, 0)';
          el.style.webkitTransform = 'translate3d(0px, 0, 0)';
          let inner = el.getElementsByClassName('inner')[0];
          inner.style.transform = 'translate3d(0px, 0, 0)';
          inner.style.webkitTransform = 'translate3d(0px, 0, 0)';
        })
      },
      dropAfterEnter(el) {
          let ball = this.dropBalls.shift();
          if (ball) {
            ball.show = false;
            el.style.display = "none";
          }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        } else {
          this.fold = !this.fold;
        }
      },
      foldAfterEnter(el) {
        el.style.transform = "translate3d(0, -100%, 0)"
      },
      foldBeforeLeave(el) {
        el.style.transform = "";
      },
      empty() {
        this.selectedFoods.forEach(food => {
          food.count = 0;
        })
      },
      maskAfterEnter(el) {
        el.style.background = "rgba(7, 17, 27, 0.6)"
      },
      maskBeforeLeave(el) {
        el.style.background = ""
      },
      hiddenMask() {
        this.fold = true;
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
      }
    },
    components: {
      'cart-control': cartControl
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "../../common/styl/mlxin.styl"
  .shopCart
    position: absolute;
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
    .ball-container
      .ball
        position: fixed;
        left 32px;
        bottom 22px;
        z-index: 200;
        .inner
          width: 16px;
          height: 16px;
          background: rgb(0, 160, 220);
          border-radius 50%;
      .drop-enter-active
      //只有进入动画存在，离开不存在动画
        transition: all 0.4s cubic-bezier(0.29, -0.46, 0.86, 0.57);
        .inner
          transition all 0.4s linear


    .fold-enter-active, .fold-leave-active
      transform translate3d(0, -100%, 0);
      transition all 0.5s
    .fold-enter, .fold-leave-to
      transform translate3d(0, 0, 0);
    .shopcart-list
      position: absolute;
      left 0;
      top 0;
      width: 100%;
      z-index -1
      .list-header
        height: 40px
        line-height 40px
        padding 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title
          float left
          font-size 14px;
          font-weight 200;
          color: rgb(7, 17, 27)
        .empty
          float: right;
          font-size 12px;
          color: rgb(0, 160, 220);

      .list-content
        padding: 0 18px;
        background: #fff;
        max-height: 217px;
        overflow: hidden;
        .food
          padding 12px 0;
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            font-size: 14px;
            line-height: 24px;
            color: rgb(7, 17, 27);
          .price
            position absolute;
            right 90px;
            bottom 12px;
            font-weight: 700;
            font-size 14px;
            line-size 14px;
            color: rgb(240, 20, 20);
          .cartcontrol-wrapper
            position absolute;
            right 0;
            bottom 6px;


  .mask-enter-active, .mask-leave-active
    opacity 1
    background rgba(7, 17, 27, 0.6);
    transition all 0.5s;
  .mask-enter, .mask-leave-to
    opacity 0
    background rgba(7, 17, 27, 0);
  .list-mask
    position fixed;
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: -2
    backdrop-filter blur(10px)

</style>
