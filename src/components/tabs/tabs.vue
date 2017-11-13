<template>
	<div class="tabs">
		<router-link class="tabs-item" to='/recommend' tag='div'>
			<span>推荐</span>
		</router-link>
		<router-link class="tabs-item" to='/singer' tag='div'>
			<span>歌手</span>
		</router-link>
		<router-link class="tabs-item" to='/rank' tag='div'>
			<span>排行</span>
		</router-link>
		<router-link class="tabs-item" to='/search' tag='div'>
			<span>搜索</span>
		</router-link>
	</div>
</template>
<script>
	export default {
		
	}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/variable.styl"
	.tabs
		background-color $color-background
		height 35px 
		line-height 35px
		display flex
		padding-bottom 10px
		.tabs-item
			flex 1
			text-align center
			color #fff
			&.router-link-active
				span
					color $color-theme
					padding-bottom 7px
					border-bottom 2px solid $color-theme
</style>