/*
 * @Author: 牛皓
 * @Date: 2020-12-08 11:22:54
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-08 13:55:50
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
                    <Form labelCol={{span:4}} wrapperCol={{span:16}}>
                        <div className={styles.detailForm}>
                            <div className={styles.left} style={{width:'33%'}}>
                                <Form.Item label="封面图片">
                                    <ul>
                                        <li style={{listStyle:'none'}}>
                                            <img 
                                                style={{height:'170px'}} 
                                                src={bookDetail.imgUrl!=null  ? bookDetail.imgUrl : require('images/暂无相关内容.png')}
                                                onError={(e)=>{e.target.onerror = null; e.target.src=require('images/暂无相关内容.png')}}
                                            ></img>
                                        </li>
                                    </ul>
                                </Form.Item>                           
                                <Form.Item label="售价" style={{minWidth:"40px"}}>
                                        <div  dangerouslySetInnerHTML={{__html: '￥'+bookDetail.bookPrice }}></div>
                                </Form.Item>
                                <Form.Item label=" 出版社" style={{minWidth:"150px"}}>
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.publish }}></div>
                                </Form.Item>                                 
                                <Form.Item label="数据来源">
                                    <a  href={bookDetail.dataSource} target="blank">{bookDetail.dataSource}</a> 
                                </Form.Item>                                
                                <Form.Item label="插入日期">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.createTime }}></div>
                                </Form.Item>
                                <Form.Item label="一级分类">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.primaryClass }}></div>
                                </Form.Item>
                                <Form.Item label="二级分类">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.secondClass }}></div>    
                                </Form.Item>
                                <Form.Item label="三级分类">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.threeClass }}></div>
                                </Form.Item>                            
                                <Form.Item label="装帧">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.bind }}></div>
                                </Form.Item>
                                <Form.Item label="页数">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.pages }}></div>    
                                </Form.Item>
                                <Form.Item label="印张">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.prints }}></div>
                                </Form.Item>
                                <Form.Item label="正文语种">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.languages }}></div>
                                </Form.Item>                                  
                            </div>
                            <div className={styles.right} style={{width:'40%'}}>
                                    <Form.Item label="isbn">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.isbn }}></div>
                                    </Form.Item>
                                    <Form.Item label="图书名">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.bookName }}></div>
                                    </Form.Item>
                                    <Form.Item label="作者">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.author }}></div>
                                    </Form.Item>        
                                    <Form.Item label="图书公司">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.company }}></div>
                                    </Form.Item>                                                                                                
                                    <Form.Item label="出版时间">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.publishDate }}></div>
                                    </Form.Item>                                
                                    <Form.Item label="更新日期">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.updateTime }}></div>
                                    </Form.Item>                                                            
                                    <Form.Item label="责任编辑">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.editor }}></div>
                                    </Form.Item>                             
                                    <Form.Item label="开本">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.format }}></div>
                                    </Form.Item>                                
                                    <Form.Item label="版次">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.edition }}></div>
                                    </Form.Item>                                
                                    <Form.Item label="字数">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.words }}></div>
                                    </Form.Item>                                                            
                                    <Form.Item label="上架类别">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.recommend }}></div>
                                    </Form.Item>                                                                                       
                                    <Form.Item label="录入时间">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.releaseDate }}></div>
                                    </Form.Item>
                                    <Form.Item label="读者群体">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.readergroup }}></div>
                                    </Form.Item>                                             
                            </div>
                        </div>                       
                        {/* <Form.Item label="出版社推荐语">
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
                        </Form.Item>                                   */}
                    </Form>
                </div>
                <Form labelCol={{span:3}} wrapperCol={{span:16}}>
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
            </AdminLayout>
        </div>
    )
}
const WrappedBookDetail = Form.create({name:'detail'})(BookDetail);
export default withRouter(memo(WrappedBookDetail));