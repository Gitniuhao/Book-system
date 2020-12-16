/*
 * @Author: 牛皓
 * @Date: 2020-11-30 15:08:28
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-08 17:26:30
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
                    </Breadcrumb>
                    <Button className={styles.back} onClick={()=>props.history.push('/platform/searchBook/List')}>&lt;返回列表页</Button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                </div>                            
                <div className={styles.content}>
                        <Descriptions column={1}>
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
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.publish }}></div>
                                </Descriptions.Item>                                 
                                <Descriptions.Item label="数据来源">
                                    <a  href={bookDetail.dataSource} target="blank">{bookDetail.dataSource}</a>
                                </Descriptions.Item>                                
                                <Descriptions.Item label="插入日期">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.createTime }}></div>
                                </Descriptions.Item>
                                <Descriptions.Item label="一级分类">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.primaryClass }}></div>
                                </Descriptions.Item>
                                <Descriptions.Item label="二级分类">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.secondClass }}></div>
                                </Descriptions.Item>
                                <Descriptions.Item label="三级分类">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.threeClass }}></div>
                                </Descriptions.Item>                            
                                <Descriptions.Item label="装帧">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.bind }}></div>
                                </Descriptions.Item>
                                <Descriptions.Item label="页数">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.pages }}></div>
                                </Descriptions.Item>
                                <Descriptions.Item label="印张">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.prints }}></div>
                                </Descriptions.Item>
                                <Descriptions.Item label="正文语种">
                                    <div  dangerouslySetInnerHTML={{__html: bookDetail.languages }}></div>
                                </Descriptions.Item>
                            </Descriptions>
                            <Descriptions column={1}>
                                    <Descriptions.Item label="isbn">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.isbn }}></div>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="图书名">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.bookName }}></div>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="作者">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.author }}></div>
                                    </Descriptions.Item>        
                                    <Descriptions.Item label="图书公司">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.company }}></div>
                                    </Descriptions.Item>                                                                                                
                                    <Descriptions.Item label="出版时间">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.publishDate }}></div>
                                    </Descriptions.Item>                                
                                    <Descriptions.Item label="更新日期">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.updateTime }}></div>
                                    </Descriptions.Item>                                                            
                                    <Descriptions.Item label="责任编辑">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.editor }}></div>
                                    </Descriptions.Item>                             
                                    <Descriptions.Item label="开本">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.format }}></div>
                                    </Descriptions.Item>                                
                                    <Descriptions.Item label="版次">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.edition }}></div>
                                    </Descriptions.Item>                                
                                    <Descriptions.Item label="字数">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.words }}></div>
                                    </Descriptions.Item>                                                            
                                    <Descriptions.Item label="上架类别">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.recommend }}></div>
                                    </Descriptions.Item>                                                                                       
                                    <Descriptions.Item label="录入时间">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.releaseDate }}></div>
                                    </Descriptions.Item>
                                    <Descriptions.Item label="读者群体">
                                        <div  dangerouslySetInnerHTML={{__html: bookDetail.readergroup }}></div>
                                    </Descriptions.Item>                           
                            </Descriptions>                                                                 
                           
                </div>
                <Descriptions column={1}>      
                    <Descriptions.Item label="出版社推荐语" labelStyle={{marginTop:'0px'}}>
                        <div  dangerouslySetInnerHTML={{__html: bookDetail.press }}></div>
                    </Descriptions.Item>
                    <Descriptions.Item label="作者简介">
                        <div  dangerouslySetInnerHTML={{__html: bookDetail.authorbio }}></div>
                    </Descriptions.Item> 
                    <Descriptions.Item label="内容简介" >
                        <div  dangerouslySetInnerHTML={{__html: bookDetail.content }}></div>
                    </Descriptions.Item>
                    <Descriptions.Item label="目录">                                   
                        <div  dangerouslySetInnerHTML={{__html: bookDetail.catalog }}></div>
                    </Descriptions.Item>                                  
                </Descriptions >
            </AdminLayout>
        </div>
    )
}
// const WrappedBookDetail = Form.create({name:'detail'})(BookDetail);
export default withRouter(memo(BookDetail));
