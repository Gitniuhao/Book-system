//引入react和属于react的Compontent函数
import React,{memo,useState,useEffect} from 'react'
import * as actionCreator from'../store/actionCreator.js'
import { useSelector,shallowEqual,useDispatch } from 'react-redux'
import { Breadcrumb,Alert } from 'antd';
import AdminLayout from 'common/layout'
import CustomTable from 'common/table'
import CustomPagination from 'common/pagination'
import SearchForms from './searchForms'
import {Link} from 'react-router-dom'

//容器组件，只负责业务逻辑和数据的处理
//用构造函数继承Compontent构造函数，然后渲染，最后返回html代码
function SearchBook(props){//自定义组件名字首字母都要大写，而html组件则就是个一个html标签
		const [values,setValues] = useState({})

		const {current,currentPageSize,total,totalPages,list,isFecthing,keywords} = useSelector(state =>({
			current:state.getIn(['searchBook','current']),
			currentPageSize:state.getIn(['searchBook','currentPageSize']),
			total:state.getIn(['searchBook','total']),
			totalPages:state.getIn(['searchBook','totalPages']),
			list:state.getIn(['searchBook','list']),
			isFecthing:state.getIn(['searchBook','isFecthing']),
			keywords:state.getIn(['searchBook','keywords'])
		}),shallowEqual)	

		useEffect(()=>{
			console.log('keywords', keywords)
		},[])
		const dispatch = useDispatch()

		const columns = [
			{
			  title: '序号',
			  dataIndex: 'key',
			  key: 'key',
			},			
			{
			  title: 'ID',
			  dataIndex: 'id',
			  key: 'id',
			},			
			{
			  title: '图书名',
			  key: 'bookName',
			  dataIndex: 'bookName',
			  render:(name)=>{
				  if(keywords){
					//   let reg = new RegExp(keywords,'ig')
					//   let newName = name.replace(reg,`<b style="color:red">${keywords}</b>`)
					let newName = ''
					keywords.forEach(item=>{
						let findText = name.split(item)
						newName = findText.join(`<b style="color:red">${item}</b>`)	
						name = newName
					})					
					  return <div dangerouslySetInnerHTML={{__html:newName}}></div>
				  }else{
					  return name;
				  }
			  }
			},
			{
				title: 'isbn',
				dataIndex: 'isbn',
				key: 'isbn',
			},
			{
			  title: '售价',
			  key: 'bookPrice',
			  dataIndex: 'bookPrice',
			},
			// {
			//   title: '作者',
			//   key: 'author',
			//   dataIndex: 'author',
			// },
			{
			  title: '出版社',
			  key: 'publish',
			  dataIndex: 'publish',
			},
			{
			  title: '二级分类',
			  key: 'secondClass',//secondClass
			  dataIndex: 'secondClass',
			},
			{
			  title: '出版时间',
			  key: 'publishDate',
			  dataIndex: 'publishDate',
			},
			{
			  title: '图书封面',
			  key: 'imgUrl',
			  dataIndex: 'imgUrl',
			  render:(imgUrl,record)=>{
				  return (						
					<img
						key={record.key} 
						style={{height:'40px'}}  
						src={imgUrl!=null  ? imgUrl : require('images/暂无相关内容.png')}
						onError={(e)=>{e.target.onerror = null; e.target.src=require('images/暂无相关内容.png')}}
					></img>
				  )
			  }
			},
			{
			  title: '数据来源',
			  key: 'dataSource',
			  dataIndex: 'dataSource',
			  render:(dataSource)=>{
				  return (
					  <a href={dataSource} target="blank">{dataSource}</a>
				  )
			  }
			},
			{
				title:'操作',
				render:(text,record)=>{
					return(
						<span>
							<Link to={'/platform/searchBook/detail/'+ record.id}
								// target='blank'
							>
								查看详情
							</Link>
						</span>
					)
				}
			}
		  ]
		  
		 var i =0;
		 const dataSource = list.map((item)=>{
			i++;
			return{
				key:i,
				id:item.get('id'),
			   	isbn:item.get('isbn'),
			   	bookName:item.get('bookName'),
			   	bookPrice:'￥'+item.get('bookPrice'),
			   	author:item.get('author'),
			   	publish:item.get('publish'),
			   	secondClass:item.get('secondClass'),
			   	publishDate:item.get('publishDate'),
			   	imgUrl:item.get('imgUrl'),
			   	dataSource:item.get('dataSource'),
			}		 	
		}).toJS()
		return(
 			<div className = 'SearchBook'>
 				<AdminLayout>
	 				<Breadcrumb style={{ margin: '16px 0' }}>
	                  <Breadcrumb.Item>图书搜索</Breadcrumb.Item>
	                  <Breadcrumb.Item>列表页面</Breadcrumb.Item>
	                </Breadcrumb>
					<Alert message="说明：搜索条件皆为非必填项" type="info" showIcon banner/>
					<SearchForms 
						getValues={((values)=>{
							setValues(values)
							dispatch(actionCreator.getBookListAction({
								values:values,
								currentPage:0,
								pageSize:10
							}))
							// console.log('values', values)	
						})}
					/>
					{current != 0  ?<div className="content">
						<CustomTable 
							columns={columns} 
							dataSource={dataSource}
							isFecthing={isFecthing}
						></CustomTable>	
						 <CustomPagination
							total={total}
							current={current}
							currentPageSize={currentPageSize}
							totalPages={totalPages}
							getChangeValues={(page,pageSize)=>{//点击分页器根据当前页码进行改变页面
								dispatch(actionCreator.getBookListAction({
									values:values,
									currentPage:page-1,
									pageSize
								}))
							}}							 
						></CustomPagination> 
					</div> : ''}
 				</AdminLayout>
 			</div>		
		)
	}

export default memo(SearchBook);
