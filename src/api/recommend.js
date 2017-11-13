import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams,options1,options2} from './config.js'
export function getRecommend(){

	const url='https://u.y.qq.com/cgi-bin/musicu.fcg'

	const str=`{
	"comm":{"ct":24},
	"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},
	"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},
	"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},
	"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},
	"new_album":{"module":"QQMusic.MusichallServer","method":"GetNewAlbum","param":{"type":0,"category":"-1","genre":0,"year":1,"company":-1,"sort":1,"start":0,"end":39}},
	"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},
	"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}
	}`

	const data= Object.assign({},commonParams,{
		callback: 'recommend',
		format: 'jsonp',
		data:str
	})
	return jsonp(url,data,options1)

}

export function getDisList(){
	const url='api/getDisList'
	const data= Object.assign({},commonParams,{
		picmid:1,
		rnd:Math.random(),
		categoryId:10000000,
		sortId:5,
		sin:0,
		ein:29,
		format:'json'
	})
	return axios.get(url,{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data)
	})
}