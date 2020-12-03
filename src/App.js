/*
 * @Author: 牛皓
 * @Date: 2020-08-10 18:20:30
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-01 10:12:59
 * @FilePath: \rays\src\App.js
 */
import React,{Component,Suspense, lazy} from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from 'react-router-dom'

// import {Spin} from 'antd'
// const Login = lazy(()=> import('pages/login'));
// const Home = lazy(()=> import('pages/home'));
// const Trade = lazy(()=> import('pages/trade'));
// const Order = lazy(()=> import('pages/order'));
// const Income = lazy(()=> import('pages/income'));
// const Expense = lazy(()=> import('pages/expense'));
// const Us = lazy(()=>import('pages/us'));
// const Err = lazy(()=>import('common/err'));

import Register  from 'pages/register';
import Login  from 'pages/login';
import SearchBook  from 'pages/searchBook';
import Err from 'common/err'


import {getItem} from 'util'

//子组件的集合组件
class App extends Component{
	render(){
		const HomeRoute = ({component:Component,rest})=>{//自定义首页路由
			return (
					<Route
						{...rest}
						render ={(props)=>{//当有登录信息时就渲染首页组件，没有则跳转到登录页面
							return getItem('username') ? <Component /> : <Redirect to='/platform/login' /> 
						}}
					/>
				)
		}
		const LoginRoute = ({component:Component,rest})=>{//自定义登录路由
			return (
					<Route
						{...rest}
						render ={(props)=>{//当有登录信息时就自动跳转首页组件，没有则渲染登录组件
							return getItem('username') ? <Redirect to='/platform/searchBook/list' />  : <Component />
						}}
					/>
				)
		}
		return(
			<Router>
				<div className ='App'>
					{/* <Suspense fallback={<div className="spin" style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}><Spin /></div>}> */}
					    <Switch>
								<LoginRoute path='/platform/login' component={Login} />	
								<Route path='/platform/register' component={Register} />	
								<HomeRoute exact path ='/' component={SearchBook} />
								<HomeRoute path='/platform/searchBook' component={SearchBook} />					
								<HomeRoute component={Err}/>
								<Redirect exact to="/platform/searchBook" from="/" />
								{/*在路由匹配选项下如果没有匹配的路由就前往错误组件页面*/}							
						</Switch>
					{/* </Suspense>		}		 */}
				</div>
			</Router>
		) 
	}
}	

export default App;
