<template>
    <!--  评论组件  -->
    <div class="ratingselect">

      <div class="select">
        <span @click="selectSpan(2, $event)" class="block positive" :class="{active: localSelectedType===2}">{{desc.all}}<span class="text">{{ratings.length}}</span></span>
        <span @click="selectSpan(0, $event)" class="block positive" :class="{active: localSelectedType===0}">{{desc.positive}}<span class="text">{{positive.length}}</span></span>
        <span @click="selectSpan(1, $event)" class="block negative" :class="{active: localSelectedType===1}">{{desc.negative}}<span class="text">{{negative.length}}</span></span>
      </div>
      <div @click="toggleContent" class="only" :class="{on: localToggle}">
        <span  class="icon-check_circle" ></span>
        <span class="text">只显示有内容的评价</span>
      </div>
    </div>
</template>

<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;


  export default {
    //如何将外部传入的参数作为局部变量
    data() {
      return {
        localSelectedType: this.selectedType,
        localToggle: this.onlyContent
      }
    },
    props: {
      desc: {
        type: Object,
        default() {
          return {
            all: "全部",
            positive: "满意",
            negative: "不满意",
          }
        }
      },
      selectedType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: true
      },
      ratings: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      selectSpan(type, event) {
        event.stopPropagation();
        this.localSelectedType = type
      },
      toggleContent(event) {
        event.stopPropagation();
        this.localToggle = !this.localToggle;
      }
    },
    computed: {
      positive() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        })
      },
      negative() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        })
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus">
  @import "../../common/styl/mlxin.styl"

  .ratingselect
    padding-top: 18px;
    /*font-size: 0;*/
    .select

      margin: 0 18px;
      font-size: 0;
      padding-bottom 8px;
      border-1px(rgba(7, 17, 27, 0.1))
      .block
        display: inline-block
        padding 8px 12px;
        font-size 12px;
        margin-right 8px;
        border-radius 1px;
        color: rgb(77, 85, 93);
        &.active
          color: #fff;
        &.positive
          background: rgba(0, 160, 220, 0.2);
          &.active
            background  rgb(0, 160, 220);
        &.negative
          background rgba(77, 85, 93, 0.2);
          &.active
            background rgb(77, 85, 93);
        .text
          margin-left 2px;
          font-size: 8px;
          line-height 16px;

    .only
      padding 12px 18px;
      font-size: 0;
      color: rgb(147, 153, 159);
      line-height 24px;
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      &.on
        .icon-check_circle
          color: #00C850;
      .icon-check_circle
        vertical-align top;
        font-size: 24px;
        margin-right 4px;

      .text
        vertical-align top;
        font-size: 12px;
</style>
