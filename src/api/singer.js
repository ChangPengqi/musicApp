import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams,options3} from './config.js'


export function getSingerList(){
	const url='api/getSingerList'
	const data=Object.assign({},commonParams,{
		channel:'singer',
		page:'list',
		key:'all_all_all',
		pageSize:100,
		pagenum:1,
		format:'json'
	})
	return axios.get(url,{
		params:data
	}).then((res)=>{
		return Promise.resolve(res.data)
	})

}


export function getSingerDetail(id){
	const url='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
	const data=Object.assign({},commonParams,{
		singermid:id,
		order:'listen',
		begin:0,
		num:30,
		songstatus:1,
		format:'jsonp'
	})
	return jsonp(url,data,options3)
}