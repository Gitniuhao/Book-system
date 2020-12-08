/*
 * @Author: 牛皓
 * @Date: 2020-11-30 15:08:28
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-08 13:57:20
 * @FilePath: \BookSystem\src\pages\searchBook\c-pngs\detail copy.js
 */
import React,{memo,useEffect} from 'react';
import AdminLayout from 'common/layout';
import {
    Breadcrumb,
    Form,
    Input,
    Descriptions ,
    Button
} from 'antd';
import {useSelector,useDispatch,shallowEqual} from 'react-redux'
import * as actionCreator from '../store/actionCreator'
import {withRouter} from 'react-router-dom'
import {createBrowserHistory} from 'history'
const history = createBrowserHistory()
import styles from '../index.module.css'
import {cutImageUrl} from 'util'

function BookDetail(props){

    const {bookDetail} = useSelector(state=>({
        bookDetail:state.getIn(['searchBook','bookDetail'])
    }),shallowEqual)

    const dispatch = useDispatch()
     useEffect(() => {
         dispatch(actionCreator.getBookDetailAction(props.match.params.bookId))  
    }, [])
     
    return(
        <div className={styles.bookDetail}>
            <AdminLayout>
                <div className={styles.top}>
                    <Breadcrumb style={{ margin: '7px 0' }}>
                        <Breadcrumb.Item>图书搜索</Breadcrumb.Item>
                        <Breadcrumb.Item>图书详情</Breadcrumb.Item>
                    </Breadcrumb>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          <Button className={styles.back} onClick={()=>props.history.push('/platform/searchBook/List')}>&lt;返回列表页</Button>  
                </div>                            
                <div className={styles.content}>
                    <Descriptions column={2} size='default' className={styles.desc}>
                                <Descriptions.Item label="封面图片">
                                    <ul>
                                        <li style={{listStyle:'none'}}>
                                            <img 
                                                style={{height:'170px'}} 
                                                src={bookDetail.imgUrl!=null  ? cutImageUrl(bookDetail.imgUrl) : require('images/暂无相关内容.png')}
                                                onError={(e)=>{e.target.onerror = null; e.target.src=require('images/暂无相关内容.png')}}
                                            ></img>
                                        </li>
                                    </ul>
                                </Descriptions.Item>                           
                                <Descriptions.Item label="售价">
                                        {/* <Input value={'￥'+bookDetail.bookPrice } /> */}
                                        <div  dangerouslySetInnerHTML={{__html: '￥'+bookDetail.bookPrice }}></div>
                                </Descriptions.Item>
                                <Descriptions.Item label=" 出版社">
                                    <Input value={bookDetail.publish } />
                                </Descriptions.Item>                                 
                                <Descriptions.Item label="数据来源">
                                    <Input value={bookDetail.dataSource } />
                                </Descriptions.Item>                                
                                <Descriptions.Item label="插入日期">
                                    <Input value={bookDetail.createTime } />
                                </Descriptions.Item>
                                <Descriptions.Item label="一级分类">
                                    <Input value={bookDetail.primaryClass } />
                                </Descriptions.Item>
                                <Descriptions.Item label="二级分类">
                                    <Input value={bookDetail.secondClass } />
                                </Descriptions.Item>
                                <Descriptions.Item label="三级分类">
                                    <Input value={bookDetail.threeClass } />
                                </Descriptions.Item>                            
                                <Descriptions.Item label="装帧">
                                    <Input value={bookDetail.bind } />
                                </Descriptions.Item>
                                <Descriptions.Item label="页数">
                                    <Input value={bookDetail.pages } />
                                </Descriptions.Item>
                                <Descriptions.Item label="印张">
                                    <Input value={bookDetail.prints } />
                                </Descriptions.Item>
                                <Descriptions.Item label="正文语种">
                                    <Input value={bookDetail.languages } />
                                </Descriptions.Item>                                                                 
                                    <Descriptions.Item label="isbn">
                                        <Input value={bookDetail.isbn} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="图书名">
                                        <Input value={bookDetail.bookName} />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="作者">
                                        <Input value={bookDetail.author } />
                                    </Descriptions.Item>        
                                    <Descriptions.Item label="图书公司">
                                        <Input value={bookDetail.company } />
                                    </Descriptions.Item>                                                                                                
                                    <Descriptions.Item label="出版时间">
                                        <Input value={bookDetail.publishDate } />
                                    </Descriptions.Item>                                
                                    <Descriptions.Item label="更新日期">
                                        <Input value={bookDetail.updateTime } />
                                    </Descriptions.Item>                                                            
                                    <Descriptions.Item label="责任编辑">
                                        <Input value={bookDetail.editor } />
                                    </Descriptions.Item>                             
                                    <Descriptions.Item label="开本">
                                        <Input value={bookDetail.format} />
                                    </Descriptions.Item>                                
                                    <Descriptions.Item label="版次">
                                        <Input value={bookDetail.edition } />
                                    </Descriptions.Item>                                
                                    <Descriptions.Item label="字数">
                                        <Input value={bookDetail.words } />
                                    </Descriptions.Item>                                                            
                                    <Descriptions.Item label="上架类别">
                                        <Input value={bookDetail.recommend } />
                                    </Descriptions.Item>                                                                                       
                                    <Descriptions.Item label="录入时间">
                                        <Input value={bookDetail.releaseDate } />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="读者群体">
                                        <Input value={bookDetail.readergroup } />
                                    </Descriptions.Item>                        
                       <Descriptions.Item label="出版社推荐语" span={2}>
                            <div  dangerouslySetInnerHTML={{__html: bookDetail.press }}></div>
                        </Descriptions.Item>
                        <Descriptions.Item label="作者简介" span={2}>
                            <div  dangerouslySetInnerHTML={{__html: bookDetail.authorbio }}></div>
                        </Descriptions.Item> 
                        <Descriptions.Item label="内容简介" span={2}>
                            <div  dangerouslySetInnerHTML={{__html: bookDetail.content }}></div>
                        </Descriptions.Item>
                        <Descriptions.Item label="目录" span={2}>                                   
                            <div  dangerouslySetInnerHTML={{__html: bookDetail.catalog }}></div>
                        </Descriptions.Item>                                  
                    </Descriptions >
                </div>
            </AdminLayout>
        </div>
    )
}
// const WrappedBookDetail = Form.create({name:'detail'})(BookDetail);
export default withRouter(memo(BookDetail));
