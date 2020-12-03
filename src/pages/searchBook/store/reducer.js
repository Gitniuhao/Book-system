/*
 * @Author: 牛皓
 * @Date: 2020-11-27 10:47:01
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-02 09:48:21
 * @FilePath: \Book-system\src\pages\searchBook\store\reducer.js
 */
//此页面利用reducer进行数据的处理，使得数据处理更加高效
import * as types from './actionTypes.js'
import { fromJS } from 'immutable'
const defaultState = fromJS({//初始化默认数据
	list:[],
	current:0,
	currentPageSize:0,
	totalPages:0,
	total:0,
	keywords:'',

	bookDetail:{},

	isFecthing:false
})
export default (state = defaultState,action)=>{
	if(action.type == types.SET_BOOK_LIST){//处理输入时数据变化
		// console.log('current', action.payload.pageBean.currentPage)
		return state.merge({
			'list':fromJS(action.payload.pageBean.recordList),
			'current':action.payload.pageBean.currentPage+1,
			'currentPageSize':action.payload.pageBean.numPerPage,
			'total':action.payload.pageBean.totalCount,
			'totalPages':action.payload.pageBean.pageCount,
			'keywords':action.payload.keywords[0]
		})
	}
	if(action.type == types.SET_BOOK_DETAIL){//开始时将spinning的值设置为true
		return state.set('bookDetail',action.payload)
	}
	if(action.type == types.PAGE_REQUEST_START){//开始时将spinning的值设置为true
		return state.set('isFecthing',true)
	}
	if(action.type == types.PAGE_REQUEST_DONE){//结束时将spinning的值设置为false
		return state.set('isFecthing',false)
	}
	return state;//如果上述都没有，返回state
}


