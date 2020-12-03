import React,{Component} from 'react'
import {Pagination} from 'antd'

class CustomPagination extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const {total,current,currentPageSize,totalPages} = this.props
        return(
                <Pagination
                    total={total}
                    current={current}
                    pageSize={currentPageSize}
                    showTotal={ total => `第${current}/${totalPages}页 每页${currentPageSize}项 共${total}项` }
                    onChange={(page,pageSize)=>{//点击分页器根据当前页码进行改变页面
                        this.props.getChangeValues(page,pageSize)
                    }}							 
                    showQuickJumper
                    hideOnSinglePage={true}
                />            
        )
    }
}
export default CustomPagination;
