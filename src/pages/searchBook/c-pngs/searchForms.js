/*
 * @Author: 牛皓
 * @Date: 2020-08-31 10:56:19
 * @LastEditors: 牛皓
 * @LastEditTime: 2020-12-17 17:08:03
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
                            style={{width:'220px'}}
                        />,
                        )}
                    </Form.Item>
                    <Form.Item label="isbn" style={{flex:"1"}}>
                        {getFieldDecorator('isbn',{
                        // rules: [{ required: true, message: 'isbn不能为空' }],
                        })(
                        <Input
                            placeholder="请输入isbn"
                            style={{width:'230px'}}
                        />,
                        )}
                    </Form.Item>
                    <Form.Item label="出版社" style={{flex:"1"}}>
                        {getFieldDecorator('publish',{
                        // rules: [{ required: true, message: '出版社不能为空' }],
                        })(
                        <Input
                            placeholder="请输入出版社"
                            style={{width:'230px'}}
                        />,
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