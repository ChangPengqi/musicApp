<template>
	<div class="songList">
		<ul>
			<li v-for='(song,index) in songs' class='item' @click='selectItem(song,index)'>
				<div class="title">{{song.musicData.songname}}</div>
				<div class="dec">{{title}} - {{song.musicData.albumname}} <span v-if='song.musicData.albumdesc'> - {{song.musicData.albumdesc}}</span></div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props:{
			songs:{
				type:Array,
				default:[]
			},
			title:{
				type:String,
				default:''
			}
		},
		methods:{
			selectItem(item,index){
				this.$emit('select',item,index)
			}
		}
	}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
.songList
	.item
		padding 0 20px
		margin-bottom 10px 
		.title
			height 30px
			line-height 30px
			color #fff
			font-size 14px
		.dec
			line-height 20px
			color $color-text-l
			font-size 12px

</style>