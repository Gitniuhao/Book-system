/*
 * @Author: 牛皓
 * @Date: 2020-07-17 10:47:05
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-11-30 16:59:38
 * @FilePath: \rays\src\api\index.js
 */
//封装api
import {SERVER,API_CONFIG} from './config'
import axios from 'axios'
import {getItem} from 'util'

const getApiObj = (API_CONFIG)=>{
	const apiObj = {}
	for(let key in API_CONFIG){//for in遍历 API_CONFIG对象，从而获取每一项
		apiObj[key] = (data)=>{//让每一项为一个方法
			let url = SERVER+API_CONFIG[key][0];
			let method = API_CONFIG[key][1];
			return request(url,method,data)
		}
	}
	return apiObj;
}
const request = (url,method,data)=>{
	return new Promise((resolve,reject)=>{
		const options = {
			method:method,
			url:url,
			// headers:{
			// 	// 'token': getItem('username')
		   	// },
		}
		switch(method.toUpperCase()){//axios发送ajax时且方法是get或delete，携带参数必须用params携带
			case 'GET':
			case 'DELETE':
				options.params = data
				break;
			default:
			 	options.data = data
		}
		axios(options)
		.then(result=>{			
			resolve(result)
		})
		.catch(err =>{
			 reject(err)
		})
	})
}
export default getApiObj(API_CONFIG);//最后传出去一个对象