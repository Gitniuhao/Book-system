/*
 * @Author: 牛皓
 * @Date: 2020-08-14 10:15:37
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-08 14:32:02
 * @FilePath: \BookSystem\src\common\table\index.js
 */
import React,{memo} from 'react'
import {Table} from 'antd'

function CustomTable(props){
    
    const {columns,dataSource,isFecthing} = props
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

export default memo(CustomTable);
