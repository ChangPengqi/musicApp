<template>

	<div class="singerDetail">
		<div class="topNav" ref='topNav'>
			<span class="icon icon-back" @click='back'></span>
			<span class="name">{{title}}</span>
		</div>
		<div class="img-wrapper" ref='imgWrapper'>
			<img :src="bgImage" alt="">
		</div>
		<div class="musicPlay" v-show='songs.length>0'>
			<span class="icon-play"></span>
			<span class="text">随机播放全部</span>
		</div>
		<div class="bg-layer" ref='bglayer'></div>
		<scroll :data='songs' :probeType="probeType" :listenScroll='listenScroll' @scroll='scroll' class='songlist' ref='list'>
			<div class="songs-wrapper">
				<songList :songs='songs' :title='title' @select='selectItem'></songList>
			</div>
		</scroll>
		<div class="loading-wapper" v-show='songs.length<=0'>
			<loading></loading>
		</div>
	</div>

</template>
<script>
import songList from '../../components/songList/songList'
import scroll from '../../base/scroll/scroll'
import loading from '../../base/loading/loading'
import {mapActions} from 'vuex'

const NAV_HEIGHT=45
	export default {
		data(){
			return {
				scrollY:0
			}
		},
		props:{
			bgImage:{
				type:String,
				default:''
			},
			songs:{
				type:Array,
				default:[]
			},
			title:{
				type:String,
				default:''
			}
		},
		created(){
			this.probeType=3
			this.listenScroll=true
		},
		components:{
			songList,
			scroll,
			loading
		},
		methods:{
			back(){
				this.$router.back()
			},
			scroll(pos){
				this.scrollY=pos.y
				
			},
			selectItem(item, index){
				this.selectPlay({
					list : this.songs,
					index : index
				})
			},
			...mapActions(['selectPlay'])
		},
		watch:{
			scrollY(newY){
				//
				let transY=Math.max(-this.imgHeihgt+NAV_HEIGHT,newY)
				
				this.$refs.bglayer.style.transform ='translate3d(0,'+transY+'px,0)'
				this.$refs.bglayer.style.webkitTransform ='translate3d(0,'+transY+'px,0)'
				let percent=Math.abs(newY/this.imgHeihgt)
				let scale=1+percent
				let blur=Math.min(10*percent,10)
				if(-newY>=this.imgHeihgt-NAV_HEIGHT-20){
					this.$refs.topNav.style.background='#222'
				}else{
					this.$refs.topNav.style.background='none'
				}
				if(newY>=0){
					this.$refs.imgWrapper.style.transform='scale('+scale+')'
					this.$refs.imgWrapper.style.webkitTransform='scale('+scale+')'
				}else{
					this.$refs.imgWrapper.style.filter='blur('+blur+'px)'
					this.$refs.imgWrapper.style.webkitFilter='blur('+blur+'px)'
				}
			}
		},
		mounted(){
			this.imgHeihgt=this.$refs.imgWrapper.clientHeight
			this.$refs.list.$el.style.top=this.$refs.imgWrapper.clientHeight+'px'

		}
	}
</script>
<style lang="stylus" scoped>
	@import '../../common/stylus/variable.styl'
	.singerDetail
		position fixed
		width 100%
		left 0
		right 0
		bottom 0
		background $color-background
		z-index 100
		top 0
		.topNav
			position fixed 
			top 0
			width 100%
			left 0
			right 0
			height 45px
			line-height 45px
			text-align center
			z-index 200 
			transition all ease 0.5s
			.icon
				position absolute
				display inline-block
				left 10px
				top 15px
			.name 
				color #fff
				font-weight 700
		.img-wrapper
			position relative
			width 100%
			height 0
			padding-top 80%
			transform-origin top
			img
				position absolute
				top 0
				left 0
				width 100%
		.musicPlay
			margin 0 auto
			width 100px
			padding 5px 10px 
			border 1px solid #ffcd32
			border-radius 25px
			position relative 
			left 0
			right 0
			bottom 50px
			.icon-play
				display inline-block
				vertical-align middle
			.text
				display inline-block 
				font-size 12px
		.bg-layer
			position relative
			background #222
			height 100%
			top -30px
			
		.songlist
			position fixed
			left 0
			right 0
			top 0
			bottom 0
			width 100%
			padding 20px 0
		.loading-wapper
			position fixed
			left 0
			right 0
			top 50%
			transform translateY(-50%)
			z-index 1000


			

</style>