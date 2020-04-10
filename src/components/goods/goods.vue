<template>
    <div class="goods">
<!--      <div class="menu-wrapper" ref="menuWrapper">-->
<!--        <ul class="menu">-->
<!--          <li class="menu-item" v-for="(item, index) in goods" :class="{'currentItem': index===currentIndex}" @click="selectedMenu(index, $event)" :key="index">-->
<!--            <span class="text border-1px">-->
<!--              <span v-show="item.type >= 0" class="icon" :class="classMap[item.type]"></span>-->
<!--              {{item.name}}-->
<!--            </span>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
<!--      <div class="foods-wrapper" ref="foodsWrapper">-->
<!--        <ul class="food">-->
<!--          <li v-for="(item, index) in goods" class="food-list food-list-hook" :key="index">-->
<!--            <h1 class="title">{{item.name}}</h1>-->
<!--            <ul>-->
<!--              <li v-for="(food, index) in item.foods" class="food-item border-1px" :key="index"  @click="selectFood(food, $event)">-->
<!--                <div class="icon">-->
<!--                  <img :src="food.icon" class="food-img" @load="loadImg($event)">-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                  <h1 class="name">{{food.name}}</h1>-->
<!--                  <p class="desc">{{food.description}}</p>-->
<!--                  <div class="extra">-->
<!--                    <span class="count">月售{{food.sellCount}}</span>-->
<!--                    <span>好评率{{food.rating}}%</span>-->
<!--                  </div>-->
<!--                  <div class="price">-->
<!--                    <span class="now">￥{{food.price}}</span>-->
<!--                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>-->
<!--                    <div class="cart-wrapper">-->
<!--                      <cart-control :food="food" @add-event="addEvent"></cart-control>-->
<!--                    </div>-->
<!--                  </div>-->

<!--                </div>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->

      <div class="scroll-nav-wrapper">
          <cube-scroll-nav :side="true" :data="goods" v-if="goods.length" :options="scrollOptions" >
              <template slot="bar" slot-scope="props">
                  <cube-scroll-nav-bar direction="vertical" :labels="props.labels" :txts="barTxts" :current="props.current " >
                      <template slot-scope="props">
                          <div class="text">
                              <span>{{props.txt.name}}</span>
                              <span class="num" v-if="props.txt.count">
<!--                                  <bubble :num="props.txt.count"></bubble>-->
                                  {{props.txt.count}}
                              </span>
                          </div>
                      </template>
                  </cube-scroll-nav-bar>
              </template>
              <cube-scroll-nav-panel v-for="good in goods" :key="good.name" :label="good.name" :title="good.name">
                  <ul>
                      <li v-for="food in good.foods" :key="food.name" class="food-item border-bottom-1px" @click="selectFood(food)">
                          <div class="icon">
                              <img :src="food.icon" width="57" height="57">
                          </div>
                          <div class="content">
                              <h2 class="name">{{food.name}}</h2>
                              <p class="desc">{{food.description}}</p>
                              <div class="extra">
                                  <span class="count">月售{{food.sellCount}}份</span><span>好评率:{{food.rating}}</span>
                              </div>
                              <div class="price">
                                  <span class="now">￥{{food.price}}</span>
                                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                              </div>
                              <div class="cart-control-wrapper">
                                  <cart-control :food="food" @add-event="addEvent"></cart-control>
                              </div>
                          </div>
                      </li>
                  </ul>
              </cube-scroll-nav-panel>
          </cube-scroll-nav>
      </div>

      <shop-cart :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice" :selectedFoods="selectedFoods" ref="shopCart"></shop-cart>
      <transition name="detail">
        <food :selectedFood="selectedFood" ref="detailFood" @add-event="addEvent"></food>
      </transition>
    </div>
</template>

<script>
  const ERR_OK = 0;
  import BScroll from 'better-scroll'
  import ShopCart from 'components/shopCart/shopCart'
  import cartControl from 'components/cartControl'
  import food from 'components/food/food'
  import {getGoods} from "../../model/api";

  export default {
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
//       getGoods().then((res) => {
//         // let info = res.body;
//         if (res.errno === ERR_OK) {
//
//           this.goods = res.data;
//
//           this.dataCurrent = true;
//
// //           this.$nextTick(() => {
// //             //dom更新后再获取
// //             this._calculate();
// //           });
//
//
//         }
//       }).catch(err => {
//         console.log(err);
//       })
    },
    mounted() {
      this.mounted = true;
      console.log("图片数量:", this.imCount);
      this.$nextTick(() => {
        // this._initScroll();
      })
    },
    data() {
      return {
        goods: [],
        menuScroll: null,
        foodsScroll: null,
        heightList: [],
        foodHeight: 0,
        dataCurrent: false,
        mounted: false,
        loadNum: 0,
        imgCount: 0,
        selectedFood: {},
        detailFlag: false,
        scrollOptions: {
          click: false,
          directionLockThreshold: 0
        }
      }
    },
    computed: {
      seller() {
        return this.data.seller;
      },
      selectedFoods() {
        let foods = [];
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count > 0) {
              foods.push(food);
            }
          })
        });
        return foods;
      },
      currentIndex() {
        for (let n = 0; n < this.heightList.length; n++) {
          let height1 = this.heightList[n];
          let height2 = this.heightList[n + 1];
          if (!height2 || (this.foodHeight >= height1 && this.foodHeight < height2)) {
            return n;
          }
        }
        return 0;

      },

      barTxts() {
        let ret = []
        this.goods.forEach((good) => {
          const { type, name, foods } = good;
          let count = 0;
          foods.forEach((food) => {
            // food默认是没有count属性的
            count += food.count || 0
          });
          ret.push({
            type,
            name,
            count
          })
        });
        return ret
      }
    },
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      loadImg (event) {
        //计算多次，想办法优化
        this.imCount = this.$refs.foodsWrapper.getElementsByClassName('food-img').length;

        this.loadNum++;
       // console.log("加载完成%d / %d", this.loadNum, this.imCount);
        if (this.loadNum === this.imCount) {
          this.$nextTick().then(() => {
            this._calculate();
          })
        }
      },
      selectFood(food, event) {
        // if (event)
        // event.stopP
        this.selectedFood = food;
        // this.$refs.detailFood.show();
        // this.detailFlag = true;
      },
      selectedMenu(index, event) {
//        console.log(index);
        let el = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      addEvent(el) {
        this.$refs.shopCart.drop(el);
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true});
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        });
        //监听实时滑动过程中的y数值
        this.foodsScroll.on("scroll", (pos) => {
           this.foodHeight = Math.abs(Math.round(pos.y));
//           console.log("current:", this.foodHeight);
        })
      },
      _calculate() {

        let height = 0;
        this.heightList.push(height);
        let foodItems = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');

        // console.log(foodItems[0].clientHeight);
        for (let n = 0; n < foodItems.length; n++) {
          height += foodItems[n].clientHeight;
//          console.log('height:\n', height, foodItems[n].clientHeight);
          this.heightList.push(height);
        }
      },
      getCurrentHeight() {

      },
      async getGoods() {
        try {
          // 防止在点击tab切换的时候返回重新请求数据(只请求一次就行)
          if (!this.fetched) {
            this.fetched = true
            let res = await getGoods({
              id: this.seller.id
            });
            if (res.errno === 0) {
              this.goods = res.data
            }
          }
        } catch (error) {

        }
      }
    },
    components: {
      "shop-cart": ShopCart,
      'cart-control': cartControl,
      food
    }
  }
</script>

<style lang='stylus' type="text/stylus">
  @import "~common/styl/mlxin.styl"

  .goods
    display: flex
    flex-wrap nowrap;
    align-items flex-start;
    position: relative;
    width: 100%;
    /*top: 174px;*/
    /*bottom: 46px;*/
    height: 100%;
    overflow hidden;
    .menu-wrapper
      flex-basis 80px;
      width 80px
      height: 100%
      flex-grow 0;
      flex-shrink 0;
      background-color: #f3f5f7;
      /*overflow auto;*/
      .menu
        .currentItem
          position: relative;
          /*z-index 10*/
          margin-top -1px
          font-weight: 700;
          background: #fff
          .text
            border-none()
        .menu-item
          display: table
          width: 56px
          height 54px
          padding 0 12px;
          line-height: 14px;
          word-wrap:break-word;
          .icon
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            vertical-align top
            &.decrease
              bg-image("../../../resource/img/decrease_3")
            &.discount
              bg-image("../../../resource/img/discount_3")
            &.guarantee
              bg-image("../../../resource/img/guarantee_3")
            &.invoice
              bg-image("../../../resource/img/invoice_3")
            &.special
              bg-image("../../../resource/img/special_3")
          .text
            display table-cell;
            width 56px;
            vertical-align middle;
            font-size 12px;
            line-height 12px
            border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            .text
              border-none()
    .foods-wrapper
      //分配剩余其他所有空间
      flex-grow 1;
      height 100%;
      .title
        height 26px;
        margin 0;
        padding-left 14px;
        font-size: 12px;
        color: rgb(147, 153, 159)
        line-height: 26px
        border-left 2px solid #dedde1
        background #f3f5f7;

      .food-item
        display flex
        flex-wrap no-wrap
        justify-content flex-start
        margin 18px;
        padding-bottom 18px;
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          padding-bottom 0;
        .icon
          flex 0 0 57px
          margin-right 10px
          img
            height: 57px
            width: 57px;
        .content
          flex 1
          .name
            margin 2px 0 8px 0;
            font-size 14px;
            line-height 14px;
            color rgb(7, 17, 27);
          .desc, .extra
            font-size: 10px
            line-height: 12px;
            color rgb(147, 153, 159)
          .desc
            margin-bottom 8px;
          .extra
            .count
              margin-right 12px;
          .price
            position relative
            font-weight 700
            line-height 24px;
            /*position absolute*/
            /*bottom 18px;*/
            .now
              font-size 14px;
              color rgb(240, 20, 20)
              margin-right 8px;
            .old
              font-size 12px;
              text-decoration line-through
              color rgb(147, 153, 159)
            .cart-wrapper
              display inline-block
              position: absolute
              right: 0px;
              bottom 6px
              font-weight normal
              vertical-align top
              height 24px;



      /*.food-item*/
        /*&:last-child*/
          /*.price*/
            /*bottom 0;*/
    .detail-enter-active, .detail-leave-active
        transition: all .3s linear;
    .detail-enter, .detail-leave-to
        transform translate3D(100%, 0, 0)
    .btn-move-enter-active, .btn-move-leave-active
      transition all 0.5s linear
    .btn-move-enter, .btn-move-leave-to
      opacity 0;
      transform translate3D(24px, 0, 0) rotateY(180deg)


  @import "./goods.styl"
</style>
