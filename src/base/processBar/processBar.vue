<template>
	<div class="processBar" ref='processBar' @click='moveToPos'>
		<div class="inner">
			<div class="process" ref='process' ></div>
			<div class="btn" ref='btn' @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>
				<div class="btn-inner"></div>
			</div>
		</div>
	</div>
</template>
<script>
	const btnWidth=12
	export default {
		props:{
			percent:{
				type:Number,
				default:0
			}
		},
		created(){
			this.touch={}
		},
		methods:{
			touchStart(e){
				this.touch.init=true
				this.touch.starX=e.touches[0].pageX
				this.touch.curProcess=this.$refs.process.clientWidth
			},
			touchMove(e){
				if(!this.touch.init){
					return
				}
				let delteX=e.touches[0].pageX-this.touch.starX
				let barWidth=this.$refs.processBar.clientWidth
				let processWidth=this.touch.curProcess+delteX
				let offsetLeft=Math.min(barWidth,Math.max(0,processWidth))
				this._moveToOffsetLeft(offsetLeft)
			},
			touchEnd(e){
				
				this.touch.init=false
				//计算拖动之后进度条百分比
				this._triggerPercent()
				
			},
			moveToPos(e){
				this._moveToOffsetLeft(e.offsetX)
				this._triggerPercent()
			},
			_triggerPercent(){
				let width = this.$refs.processBar.clientWidth-btnWidth
				let changePercent=this.$refs.process.clientWidth / width
				this.$emit('barChange',changePercent)
			},
			_moveToOffsetLeft(offsetLeft){
				this.$refs.process.style.width=offsetLeft+'px'
				this.$refs.btn.style.left=offsetLeft+'px'
			},
		},
		mounted(){
			

			
		},
		watch:{
			percent(newPercent){
				this.$nextTick(()=>{
					if(newPercent>=0 && !this.touch.init){
					console.log(newPercent)
					let width=this.$refs.processBar.clientWidth-btnWidth
					let offsetLeft=width*newPercent
					this._moveToOffsetLeft(offsetLeft)
					
					}
				})
				
			}
		}
	}
</script>
<style lang="stylus" scoped>
.processBar
	width 100%
	height 30px	
	.inner
		position relative
		height 2px
		width 100%
		background #222
		top 14px
		.process
			position absolute
			left 0
			top 0
			background #ffcd32
			height 100%
		.btn
			position absolute 
			top -5px
			background #fff
			width 12px
			height 12px
			border-radius 50%
			.btn-inner
				width 4px
				height 4px
				margin 4px
				background #ffcd32
				border-radius 50%


			
</style>