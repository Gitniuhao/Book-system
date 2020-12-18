/*
 * @Author: 牛皓
 * @Date: 2020-08-31 10:56:19
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-18 16:54:13
 * @FilePath: \BookSystem\src\pages\searchBook\c-pngs\searchForms.js
 */
import React,{memo,useEffect,useState} from 'react'
import styles from '../index.module.css';
import { Form,Input,Button } from 'antd';
import { Select } from 'antd';
const { Option } = Select;
import { JudgeDataSource } from 'util'

function Search(props){

    useEffect(()=>{
        document.body.addEventListener('keydown',(e)=>{//在body上添加keydown事件
            if(window.event){
                e = window.event
            }
            let code = e.charCode || e.keyCode
            if(code === 13){
                e.stopPropagation()//阻止enter键下拉框展开
                // console.log('dataSource', dataSource)
                handleSubmit(e)
            }
        });

        return () =>{
            document.body.removeEventListener('keydown',()=>{})
        }
    },[handleSubmit])

    
    const handleSubmit = (e)=>{
        e.preventDefault();
        props.form.validateFields((err, values) => {
        if (!err) {
            const Values = {
                bookName:values.bookName,
                isbn:values.isbn,
                publish:values.publish,
                dataSource:JudgeDataSource(values.dataSource.key)
            }
            console.log('values',  Values)
                props.getValues(Values);//传递方法给父组件用来传递数据           
        }
        });
    };
    const arr = [
        '请选择数据来源',
        'RAYS图书',
        '中国图书网',
        '豆瓣图书',
        '当当网',
        '京东图书',
        '中国图书库',
        '开卷网',
    ]

    const { getFieldDecorator } = props.form;

    return (
        <div className={styles.form}>
            <Form  
                className={styles.searchForms} 
                labelCol={{ span: 6 }} 
                wrapperCol={{ span: 18 }}
                onSubmit={handleSubmit}
            >
              <div className={styles.inputForm}>
                    <Form.Item label="图书名称">
                        {getFieldDecorator('bookName',{
                        // rules: [{ required: true, message: '图书名称不能为空' }],
                        })(
                        <Input
                            placeholder="请输入图书名称"
                            style={{width:'190px'}}
                        />,
                        )}
                    </Form.Item>
                    <Form.Item label="isbn" style={{flex:"1"}}>
                        {getFieldDecorator('isbn',{
                        // rules: [{ required: true, message: 'isbn不能为空' }],
                        })(
                        <Input
                            placeholder="请输入isbn"
                            style={{width:'200px'}}
                        />,
                        )}
                    </Form.Item>
                    <Form.Item label="出版社" style={{flex:"1"}}>
                        {getFieldDecorator('publish',{
                        // rules: [{ required: true, message: '出版社不能为空' }],
                        })(
                        <Input
                            placeholder="请输入出版社"
                            style={{width:'185px'}}
                        />,
                        )}
                    </Form.Item>
                    <Form.Item label="数据来源" >
                        {getFieldDecorator('dataSource',{
                            initialValue: {key:""},
                        // rules: [{ required: true, message: '出版社不能为空' }],
                        })(                     
                            <Select 
                                labelInValue  
                                style={{ width: 190  }}  
                                placeholder="请选择数据来源"
                                // allowClear={true} 
                            >
                                {arr.map((item)=>{
                                    return <Option key={item}  value={item == '请选择数据来源' ? '' : item}>{item}</Option>
                                })}
                            </Select>
                        )}
                    </Form.Item>
              </div>
              <div className={styles.buttonForm}>
                    <Form.Item>
                        <Button 
                            type="primary"
                            icon="search" 
                            className="btn-submit"
                            onClick={handleSubmit}
                            loading={props.isFetching}
                        >
                        查询
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="ghost"  
                            className="btn-submit"                   
                            onClick ={()=>props.form.resetFields()}
                        >
                        重置
                        </Button>
                    </Form.Item>
              </div>                 
                
            </Form>
        </div>
    );
  }
const SearchForms = Form.create({ name: 'search' })(Search);
export default memo(SearchForms);