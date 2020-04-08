<template>
    <div class="mainContainer" >
      <div class="scroll-container" ref="food" v-show="showFlag">
        <transition name="detailPage" >
          <div class="food-content" v-show="showFlag" >
            <div class="image-header">
              <img :src="selectedFood.image" class="imgs">
              <!-- 返回图标 -->
              <div class="back" @click="hide">
                <div class="icon-arrow_lift foodIcon"></div>
              </div>
            </div>
            <div class="content">
              <h1 class="title">{{selectedFood.name}}</h1>
              <div class="detail">
                <span class="sell-count">月售{{selectedFood.sellCount}}</span>
                <span class="rating">好评率{{selectedFood.rating}}%</span>
              </div>
              <div class="price">
                <span class="old" v-show="!!selectedFood.oldPrice">￥{{selectedFood.oldPrice}}</span>
                <span class="now">￥{{selectedFood.price}}</span>
              </div>

              <div class="cartcontrol-wrapper">
                <cartcontrol :food="selectedFood" @add-event="addEvent"></cartcontrol>
              </div>
              <transition name="buy-fade">
                <div class="buy" v-show="!selectedFood.count || selectedFood.count === 0" @click="_addFood">加入购物车</div>
              </transition>
            </div>
            <split v-show="selectedFood.info"></split>
            <div class="info" v-show="selectedFood.info">
              <div class="title">商品介绍</div>
              <p class="text">{{selectedFood.info}}</p>
            </div>
            <split v-show="selectedFood.rating"></split>
            <div class="rating">
              <div class="title">商品评价</div>
              <ratingselect :desc="desc" :ratings="selectedFood.ratings" :selectedType="selectedType"></ratingselect>
            </div>
            <div class="rating-wrapper">
              <ul v-show="selectedFood.ratings && selectedFood.ratings.length">
                <li v-for="rating in selectedFood.ratings" class="rating-item">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img :src="rating.avatar" alt="" class="avatar" width="12" height="12">
                  </div>
                  <div class="time">{{rating.rateTime}}</div>
                  <div class="rating-text">{{rating.text}}</div>
                </li>
              </ul>
              <div class="no-rating" v-show="!selectedFood.ratings || !selectedFood.ratings.length">暂无评价</div>
            </div>
          </div>



        </transition>
      </div>

    </div>

</template>

<script>
  import BScroll from 'better-scroll';
  import cartcontrol from 'components/cartControl';
  import Vue from "vue";
  import split from 'components/split/split';
  import ratingselect from 'components/ratingselect/ratingselect';
  const ADD_EVENT = "add-event"

  export default {
      data() {
          return {
              showFlag: false,
              desc: {
                all: "全部",
                positive: "推荐",
                negative: "吐槽"
              },
              selectedType: 2
          }
      },
      props: {
          selectedFood: {
              type: Object
          }
      },
      watch: {
          selectedFood: function(old, newValue) {
              // if (newValue)
              console.log("%c红色:", 'background:#aaa;color:#bada55');
              console.log(this.selectedFood);
          }
      },
      methods: {
          show() {
              this.showFlag = true;
              this.$nextTick(() => {
                if (!this.scroll) {
                  console.log("创建betterscorll");
                  this.scroll = new BScroll(this.$refs.food, {
                    click: true
                  })
                } else {
                  console.log("刷新betterscorll");
                  this.scroll.refresh()
                }
              });
          },
          hide() {
              this.showFlag = false;
          },
          _addFood(event) {
            event.stopPropagation();
            Vue.set(this.selectedFood, "count", 1);
            this.addEvent(event.target);
          },
          addEvent(event) {
            this.$emit(ADD_EVENT, event);
          },
          ratingSelect(event) {
            console.log(event);
            this.selectedType = event;
          }
      },
      components: {
        cartcontrol,
        split,
        ratingselect
      }
  }
</script>

<style type="text/stylus" lang="stylus">

    .detailPage-enter-active, .detailPage-leave-active
        transform translate3D(0, 0, 0);
        transition: all .3s linear;
    .detailPage-enter, .detailPage-leave-to
        transform translate3D(100%, 0, 0);



    .scroll-container
      position: fixed
      left 0
      top 0
      width 100%;
      /*height 100%;*/
      bottom 48px
      background: #fff;


    .food-content
        position: relative
        left 0
        top 0
        width 100%
        bottom 48px
        z-index 30
        background-color #fff
        .image-header
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%;
            .imgs
                position: absolute;
                left 0;
                top 0;
                width 100%;
                height 100%;
            .back
                position fixed;
                top 10px;
                left 0;
                .foodIcon
                    display: block;
                    padding 18px;
                    color: #fff;
                    font-size: 20px;
                    // 如何扩大点击范围
        .content
          position relative;
          padding 18px;
          .title
            font-size: 14px;
            margin-bottom: 8px;
            font-weight: 700
            line-height 14px;
            color: rgb(7, 17, 27)
          .detail
            margin-bottom 18px;
            font-size 0;
            .sell-count, .rating
              font-size: 10px;
              line-height: 10px;
              color: rgb(147, 153, 159);
            .sell-count
              margin-right: 12px;
          .price
            position relative
            font-weight 700
            line-height 24px;
            /*position absolute*/
            /*bottom 18px;*/
            .now
              font-size 14px;
              color rgb(240, 20, 20);
              margin-right 8px;
            .old
              font-size 12px;
              text-decoration line-through
              color rgb(147, 153, 159)




          .cartcontrol-wrapper
            position: absolute;
            right: 12px;
            bottom: 12px;
          .buy-fade-enter, .buy-fade-leave-to
            opacity 0.2;
          .buy-fade-enter-active, .buy-fade-leave-active
            transition opacity .2s linear;
          .buy
            position: absolute;
            right 18px;
            bottom: 18px;
            z-index 10;
            box-sizing border-box;
            padding 0 12px;

            height: 24px;
            border-radius: 12px;
            color: #fff;
            background: rgb(0, 160, 220);
            font-size 10px;
            line-height: 24px;
        .info
          padding 18px;
          .title
            font-size: 14px;
            margin-bottom: 6px;
            font-weight: 700
            line-height 14px;
            color: rgba(7, 17, 27, 0.8)
          .text
            padding 8px;
            font-size: 12px;
            font-weight: 200;
            color(77, 85, 93);
            line-height: 24px;
        .rating
          padding: 18px 0;
          .title
            font-size: 14px;
            margin-left: 18px;
            font-weight: 700
            line-height 14px;
            color: rgba(7, 17, 27, 0.8)
</style>
