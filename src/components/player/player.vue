<template>
	<!-- @enter='enter'
	@after-enter='afterEnter'
	@leave='leave'
	@after-leave='afterLeave' -->
	<div class="player" v-show='playList.length>0'>
	<transition name='normal'
	
	enter-active-class='animated bounceIn'
	leave-active-class='animated bounceOut'>	
		<div class="normal-player" v-show='fullScreen'>
			<div class="background">
	          <img width="100%" height="100%" :src="imgUrl" alt="">
	        </div>
	       
			<div class="player-top">
				<div class="text">
					<span class="icon-back" @click='back'></span>
					<span class="title">{{musicData.songname}}</span>
				</div>
				<div class="name" ><span v-for='singer in musicData.singer'> {{singer.name}} </span></div>
			</div>
			
			<div class="player-middle">
				<div class="cd" :class='rotate' ref='cd'>
					<img :src="imgUrl" alt="" ref='bigimg'>
				</div>
			</div>
		
			<div class="control-process">
				<div class="currentTime">{{currentTime | format}}</div>
				<div class="processBar">
					<processBar :percent='percent' @barChange='barChange'></processBar>
				</div>
				<div class="totalTime">{{musicData.interval | format}}</div>
			</div>
			<div class="player-bot">
				<span class="operate" :class="iconMode" @click='changeMode'></span>
				<span class="operate icon-prev" @click='prev' :class='disabled'></span>
				<span class="operate" :class="playIcon" ref='playing' @click='togglePlay' ></span>
				<span class="operate icon-next" @click='next' :class='disabled'></span>
				<span class="operate icon-favorite"></span>

			</div>
		</div>
	</transition>
	<transition
	enter-active-class='animated bounceInUp'
	leave-active-class='animated bounceOutDown'>
		<div class="mini-player" v-show='!fullScreen' @click='open'>
			<div class="player-content">
				<span class="imgbox"><img :class='rotate' :src="imgUrl" alt=""></span>
				<span class="text-content">
					<span class="mini-title">{{musicData.songname}}</span>
					<span class="mini-name" ><span v-for='singer in musicData.singer'> {{singer.name}} </span></span>
				</span>
				<span class="icon-playlist"></span>
				<processCircle :radius='radius' :percent='percent' class='radius1'>
				<span :class="miniPlayIcon" @click.stop='togglePlay'></span>
				</processCircle>
				
				
			</div>
		</div>
	</transition>
	<audio ref='audio' :src='musicUrl' @canplay='ready' @error='error' @timeupdate='updateTime'></audio>
	</div>	
</template>
<script>
import {mapGetters,mapMutations} from 'vuex'
import animations from 'create-keyframe-animation'
import processBar from '../../base/processBar/processBar'
import processCircle from '../../base/processCircle/processCircle'
	export default {
		data(){
			return {
				songReady:false,
				currentTime:0,
				radius:29
			
			}
		},
		components:{
			processBar,
			processCircle
		},
		filters:{
			format(val){
				let hour=Math.floor(val / 60)
				let min=Math.floor(val % 60)
				if(min.toString().length<2){
					min='0'+min
				}
				return hour+':'+min
			}
		},
		computed:{
			imgUrl(){
				if(!this.musicData){
					return ''
				}else{
					return 'https://y.gtimg.cn/music/photo_new/T002R500x500M000'+this.musicData.albummid+'.jpg'
				}
				
				
			},
			musicUrl(){
				if(this.musicData.songmid){
					return 'http://ws.stream.qqmusic.qq.com/C100'+this.musicData.songmid+'.m4a?fromtag=38'
				}
				
			},
			playIcon(){
				return this.playing ? 'icon-pause' : 'icon-play'
			},
			miniPlayIcon(){
				return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
			},
			iconMode(){
				if(this.mode===0){
					return 'icon-sequence'
				}else if(this.mode==1){
					return 'icon-loop'
				}else if(this.mode===2){
					return 'icon-random'
				}
			},
			musicData(){
				return this.currentSong.musicData ? this.currentSong.musicData: ''
			},
			rotate(){
				return this.playing ? 'rotate' : 'rotate pause'
			},
			disabled(){
				this.songReady ? '' : 'disabled'
			},
			percent(){
				return this.currentTime / this.musicData.interval
			},
			...mapGetters([
				'fullScreen',
				'playList',
				'currentSong',
				'playing',
				'currentIndex',
				'mode'])
		},
		methods:{
			back(){
				this.setFullScreen(false)
			},
			open(){
				this.setFullScreen(true)
				console.log()
			},
			/*enter(el,done){
				const pos=this._getPosition()
				let animation={
					0:{
						transform : 'translate3d('+pos.x+'px,'+pos.y+'px,0) scale('+pos.scale+')'
					},
					60:{
						transform : 'translate3d(0,0,0) scale(1.1)'
					},
					100:{
						transform : 'translate3d(0,0,0) scale(1)'
					}
				}
				animations.registerAnimation({
					name:'move',
					animation,
					presets:{
						duration:400,
						easing:'ease'
					}
				})
				animations.runAnimation(this.$refs.cd,'move',done)
			},
			afterEnter(){
				animations.unregisterAnimation('move')
				this.$refs.cd.style.animation=''
			},
			leave(el,done){

			},
			afterLeave(){

			},*/
			togglePlay(){
				if(!this.songReady){
					return 
				}
				this.setPlayingState(!this.playing)
				
			},
			prev(){
				if(!this.songReady){
					return 
				}
				let index=this.currentIndex-1
				if(index===-1){
					index=this.playList.length-1
				}
				this.setCurrentIndex(index)
				if(!this.playing){
					this.togglePlay()
				}

				this.songReady=false
			},
			next(){
				if(!this.songReady){
					return 
				}
				let index= this.currentIndex+1
				if(index===this.playList.length){
					index=0
				}
				this.setCurrentIndex(index)
				if(!this.playing){
					this.togglePlay()
				}
				this.songReady=false
			},
			ready(){
				this.songReady=true
			},
			error(){
				this.songReady=true
			},
			updateTime(e){
				this.currentTime=e.target.currentTime
			},
			barChange(percent){
				const currentTime=this.musicData.interval*percent
				this.$refs.audio.currentTime=currentTime*percent
				if(!this.playing){
					this.togglePlay()
				}
				
			},
			changeMode(){
				let mode= (this.mode+1)%3
				this.setPlayMode(mode)
			},
			_getPosition(){
				let pos={}
				let sImgWidth=40;
				let bImgWidth= window.innerWidth * 0.8;
				let sImgLeft = 40;
				let sImgBot = 30;
				let bImgLeft= window.innerWidth/2;
				let bImgTop =bImgWidth/2+80;
				let scale=sImgWidth/bImgWidth;
				let transX=-(window.innerWidth/2-sImgLeft);
				let transY=window.innerHeight-bImgTop-sImgBot;
				pos.x=transX;
				pos.y=transY;
				pos.scale=scale;
				return pos;

				/*let bImgTop = 80 +*/ 
			},

			...mapMutations({
				setFullScreen:'SET_FULL_SCREEN',
				setPlayingState:'SET_PLAYING_STATE',
				setCurrentIndex:'SET_CURRENT_INDEX',
				setPlayMode:'SET_PLAY_MODE'

			})
		},
		mounted(){
			this.radius2=this.$refs.cd.clientWidth
		},
		watch:{
			musicUrl(newUrl){
				this.$nextTick(()=>{
					this.$refs.audio.play()
				})
			},
			playing(newPlaying){
				let audio=this.$refs.audio
				this.$nextTick(()=>{	
					newPlaying ? audio.play() : audio.pause()
				})
			}
		}
	}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
	.player
		.normal-player
			position fixed
			width 100%
			left 0
			right 0
			bottom 0
			top 0
			background #222
			z-index 100
			&.animated
				.player-top
					transform translate3d(0,-100px,0)
				.player-bot
					transform translate3d(0,200px,0)
				.control-process
					transform translate3d(0,200px,0)	
			.background
				position absolute 
				z-index -1
				opacity 0.6
				filter blur(20px)
				width 100%
				height 100%
		    	left 0
		    	top 0
		    	transition all ease 0.3s
		    .player-top
				position relative
				transition all 0.3s 
				height 80px
				.text
					height 40px
					line-height 40px
					text-align center
					float left
					width 100%
					.icon-back
						position absolute
						font-size 18px
						padding 11px 10px
						left 0
						top 0
						display block
						transform: rotate(270deg)
					.title
						color #fff
				.name
					text-align center
					font-size 14px
					color rgba(255, 255, 255, 0.8)
					height 30px
					line-height 30px
			.player-middle
				width 100%
				height 75%
				margin 0 auto
				.cd
					position relative
					left 0
					top 0
					width 80%
					height 0
					padding-top 80%
					margin 0 auto 
					border-radius 100%
					overflow hidden
					box-shadow 0 0 10px #fff
					&.rotate
						animation rotate 10s linear infinite
					&.pause
						animation-play-state paused
					img
						width 94%
						position absolute 
						left 0
						top 0
						height 94%
						border-radius 100%
						padding 3%
			.control-process
				width 100%
				height 30px
				line-height 30px
				display flex
				transition all ease 0.3s
				.currentTime,.totalTime
					flex 0 0 80px
					width 80px
					text-align center
					font-size 12px

				.processBar
					flex 1
				


			.player-bot
				display flex
				height 40px
				transition all 0.3s 
				.operate
					line-height 40px
					font-size 24px
					display inline-block
					flex 1
					text-align center
					&.disabled
						opacity 0.5

			
		.mini-player
			height 60px
			position fixed
			bottom 0
			width 100%
			background $color-highlight-background
			z-index 100
			.player-content
				.imgbox
					display block
					width 40px
					height 40px
					padding 10px
					padding-left 20px
					float left
					img
						width 100%
						height 100%
						border-radius 50%
						&.rotate
							animation rotate 10s linear infinite
						&.pause
							animation-play-state paused
				.text-content
					display inline-block
					font-size 14px
					padding 10px
					height 40px
					font-size 0
					.mini-title
						display block
						height 20px
						font-size 16px
						color #fff
						
					.mini-name
						display block
						height 20px
						font-size 12px
						line-height 20px
						color rgba(255, 255, 255, 0.5)
				.icon-playlist
					display inline-block 
					float right
					font-size 25px
					padding-right 20px
					line-height 60px
				.icon-play-mini,.icon-pause-mini
					display inline-block 
					float right
					font-size 25px
					padding-right 20px
					line-height 60px
					position absolute 
					left 2px 
					top 0px

@keyframes rotate
	0
		transform rotate(0)
	100%
		transform rotate(360deg)
.radius1
	position relative
	display inline-block
	float right
	font-size 25px
	padding-right 20px
	line-height 70px


			
		


</style>