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
  .star
    font-size: 0
    &.star-24
    &.star-36
    &.star-48
    .star-item
      display inline-block
      background-repeat no-repeat
</style>
