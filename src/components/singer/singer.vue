<template>
	<div class="singer">
		<listView class='listView' :data='resultSingerList' @select='getDetail'></listView>
		<router-view></router-view>
		
	</div>
	
</template>
<script>
	import {getSingerList} from '../../api/singer.js'

	import listView from '../../base/listView/listView'

	import {mapMutations} from 'vuex'

	const HOT_LEN=10

	export default {
		data(){
			return {
				singerList:[],
				resultSingerList:[]
			}
		},
		components:{
			listView
		},
		created(){
			this._getSingerList()
		},
		methods:{
			getDetail(singer){
				this.$router.push({path:`/singer/${singer.Fsinger_mid}`})
				this.setSinger(singer)
			},
			_getSingerList(){
				getSingerList().then((res)=>{
					if(res.code===0){
						this.singerList=res.data.list
						this.resultSingerList=this._normalizeSinger(this.singerList)

					}
					
				})
			},
			_normalizeSinger(list){
				let map={
					hot:{
						title:'热门',
						items:[]
					}
				}
				list.forEach((item,index)=>{
					if(index<HOT_LEN){
						map.hot.items.push(item)
					}
					const key=item.Findex
					if(!map[key]){
						map[key]={
							title:key,
							items:[]
						}
					}
					map[key].items.push(item)
				})
				let hot=[]
				let ret=[]
				for(let key in map){
					let val=map[key]
					if(map[key].title.match(/[a-zA-Z]/)){
						ret.push(map[key])
					}else if(map[key].title=='热门'){
						hot.push(map[key])
					}
				}
				ret.sort((a,b)=>{
					return a.title.charCodeAt(0)-b.title.charCodeAt(0)
				})
				return hot.concat(ret)
			},
			...mapMutations({
				setSinger:'SET_SINGER',
			})
		}
	}
</script>
<style lang="stylus" scoped>
	.listView
		position fixed
		top 88px
		bottom 0
		width 100%
		z-index -1
		height 100%
</style>