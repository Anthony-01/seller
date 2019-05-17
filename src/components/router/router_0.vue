<template>
	  <div>路由一</div>
</template>

<script>
  export default {
    computed: {
      username () {
        return this.$route.params.username
      }
    },
    methods: {
      goBack () {
        
      }
    }
  }
</script>

<style>
</style>
