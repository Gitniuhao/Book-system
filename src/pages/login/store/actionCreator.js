/*
 * @Author: 牛皓
 * @Date: 2020-11-27 10:47:01
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-07 11:56:44
 * @FilePath: \BookSystem\src\pages\login\store\actionCreator.js
 */
//在此页面定义并导出各个action(对象)，便于维护与处理
import * as types from './actionTypes.js'
import { message } from 'antd';
import {setItem} from 'util'
import api from 'api'

const getLoginStartAction = () =>({
	type:types.LOGIN_REQUEST_START
})
const getLoginDoneAction = () =>({
	type:types.LOGIN_REQUEST_DONE
})

export const  getLoginAction = (values)=>{
	return (dispatch,getState) =>{//因为有redux-thunk这个中间件存在，可以让dispatch不仅可以处理对象，也可以处理函数
		//发送请求之前显示loading
		dispatch(getLoginStartAction())
		api.login({
			loginName:values.name,
			pwd:values.password
		})
		.then(result=>{
			console.log('result', result)
			if(result.data.code == '0'){//登录成功		
				// 1、先将用户信息保存在前台
				setItem({
					name:'username',
					value:result.data.data.info.loginName,
					expires:7200000,//设置两个小时到期
					startTime:new Date().getTime()
				})
				setItem({
					name:'token',
					value:result.data.data.token,
					expires:7200000,//设置两个小时到期
					startTime:new Date().getTime()
				})
				message.success('登陆成功~')							
				// 2、然后跳转用后台首页
					window.location.href = '/platform/searchBook'				
			}else{//登录失败
				message.error(result.data.msg);
			}
		})
		.catch(err =>{
			 message.error('请求失败，请稍后重试~');
		})
		.finally(()=>{
			//请求完毕后loading取消
			dispatch(getLoginDoneAction())
		})
	}
}

