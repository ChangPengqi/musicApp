<template>
	<div class="header">
		<span class="icon"></span>
		<span class="text">酷我音乐</span>
	</div>	
</template>
<script>
	export default {
		
	}
</script>
<style lang="stylus" scoped>
 @import "../../common/stylus/variable"
 @import "../../common/stylus/mixin"
.header
	height 44px
	line-height 44px
	text-align center
	font-size 0
	background-color $color-background
	.icon
		display inline-block
		bg-image('logo')
		background-size 30px 32px
		width 30px
		height 32px
		vertical-align top
		margin-right 5px
		margin-top 6px
	.text 
		font-size $font-size-large
		color $color-theme
		font-weight 700

</style>