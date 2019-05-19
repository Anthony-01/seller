<template>
    <div class="star" :class="starType">
      <span v-for="item in typeClasses" :class="item" class="star-item"></span>
    </div>
</template>

<script>
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
      starType: function() {
        return "star-" + this.size;
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  @import "../common/mlxin.styl"
  .star
    font-size: 0
    &.star-24
    &.star-36
    &.star-48
      &.star-item
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &:last-child
          margin-right: 0
        &.on
          bg-image("../../resource/img/star48_on")
        &.half
          bg-image("../../resource/img/star48_half")
        &.off
          bg-image("../../resource/img/star48_off")
    .star-item
      display inline-block
      background-repeat no-repeat
</style>
