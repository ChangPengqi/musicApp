<template>
	<div class="recommend">
		<div>
			<div v-if="focus.length" class="slider-wrapper" ref="sliderWrapper">
	          <slider>
	            <div class="slide-item" v-for="(item,index) in focus">
	              <a v-if='index===0' :href="focus[0].jump_info.url">
	                <img class="needsclick" :src="focus[0].pic_info.url">
	              </a>
	              <a v-if='index>0' :href="url+item.jump_info.url">
	                <img class="needsclick" :src="item.pic_info.url">
	              </a>
	            </div>
	          </slider>
	        </div>
	        <div class="recommend-content">
	        	<div class="title">热门歌曲推荐</div>
	        	<scroll class="list" ref='list' :data='disList'>
		        	<ul>
		        		<li class="item" v-for='item in disList'>
		        			<div class="icon"><img width="60" height="60" v-lazy="item.imgurl" :alt="item.dissname"></div>
		        			<div class="text">
		        				<div class='name'>{{item.creator.name}}</div>
		        				<div class="dec">{{item.dissname}}</div>
		        			</div>
		        		</li>
		        	</ul>
		        	
	        	</scroll>
	        	
	        </div>
	        
		</div>
		<div class="loading-content" v-show='disList.length<=0'>
			<loading></loading>
		</div>
	</div>
</template>
<script>
import slider from '../../base/slider/slider'
import scroll from '../../base/scroll/scroll'
import loading from '../../base/loading/loading'
import {getRecommend,getDisList} from '../../api/recommend.js'
import BScroll from 'better-scroll'
const URL='https://y.qq.com/w/album.html?albummid='
	export default {
		data(){
			return {
				url:URL,
				focus:{},
				disList:[]
			}
		},
		components:{
			slider,
			scroll,
			loading
		},
		created(){
			this._getRecommend()
			this._getDisList()
		},
		methods:{
			_getRecommend(){
				getRecommend().then((res)=>{
					if(res.code===0){
						this.focus=res.focus.data.content;	
					}
				})
			},
			_getDisList(){
				getDisList().then((res) => {
					if(res.code===0){
						this.disList=res.data.list
						/*this._initScroll()*/
					}
				})

			},
			_initScroll(){
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.list,{
							click:true
						})
					}else{
						this.scroll.refresh()
					}
				})
			}
		},
		mounted(){
		}
	}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/variable"
.recommend
	position absolute
	width 100%
	top 79px
	height 100%
	.slider-wrapper
		position relative
		background-color $color-background
		padding-top 9px
	.recommend-content
		padding 0 10px
		.title
			text-align center
			height 40px
			line-height 40px
			background-color $color-background
		.list
			position fixed
			padding 0 10px
			left 0
			top 280px
			bottom 0
			overflow hidden
		.item
			clear both
			margin-bottom 20px
			height 60px
			display flex
			.icon
				flex 0 0 60px
				width 60px
				height 60px
				float left
				margin-right 10px
			.text
				flex 1
				float left
				.name
					height 30px 
					line-height 30px
					font-size 15px
					font-weight 700
					color #fff
				.dec
					font-size 13px
					height 30px
					line-height 30px
					color $color-text-l
					padding-right 10px
	.loading-content
		position absolute
		top 50%
		transform translateY(-50%)
		left 0
		right 0




</style>