<template>
	<scroll 
	:data='data'
	:listenScroll='listenScroll' 
	ref='listView'
	:probeType='probeType'
	@scroll='scroll'

	>
		<ul class="list-content">
			<li class="list" v-for='list in data' ref='list'>
				<h1 class="title">{{list.title}}</h1>
				<ul class="content-wrapper">
					<li class='item' v-for='item in list.items' @click='selectItem(item)'>
						<span class="icon"><img v-lazy="startUrl+item.Fsinger_mid+endUrl" alt=""></span>
						<span class="name">{{item.Fsinger_name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class='right_list' @touchstart='onTouchStart'  @touchmove.stop.prevent='onTouchMove'>
			<ul>
				<li class="item" :class="{'active':currentIndex===index}" v-for='(title,index) in rightData' :data-index='index' >{{title}}</li>
			</ul>
		</div>
		<div class="fix-title" v-show='Title'>
			{{Title}}
		</div>
		<div class="loading-wapper" v-show='data.length<=0'>
			<loading></loading>
		</div>
	</scroll>	
</template>
<script>
	import scroll from '../../base/scroll/scroll'
	import loading from '../../base/loading/loading'

	const ANCHOR_H=20  //定义右边列表锚点的高度

	export default {
		data(){
			return {
				startUrl:'https://y.gtimg.cn/music/photo_new/T001R150x150M000',
				endUrl:'.jpg?max_age=2592000',
				scrollY:-1,
				currentIndex:0
			}
		},
		props:{
			data:{
				type:Array,
				default:[]
			}
		},
		watch:{
			data(){
				setTimeout(()=>{
					this._calculateHeight()
				},20)
			},
			scrollY(newY){
				newY=Math.round(Math.abs(newY))
				
				const listHeight=this.listHeight
				for(let i = 0; i<listHeight.length; i++){
					let height1=listHeight[i]
					let height2=listHeight[i+1]
					if(!height2 || (newY>=height1 && newY <height2)){
						this.currentIndex=i
						return 
					}
				}
				this.currentIndex=0
			}
		},
		created(){
			this.touch = {}
			this.listenScroll = true
			this.listHeight = []
			this.probeType=3
		},
		computed:{
			rightData(){
				return this.data.map((item)=>{
					return item.title.substring(0,1)
				})
			},
			Title(){
				if(this.scrollY>0){
					return ''
				}else{
					return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
				}
				
			}

		},
		components:{
			scroll,
			loading
		},
		methods:{
			onTouchStart(e){
				let scrollToIndex=e.target.getAttribute('data-index')
				console.log(scrollToIndex)
				this.touch.y1=e.touches[0].pageY
				this.touch.curIndex=scrollToIndex
				this._scrollToElement(scrollToIndex)
			},
			onTouchMove(e){
				this.touch.y2=e.touches[0].pageY
				let delta=Math.floor((this.touch.y2-this.touch.y1) / ANCHOR_H) //计算偏差几个锚点
				let scrollToIndex=parseInt(this.touch.curIndex)+delta
				console.log(scrollToIndex)
				this._scrollToElement(scrollToIndex)
				

			},
			scroll(pos){
				this.scrollY=pos.y
				
			},
			selectItem(item){
				this.$emit('select',item)
			},
			_scrollToElement(index){
				if(!index && index!==0){
					return
				}
				if(index<0){
					index=0
				}else if(index>this.listHeight.length-2){
					index=this.listHeight.length-2
				}
				this.scrollY=-this.listHeight[index]
				this.$refs.listView.scrollToElement(this.$refs.list[index],0/*500,0,0, { 
				    easing: 'easeInOutQuad'   
				}*/)
			},
			_calculateHeight(){
				this.listHeight = []
				let height = 0
				let lists = this.$refs.list
				this.listHeight.push(height)
				for(let i = 0; i < lists.length; i++){
					let list = lists[i]
					height += list.clientHeight
					this.listHeight.push(height)
				}
			}
		}

	}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
	.list-content
		.list
			.title
				height 30px
				line-height 30px
				background $color-highlight-background
				color $color-text-l
				font-size: $font-size-small
				padding 0 20px
				margin-bottom 10px
			.content-wrapper
				padding-left 30px
				.item
					padding 10px 0
					font-size 0
					.icon
						display inline-block
						width 60px
						height 60px
						vertical-align middle
						margin-right 20px
						img
							width 100%
							height 100%
							border-radius 50%
					.name 
						font-size $font-size-medium
						color $color-text-l
	.right_list
		position fixed
		right 0
		box-sizing border-box
		top 50%
		margin-top 44px
		transform translateY(-50%)
		font-size: $font-size-small
		text-align center
		background #000
		.item
			padding 4px
			color $color-text-l
			&.active
				color $color-theme
				font-size $font-size-medium
	.fix-title
		top 88px
		height 30px
		line-height 30px
		background $color-highlight-background
		color $color-text-l
		font-size: $font-size-small
		padding 0 20px
		margin-bottom 10px
		position fixed
		width 100%
	.loading-wapper
		position fixed
		left 0
		right 0
		top 50%
		transform translateY(-50%)
		z-index 1000

</style>