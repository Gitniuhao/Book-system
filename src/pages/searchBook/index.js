/*
 * @Author: 牛皓
 * @Date: 2020-11-30 15:08:53
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-08 13:34:12
 * @FilePath: \BookSystem\src\pages\searchBook\index.js
 */
import React,{Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {CacheRoute,CacheSwitch} from 'react-router-cache-route'


import List from './c-pngs/list.js'
import Detail from './c-pngs/detail.js'
// ()=><Detail/>
class searchBook extends Component{
	render(){
		return(
			<div className='searchBook'>
					<CacheSwitch>
						<CacheRoute exact path='/platform/searchBook/list' component={List} />
						<Route path='/platform/searchBook/detail/:bookId?' component={Detail}/>
                        <Redirect exact to="/platform/searchBook/list" form="/platform/searchBook/list" />
					</CacheSwitch>
			</div>
		)
	}
}
export default searchBook;