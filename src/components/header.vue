<template>
    <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img  alt="商家图标" width="64" height="64" :src="seller.avatar">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </div>
          <div class="support" v-if="seller.supports">
            <span class="icon" :class="classMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div class="support-count" v-if="seller.supports" @click="showDetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="background">
        <img :src="seller.avatar" alt="" width="100%" height="100%">
      </div>
      <transition name="fade">
        <div class="detail" v-if="detailShow" >
          <div class="detail-wrapper clearFix">
            <div class="detail-main">
              <h1 class="detail-name">{{seller.name}}</h1>
              <div class="star-wrapper">
                <star :size="48" :score="seller.score"></star>
              </div>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul class="supports" v-if="seller.supports">
                <li v-for="(item, index) in seller.supports" class="item-support" :key="index">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text">{{item.description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家信息</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                <div class="content">
                  <p>{{seller.bulletin}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="detail-close">
            <i class="icon-close" @click="hiddenDetail"></i>
          </div>
        </div>
      </transition>

    </div>
</template>

<script>
  import star from 'components/star';
  export default {
    created () {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail: function() {
        this.detailShow = true;
      },
      hiddenDetail () {
        this.detailShow = false;
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "../common/styl/mlxin.styl"
  @import "../common/styl/style.css"

  .clearFix   //清除浮动
    display: inline-block
    &.after
      display: block
      content '.'
      height: 0;
      line-height: 0;
      clear: both
      visibility hidden

  .header
    position: relative
    color: #FFF
    background: rgba(7,17,27, 0.5)
    .content-wrapper
      position relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        vertical-align top
        img
          border-radius: 2px
      .content
        display: inline-block
        vertical-align top
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            width: 30px
            height: 18px
            bg-image("../../resource/img/brand")
            background-size: 30px 18px
            background-repeat: no-repeat
            vertical-align top
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight: bold

        .description
          line-height 12px
          font-size 12px
          margin-bottom 10px;
        .support
          .icon
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            vertical-align top
            &.decrease
              bg-image("../../resource/img/decrease_1")
            &.discount
              bg-image("../../resource/img/discount_1")
            &.guarantee
              bg-image("../../resource/img/guarantee_1")
            &.invoice
              bg-image("../../resource/img/invoice_1")
            &.special
              bg-image("../../resource/img/special_1")
          .text
            line-height 12px
            font-size 10px
            font-weight 200
      .support-count
        position: absolute
        bottom: 18px
        right: 12px;
        height: 24px;
        padding: 0px 8px
        line-height 24px
        text-align center
        border-radius 8px
        background rgba(0,0,0,0.2)
        .count
          vertical-align top
          font-size 12px
        .icon-keyboard_arrow_right
          margin-left 2px
          line-height 24px
          font-size 12px

    .bulletin-wrapper
      position: relative
      line-height 28px
      height: 28px
      padding: 0 12px;
      white-space nowrap
      overflow hidden
      text-overflow: ellipsis
      background rgba(7,17,27,0.2)
      .bulletin-title
        display: inline-block
        width: 22px;
        height: 12px
        margin-top 8px
        bg-image("../../resource/img/bulletin")
        background-size: 22px 12px;
        background-repeat: no-repeat
        vertical-align top
      .bulletin-text
        vertical-align top
        margin: 0 4px
        font-size 10px
      .icon-keyboard_arrow_right
        position absolute
        right: 8px
        top: 8px
    .background
      position: absolute
      width 100%
      height: 100%
      left: 0;
      top: 0;
      z-index: -1
      filter: blur(10px);


    .fade-leave-active, .fade-enter-active
      transition all 0.5s ease
    .fade-leave-to, .fade-enter
      opacity 0
      background: rgba(7, 17, 27, 0);



    .detail
      position: fixed
      width 100%;
      height: 100%;
      top: 0;
      //filter: blur(10px);
      z-index: 100;
      overflow auto  //滑动
      background: rgba(7, 17, 27, 0.8);
      //<!--margin-left -8px;-->
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .detail-name
            text-align center
            line-height 16px
            font-size: 16px
            font-weight: 700px
          .star-wrapper
            text-align center;
            margin-top 18px;
            padding: 0 2px;
          .title
            display flex;
            width: 80%
            justify-content center;
            margin: 28px auto 24px;
            .line
              flex-grow 1
              border-bottom 1px solid rgba(255, 255, 255, 0.2);
              position relative
              top -7px;
            .text
              font-size: 14px;
              font-weight bolder
              padding: 0 12px 0 12px;
          .supports
            width 80%
            margin 24px auto 28px auto
            .item-support
              margin-bottom 12px
              padding 0 12px;
              font-size 0
              &:last-child
                margin-bottom 0
              .icon
                display inline-block;
                vertical-align top;
                width 16px;
                height 16px;
                margin-right 6px;
                background-size 16px 16px;
                background-repeat no-repeat
                &.decrease
                  bg-image("../../resource/img/decrease_2")
                &.discount
                  bg-image("../../resource/img/discount_2")
                &.guarantee
                  bg-image("../../resource/img/guarantee_2")
                &.invoice
                  bg-image("../../resource/img/invoice_2")
                &.special
                  bg-image("../../resource/img/special_2")
              .text
                font-size 12px;
                line-height 16px;
                color rgb(255, 255, 255);
          .bulletin
            width 80%
            margin 24px auto  0 auto
            .content
              padding 0 12px;
              line-height 24px;
              font-weight 200;
              font-size 12px;
              color: rgb(255, 255, 255)

      .detail-close
        position: relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear: both
        font-size 32px

</style>
