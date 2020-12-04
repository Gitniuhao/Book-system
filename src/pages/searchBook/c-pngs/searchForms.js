/*
 * @Author: 牛皓
 * @Date: 2020-08-31 10:56:19
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-04 13:35:31
 * @FilePath: \BookSystem\src\pages\searchBook\c-pngs\searchForms.js
 */
import React,{memo,useEffect} from 'react'
import styles from '../index.module.css';
import { Form,Input,Button } from 'antd';

function Search(props){

    useEffect(()=>{
        document.body.addEventListener('keydown',(e)=>{//在body上添加keydown事件
            if(window.event){
                e = window.event
            }
            let code = e.charCode || e.keyCode
            if(code === 13){
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
                props.getValues(values);//传递方法给父组件用来传递数据           
        }
        });
    };

    const { getFieldDecorator } = props.form;

    return (
        <div className={styles.form}>
            <Form  
                className={styles.searchForms} 
                labelCol={{ span: 7 }} 
                wrapperCol={{ span: 17 }}
                onSubmit={handleSubmit}
            >
                <Form.Item label="图书名称">
                    {getFieldDecorator('bookName',{
                    // rules: [{ required: true, message: '图书名称不能为空' }],
                    })(
                    <Input
                        placeholder="请输入图书名称"
                        style={{width:'230px'}}
                    />,
                    )}
                </Form.Item>
                <Form.Item label="isbn">
                    {getFieldDecorator('isbn',{
                    // rules: [{ required: true, message: 'isbn不能为空' }],
                    })(
                    <Input
                        placeholder="请输入isbn"
                        style={{width:'230px'}}
                    />,
                    )}
                </Form.Item>
                <Form.Item label="出版社">
                    {getFieldDecorator('publish',{
                    // rules: [{ required: true, message: '出版社不能为空' }],
                    })(
                    <Input
                        placeholder="请输入出版社"
                        style={{width:'230px'}}
                    />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button 
                    type="primary"  
                    className="btn-submit"
                    onClick ={()=>props.form.resetFields()}
                    >
                    重置
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button 
                        type="primary"  
                        className="btn-submit"
                        onClick ={handleSubmit}
                        
                        loading={props.isFetching}
                    >
                    搜索
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
  }
const SearchForms = Form.create({ name: 'search' })(Search);
export default memo(SearchForms);