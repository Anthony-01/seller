<template>
    <div>路由三</div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    created () {

    },
    methods: {
      async getGoods() {
        new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, 1000)
        })
      }
    }
  }
</script>

<style>
</style>
