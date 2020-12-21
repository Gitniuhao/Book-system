/*
 * @Author: 牛皓
 * @Date: 2020-12-03 10:58:44
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-21 10:23:32
 * @FilePath: \BookSystem\src\common\pagination\index.js
 */
import React,{memo} from 'react'
import {Pagination} from 'antd'

function CustomPagination (props){

    const {total,current,currentPageSize,totalPages} = props
    return(
            <Pagination
                total={total}
                current={current}
                pageSize={currentPageSize}
                showTotal={ total => `第${current}/${totalPages}页 每页${currentPageSize}项 共${total}项` }
                onChange={(page,pageSize)=>{//点击分页器根据当前页码进行改变页面
                    props.getChangeValues(page,pageSize)
                }}							 
                showQuickJumper
                hideOnSinglePage={true}
                // itemRender={(page, type, originalElement)=>{
                //     // console.log('originalElement', originalElement)
                //     // console.log('page', page)
                //     // if(type == 'page' && page > 6){
                //     //     return 
                //     // }
                // }}
            />            
    )
}
export default memo(CustomPagination);
