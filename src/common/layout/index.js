/*
 * @Author: 牛皓
 * @Date: 2020-11-27 10:47:01
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-08 14:27:33
 * @FilePath: \BookSystem\src\common\layout\index.js
 */
import { Layout } from 'antd';
import React,{memo} from 'react';
const {  Content } = Layout;
import AdminHeader from 'common/header'

function AdminLayout (props){
    return(
        <Layout>
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
                 {props.children}
                </Content>
              </Layout>
            </Layout>
          </Layout>
      )
  }


export default memo(AdminLayout);