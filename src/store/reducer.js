/*
 * @Author: 牛皓
 * @Date: 2020-11-27 10:47:02
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-11-30 16:09:29
 * @FilePath: \rays\src\store\reducer.js
 */
import {combineReducers} from 'redux-immutable'
import { reducer as loginReducer } from 'pages/login/store'
import { reducer as registerReducer } from 'pages/register/store'
import { reducer as searchBookReducer } from 'pages/searchBook/store'

export default combineReducers({
    login:loginReducer,
    register:registerReducer,
    searchBook:searchBookReducer,
})
