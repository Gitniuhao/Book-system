//安装并引进react react-dom然后用ReactDom.render进行页面渲染
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux' 
import store from './store'
import 'util/style.less'
import 'babel-polyfill'//引入依赖配置环境，使得async await生效
import { message,ConfigProvider } from 'antd'
message.config({//进行全局配置message样式
	top: 500
});
import 'core-js/es6'  
import 'react-app-polyfill/ie9'  
import 'react-app-polyfill/stable'
//引入中文语言包
import zhCN from 'antd/es/locale/zh_CN'; 
//在最顶层组件外用provider包裹整个app组件，并且将store赋予store的含义在于app里所以的组件都可以共享store里的数据
ReactDOM.render(
	<Provider store={store}>
		<ConfigProvider  locale={zhCN}>{/*进行全局化配置antd语言为中文*/}
		    <App />
	     </ConfigProvider>	
	</Provider>,
	document.getElementById('root')
)
