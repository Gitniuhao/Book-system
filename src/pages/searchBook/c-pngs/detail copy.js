/*
 * @Author: 牛皓
 * @Date: 2020-11-30 15:08:28
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-07 17:51:38
 * @FilePath: \BookSystem\src\pages\searchBook\c-pngs\detail.js
 */
import React,{memo,useEffect} from 'react';
import AdminLayout from 'common/layout';
import {
    Breadcrumb,
    Form,
    Input,
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
                    </Breadcrumb>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               <Button className={styles.back} onClick={()=>props.history.push('/platform/searchBook/List')}>&lt;返回列表页</Button>  
                </div>                            
                <div className='content'>
                    <Form labelCol={{span:2}} wrapperCol={{span:16}}>
                        <div className={styles.detailForm}>
                            <div className={styles.left} style={{width:'40%'}}>
                                <Form.Item label="封面图片">
                                    <ul>
                                        <li style={{listStyle:'none'}}>
                                            <img 
                                                style={{height:'170px'}} 
                                                src={bookDetail.imgUrl!=null  ? cutImageUrl(bookDetail.imgUrl) : require('images/暂无相关内容.png')}
                                                onError={(e)=>{e.target.onerror = null; e.target.src=require('images/暂无相关内容.png')}}
                                            ></img>
                                        </li>
                                    </ul>
                                </Form.Item>                           
                                <Form.Item label="售价">
                                        <Input value={'￥'+bookDetail.bookPrice } />
                                </Form.Item>
                                <Form.Item label=" 出版社">
                                    <Input value={bookDetail.publish } />
                                </Form.Item>                                 
                                <Form.Item label="数据来源">
                                    <Input value={bookDetail.dataSource } />
                                </Form.Item>                                
                                <Form.Item label="插入日期">
                                    <Input value={bookDetail.createTime } />
                                </Form.Item>
                                <Form.Item label="一级分类">
                                    <Input value={bookDetail.primaryClass } />
                                </Form.Item>
                                <Form.Item label="二级分类">
                                    <Input value={bookDetail.secondClass } />
                                </Form.Item>
                                <Form.Item label="三级分类">
                                    <Input value={bookDetail.threeClass } />
                                </Form.Item>                            
                                <Form.Item label="装帧">
                                    <Input value={bookDetail.bind } />
                                </Form.Item>
                                <Form.Item label="页数">
                                    <Input value={bookDetail.pages } />
                                </Form.Item>
                                <Form.Item label="印张">
                                    <Input value={bookDetail.prints } />
                                </Form.Item>
                                <Form.Item label="正文语种">
                                    <Input value={bookDetail.languages } />
                                </Form.Item>                                  
                            </div>
                            <div className={styles.right} style={{width:'40%'}}>
                                    <Form.Item label="isbn">
                                        <Input value={bookDetail.isbn} />
                                    </Form.Item>
                                    <Form.Item label="图书名">
                                        <Input value={bookDetail.bookName} />
                                    </Form.Item>
                                    <Form.Item label="作者">
                                        <Input value={bookDetail.author } />
                                    </Form.Item>        
                                    <Form.Item label="图书公司">
                                        <Input value={bookDetail.company } />
                                    </Form.Item>                                                                                                
                                    <Form.Item label="出版时间">
                                        <Input value={bookDetail.publishDate } />
                                    </Form.Item>                                
                                    <Form.Item label="更新日期">
                                        <Input value={bookDetail.updateTime } />
                                    </Form.Item>                                                            
                                    <Form.Item label="责任编辑">
                                        <Input value={bookDetail.editor } />
                                    </Form.Item>                             
                                    <Form.Item label="开本">
                                        <Input value={bookDetail.format } />
                                    </Form.Item>                                
                                    <Form.Item label="版次">
                                        <Input value={bookDetail.edition } />
                                    </Form.Item>                                
                                    <Form.Item label="字数">
                                        <Input value={bookDetail.words } />
                                    </Form.Item>                                                            
                                    <Form.Item label="上架类别">
                                        <Input value={bookDetail.recommend } />
                                    </Form.Item>                                                                                       
                                    <Form.Item label="录入时间">
                                        <Input value={bookDetail.releaseDate } />
                                    </Form.Item>
                                    <Form.Item label="读者群体">
                                        <Input value={bookDetail.readergroup } />
                                    </Form.Item>                                             
                            </div>
                        </div>                       
                        <Form.Item label="出版社推荐语">
                            <div  dangerouslySetInnerHTML={{__html: bookDetail.press }}></div>
                        </Form.Item>
                        <Form.Item label="作者简介">
                            <div  dangerouslySetInnerHTML={{__html: bookDetail.authorbio }}></div>
                        </Form.Item> 
                        <Form.Item label="内容简介">
                            <div  dangerouslySetInnerHTML={{__html: bookDetail.content }}></div>
                        </Form.Item>
                        <Form.Item label="目录">                                   
                            <div  dangerouslySetInnerHTML={{__html: bookDetail.catalog }}></div>
                        </Form.Item>                                  
                    </Form>
                </div>
            </AdminLayout>
        </div>
    )
}
const WrappedBookDetail = Form.create({name:'detail'})(BookDetail);
export default withRouter(memo(WrappedBookDetail));
