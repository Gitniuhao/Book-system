//组件化：就是页面的一部分，把页面的一部分进行组件化写在另一个页面，然后导出，便于维护修改
//引入react和属于react的Compontent函数
import React,{memo,useEffect,useCallback,useState} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import {useSelector,shallowEqual,useDispatch } from 'react-redux'
import styles from './index.module.css';
import { Form, Icon, Input, Button,message } from 'antd';
import Captcha from 'common/captcha'
// import Captcha from 'react-captcha-code'

//容器组件，只负责业务逻辑和数据的处理
//用构造函数继承Compontent构造函数，然后渲染，最后返回html代码
function NormalRegisterForm(props){
    const [password,setPassword] = useState('12345');
    const [authCode,setAuthCode] = useState('dfer')

    let bgcBottom = {
      backgroundImage:`url(${require('images/login-bottom.png')})`,
      backgroundRepeat:'no-repeat',
      backgroundPosition:'bottom',
      backgroundSize:'100% auto'
    }
    let bgcTop = {
      backgroundImage:`url(${require('images/login-top.png')})`,
      backgroundRepeat:'no-repeat',
      backgroundPosition:'50%',
      backgroundSize:'100% 100%'
    }

    const {isFecthing} = useSelector(state => ({//从store中获取数据
      isFecthing:state.getIn(['register','isFecthing'])
    }),shallowEqual)

    const dispatch = useDispatch()
    useEffect(() => {
      console.log('isFecthing', isFecthing)
    }, [])

    const onRePasswordBlur = (e) => {//再次输入密码时进行验证
        // console.log('change', e.target.value)
        console.log('password', password)
        if(password != e.target.value){
          message.error('两次密码不一致，请重新输入密码')
          return;
        }
    }
    const onAuthBlur = (e) => {//输入图形验证码时的验证
        if(authCode != e.target.value){
          message.error('验证码输入错误，请重新输入')
          return;
        }
      }

    const handleSubmit = useCallback((e)=>{
      e.preventDefault();
      props.form.validateFields((err, values) => {
        if (!err) {  
          console.log('object', values)

            dispatch(actionCreator.getRegisterAction(values))      
        }
      });
    },[])
     
    const { getFieldDecorator } = props.form;
    return (
        <div className={styles.container}>
            <div className={styles.top} style={bgcTop}>
              <ul className={styles.name}>
                  <li className={styles.nameTop}><span>RAYS图书平台</span></li>
                  <li className={styles.nameBottom}><span>RAYS BOOK PLATFORM</span></li>
              </ul>
            </div>
            <div className={styles.Login} style={bgcBottom}>
            <Form  className={styles.loginForm}>
              <Form.Item style={{fontSize:'24px',textAlign:'center'}}>
                <span className="ant-form-text">注册</span>
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '账号不能为空' },{pattern:/^\w{3,9}$/i,message:'用户名是以字母开头的3-9位字符'}],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                    placeholder="请输入账号"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '密码不能为空' },{pattern:/^\w{3,9}$/i,message:'密码是任意的3-9位字符'}],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                    onBlur={e=>setPassword(e.target.value)}
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('rePassword', {
                  rules: [{ required: true, message: '密码不能为空' },{pattern:/^\w{3,9}$/i,message:'密码是任意的3-9位字符'}],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                    type="password"
                    placeholder="请再次输入密码"
                    onBlur={onRePasswordBlur}
                  />,
                )}
              </Form.Item>
              <Form.Item>
              {getFieldDecorator('authCode')(              
                  <Input
                    prefix={<Icon type="check-square" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                    type="authCode"
                    placeholder="请输入下方验证码"
                    onBlur={onAuthBlur}
                  />,
                )}
                  <Captcha charNum={4} height={30} onChange={captcha=>setAuthCode(captcha)} style={{border:'1px solid #ccc',borderRadius:'20px',margin:'10px 70px'}}/>
              </Form.Item>
              <Form.Item>
                <Button 
                  type="primary"  
                  className={styles.btnSubmit}
                  onClick ={handleSubmit}
                  loading={isFecthing}
                >
                  注册
                </Button>
              </Form.Item>
              <Form.Item style={{float:'right'}}>
                <a className="register" href="/platform/login">已拥有账号?前往登录</a>
              </Form.Item>
            </Form>
          </div>
            <div className={styles.bottom}>
            <p>
              RAYS图书平台
              <br/>
              Copyight &copy; 2020 中国 武汉 数字出版研究中心
            </p>
          </div>   
        </div>        
    );
  }
const WrappedNormalRegisterForm = Form.create({ name: 'normal_login' })(NormalRegisterForm);
// //将store里的数据映射到props里
// const mapStateToProps = (state) =>{
// 	return{
// 		isFecthing:state.get('login').get('isFecthing') 
// 	}
// }
// //将方法映射到组件中，从而返回到this.props里
// const mapDispatchToProps =(dispatch)=>{//利用接收的dispatch参数，进行派发action
// 	return{//将方法都需要返回一个对象，
// 		 handleLogin:(values)=>{
// 		 	dispatch(actionCreator.getLoginAction(values))
// 		 }
// 	}
// }
export default memo(WrappedNormalRegisterForm);
