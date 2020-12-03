/*
 * @Author: 牛皓
 * @Date: 2020-08-14 10:15:37
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-09-21 10:48:44
 * @FilePath: \BI-system\src\common\table\index.js
 */
import React,{Component} from 'react'
import {Table} from 'antd'

class CustomTable extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {columns,dataSource,isFecthing} = this.props
        return(
            <div>
                <Table 
                    columns={columns} 
                    dataSource={dataSource}
                    pagination={ false }
                    loading={{//仿加载
                        spinning:isFecthing,
                        tip:'数据玩命加载中，请稍等片刻~'
                    }}
                    style={{overflow:'auto'}}
                    rowClassName={(record, index) => {
                        let className = 'odd';
                        if (index % 2 === 1) className = 'even';
                        return className;
                    }}
                />
            </div>   	
        )
    }
}
export default CustomTable;
