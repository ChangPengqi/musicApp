<template>
	<transition
	mode='out-in' 
	enter-active-class='animated lightSpeedIn'
	leave-active-class='animated lightSpeedOut'>
		<musicList :title='singer.Fsinger_name' :bgImage='imgUrl' :songs='songList'></musicList>
	</transition>
</template>
<script>
import musicList from '../../components/musicList/musicList'
import {mapGetters} from 'vuex'
import {getSingerDetail} from '../../api/singer.js'
	export default {
		data(){
			return {
				startUrl:'https://y.gtimg.cn/music/photo_new/T001R800x800M000',
				endUrl:'.jpg?max_age=2592000',
				songList:[]
			}
		},
		created(){
			this._getSingerDetail(this.singer.Fsinger_mid)
		},
		components:{
			musicList
		},
		methods:{
			_getSingerDetail(id){
				if(!id){
					this.$router.push('/singer')
					return 
				}
			    getSingerDetail(id).then((res)=>{
			    	if(res.code === 0){
			    		this.songList=res.data.list
			    		console.log(this.songList)
			    	}
					
				})
			}
		},
		computed:{
			imgUrl(){
				if(!this.singer.Fsinger_mid){
					return ''
				}
				else{
					return 'https://y.gtimg.cn/music/photo_new/T001R800x800M000'+this.singer.Fsinger_mid+'.jpg?max_age=2592000'
				}
				 
			},
			...mapGetters([
				'singer'
				])
		}
	}
</script>
<style lang="stylus" scoped>


				




</style>