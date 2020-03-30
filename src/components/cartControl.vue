<template>
    <div class="cart-control">
      <transition name="btn-move">
        <div class="btn-decrease icon-remove_circle_outline" v-show="food.count > 0" @click="decreaseCart($event)"></div>
      </transition>
      <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
      <div class="btn-add icon-add_circle" @click="addCart($event)"></div>

    </div>

</template>

<script>
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created() {
//      console.log(this.food)
    },
    data() {
      return {

      }
    },
    methods: {
      addCart(event) {
        event.stopPropagation();
        if (!this.food.count) {
          Vue.set(this.food, "count", 1);
        } else {
          this.food.count++
        }
        console.log(event);
        console.log(this.food.count);
        //触发动画
        this.$emit('add-event', event.target);
      },
      decreaseCart(event) {
        event.stopPropagation();
        if (this.food.count > 0) {
          this.food.count--;
          console.log(this.food.count);
        }
      }
    }
  }
</script>

<style type="text/stylus" lang="stylus">
  .cart-control
    font-size: 0
    .btn-move-enter-active, .btn-move-leave-active
      transition all 0.5s linear
    .btn-move-enter, .btn-move-leave-to
      opacity 0;
      transform translate3D(24px, 0, 0) rotateY(180deg)
    .btn-decrease, .btn-add
      display: inline-block
      font-size: 24px;
      line-height 24px;
      padding 6px;
      color: rgb(0, 160, 220);
    .btn-decrease
      color: rgb(0, 160, 220);
    .cart-count
      display: inline-block
      vertical-align top;
      font-size: 10px;
      padding-top 6px;
      line-height 24px;
      /*padding 0 24px;*/
      color: rgb(147, 153, 159)
    .btn-add
      color: rgb(0, 160, 220);


</style>
