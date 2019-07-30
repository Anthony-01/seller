<template>
    <div class="star" :class="starType">
      <span v-for="item in typeClasses" :class="item" class="star-item"></span>
    </div>
</template>

<script>
  const LENGTH = 5;
  const STAR_ON = "on";
  const STAR_HALF = "half";
  const STAR_OFF = "off";
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    data() {
      return {

      }
    },
    computed: {
      starType() {
        return "star-" + this.size;
      },
      typeClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let integer = Math.floor(score);
        let hasDecimal = score % 1 == 0 ? false : true;
        for (let n = 0; n < integer; n++) {
          result.push(STAR_ON)
        }
        if (hasDecimal) {
          result.push(STAR_HALF);
        }
        while(result.length < LENGTH) {
          result.push(STAR_OFF);
        }
        return result;
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "../common/styl/mlxin.styl"
  .star
    font-size: 0
    &:last-child
      margin-right: 0
    &.star-24
      .star-item
        width 10px
        height: 10px
        margin-right 4px;
        background-size 10px 10px;
      .on
        bg-image("../../resource/img/star24_on")
      .half
        bg-image("../../resource/img/star24_half")
      .off
        bg-image("../../resource/img/star24_off")
    &.star-36
      .star-item
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
      .on
        bg-image("../../resource/img/star36_on")
      .half
        bg-image("../../resource/img/star36_half")
      .off
        bg-image("../../resource/img/star36_off")
    &.star-48
      .star-item
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
      .on
        bg-image("../../resource/img/star48_on")
      .half
        bg-image("../../resource/img/star48_half")
      .off
        bg-image("../../resource/img/star48_off")
    .star-item
      display inline-block
      background-repeat no-repeat
</style>
