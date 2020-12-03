/*
 * @Author: 牛皓
 * @Date: 2020-11-27 10:47:01
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-03 10:54:00
 * @FilePath: \Book-system\src\common\layout\index.js
 */
import { Layout } from 'antd';
import React,{Component} from 'react';
const {  Content } = Layout;
import AdminHeader from 'common/header'
// import AdminSider from 'common/sider/sideNav'

class AdminLayout extends Component{
  render(){
    return(
        <Layout>
           {/* <AdminSider />          */}
            <Layout>
            <AdminHeader />
              <Layout style={{ padding: '0 24px 24px' }}>                
                <Content
                  style={{
                    background: '#fff',
                    padding: 24,
                    margin: 0,
                    minHeight:document.documentElement.clientHeight- 88
                  }}
                >
                 {this.props.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
      )
  }
}

export default AdminLayout;