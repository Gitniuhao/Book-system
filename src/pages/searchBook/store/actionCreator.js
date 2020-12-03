/*
 * @Author: 牛皓
 * @Date: 2020-11-27 10:47:01
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-03 18:31:44
 * @FilePath: \BookSystem\src\pages\searchBook\store\actionCreator.js
 */
//在此页面定义并导出各个action(对象)，便于维护与处理
import * as types from './actionTypes.js'
import {ErrorMessage,getItem} from 'util'
import axios from 'axios';

const setBookListAction = (payload)=>({
	type:types.SET_BOOK_LIST,
	payload
})
const setBookDetailAction = (payload)=>({
	type:types.SET_BOOK_DETAIL,
	payload
})

const getPageStartAction = () =>({
	type:types.PAGE_REQUEST_START
})
const getPageDoneAction = () =>({
	type:types.PAGE_REQUEST_DONE
})

export const getBookListAction = (BookData)=>{
	return (dispatch,getState) =>{
		dispatch(getPageStartAction())
		axios({
			method:'get',
			url:'RaysSystem//api/bi/bookStd/list',
			params:{
				currentPage:BookData.currentPage,
				numPerPage:BookData.pageSize,
				bookName:BookData.values.bookName,
				isbn:BookData.values.isbn,
				publish:BookData.values.publish
			},
			headers:{
				'token':getItem('token')
			}
		})
		.then(result=>{
			if(result.data.errCode === 0){
				// //派发action传递设置页面分页数据
				// console.log('object', result.data.data)
				dispatch(setBookListAction(result.data.data))
			}else{
				ErrorMessage()
			}			
		})
		.catch(err =>{
			console.log(err)
		})
		.finally(()=>{//ajax发送完毕，取消loading
			dispatch(getPageDoneAction())
		})
	}
}

export const getBookDetailAction = (bookId)=>{
	return (dispatch,getState) =>{
		dispatch(getPageStartAction())
		axios({
			method:'get',
			url:'/RaysSystem/api/bi/bookStd/getById',
			params:{
				id:bookId
			},
			headers:{
				'token':getItem('token')
			}
		})
		.then(result=>{
			if(result.data.errCode === 0){
				// //派发action传递设置页面分页数据
				// console.log('object', result.data.data)
				dispatch(setBookDetailAction(result.data.data))
			}else{
				ErrorMessage()
			}			
		})
		.catch(err =>{
			console.log(err)
		})
		.finally(()=>{//ajax发送完毕，取消loading
			dispatch(getPageDoneAction())
		})
	}
}