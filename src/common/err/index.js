/*
 * @Author: 牛皓
 * @Date: 2020-08-10 18:20:30
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-01 09:51:44
 * @FilePath: \rays\src\common\err\index.js
 */
import React,{Component} from 'react';
import { Alert,Button } from 'antd';
import styles from './index.module.css'
import {Link} from 'react-router-dom'
class Err extends Component{
	render(){
		return(	
			<div className={styles.Err}>
				<Alert
			      message="Not Found"
			      description="您输入的网址走丢了！请重新输入正确的地址！"
			      type="error"
			      showIcon
			    />
			    <Link to='/platform/searchBook/list'>
			    	<Button type="link" block>
				      返回首页
				    </Button>
			    </Link>
			</div>
		)
	}
}
export default Err;