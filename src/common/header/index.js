/*
 * @Author: 牛皓
 * @Date: 2020-08-10 18:20:31
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-01 15:13:37
 * @FilePath: \Book-system\src\common\header\index.js
 */
import { Layout, Menu, Icon, Dropdown, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React,{Component} from 'react';
const { SubMenu } = Menu;
const { Header } = Layout;
import styles from './index.module.css'
import { getItem,removeItem,judgeTime } from 'util'
import api from 'api';

class AdminHeader extends Component{
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this.confirm = this.confirm.bind(this)
  }
 confirm(){
    const _this = this//将全局this重新赋值
    Modal.confirm({
      title: '提醒',
      icon: <ExclamationCircleOutlined />,
      content: '确定退出管理平台吗',
      okText: '确认',
      cancelText: '取消',
      onOk(){
          _this.handleLogout()
      }
    });
  }
  handleLogout(){//发送ajax清除后台session后然后清除前台locastroage退出登录
        api.logout();
         //1、清除localstorage
         removeItem('username')
         removeItem('token')
         //2、跳转到登录页面
         window.location.href = '/platform/login'  
  }
  render(){
    const menu = (
      <Menu>
        <Menu.Item key="0" onClick={this.confirm}>
            <Icon type="logout" />退出
        </Menu.Item>
      </Menu>
    )
    return(
        <Layout>
          <Header className={styles.header}>
          <div style={style.logo} >
                {/* <img style={style.im} src={require("images/logo.png")}></img> */}
               <span>RAYS <span style={style.platform}>图书展示平台</span></span>
            </div>
            <Dropdown overlay={menu} trigger={['click']} className={styles.dropDown}>
              <a className="ant-dropdown-link" href="#">
                {judgeTime()}{getItem('username')}<Icon type="down" />            
              </a>
            </Dropdown>
          </Header>
        </Layout>
      )
  }
}
const style = {
  logo: {
    height: '70px',
    width:'300px',
    // background: '#5e7aaa',
    color:' #fff',
	  fontSize: '25px',
    fontWeight: '500',
    lineHeight:'70px',
    boxSing:'border-box',
    paddingLeft:'30px',
    float:'left',
    verticalAlign:'middle'
  },
  platform:{
    fontSize:'20px',
 },
 im:{
  marginBottom:'7px'
 }
}
export default AdminHeader;