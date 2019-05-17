<template>
	<li @click="clickChild">
		{{content}}
	</li>
</template>

<script>
export default {
	name: 'todoItem',
	props: ['content', 'index'],
	methods: {
		clickChild() {
			this.$emit('delete', this.index)
		}
	}
}
</script>

<style>
</style>
