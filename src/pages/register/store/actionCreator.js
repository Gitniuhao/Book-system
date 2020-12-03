/*
 * @Author: 牛皓
 * @Date: 2020-11-27 10:50:03
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-03 11:10:04
 * @FilePath: \BookSystem\src\pages\register\store\actionCreator.js
 */
//在此页面定义并导出各个action(对象)，便于维护与处理
import * as types from './actionTypes.js'
import { message } from 'antd';
import api from 'api'

const getRegisterStartAction = () =>({
	type:types.REGISTER_REQUEST_START
})
const getRegisterDoneAction = () =>({
	type:types.REGISTER_REQUEST_DONE
})

export const  getRegisterAction = (values)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		//发送请求之前显示loading
		dispatch(getRegisterStartAction())
		api.register({
			loginName:values.name,
			pwd:values.password,
			pwdRepeat:values.rePassword
		})
		.then(result=>{
			console.log('result', result)
			if(result.data.code === '0'){//登录成功		
				message.success('注册账号成功~')							
				// 2、然后跳转用后台首页
					window.location.href = '/platform/login'				
			}else{//登录失败
				message.error(result.data.rspMsg);
			}
		})
		.catch(err =>{
			 message.error('请求失败，请稍后重试~');
		})
		.finally(()=>{
			//请求完毕后loading取消
			dispatch(getRegisterDoneAction())
		})
	}
}

