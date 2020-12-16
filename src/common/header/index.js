/*
 * @Author: 牛皓
 * @Date: 2020-08-10 18:20:31
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-08 14:25:20
 * @FilePath: \BookSystem\src\common\header\index.js
 */
import { Layout, Menu, Icon, Dropdown, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React,{memo} from 'react';
const { Header } = Layout;
import styles from './index.module.css'
import { getItem,removeItem,judgeTime } from 'util'
import api from 'api';

function AdminHeader (){
  
  const confirm =()=>{
    Modal.confirm({
      title: '提醒',
      icon: <ExclamationCircleOutlined />,
      content: '确定退出管理平台吗',
      okText: '确认',
      cancelText: '取消',
      onOk(){
         handleLogout()
      }
    });
  }
  const handleLogout =()=>{//发送ajax清除后台session后然后清除前台locastroage退出登录
        api.logout();
         //1、清除localstorage
         removeItem('username')
         removeItem('token')
         //2、跳转到登录页面
         window.location.href = '/platform/login'  
  }
    const menu = (
      <Menu>
        <Menu.Item key="0" onClick={confirm}>
            <Icon type="logout" />退出
        </Menu.Item>
      </Menu>
    )
    return(
        <Layout>
          <Header className={styles.header}>
          <div style={style.logo} >
                <img style={style.im} src={require("images/logo.png")}></img>
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
    // paddingLeft:'20px',
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
export default memo(AdminHeader);