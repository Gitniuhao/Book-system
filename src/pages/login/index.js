//组件化：就是页面的一部分，把页面的一部分进行组件化写在另一个页面，然后导出，便于维护修改
//引入react和属于react的Compontent函数
import React,{memo,useEffect,useCallback} from 'react'
import * as actionCreator from'./store/actionCreator.js'
import { useDispatch,useSelector,shallowEqual } from 'react-redux'
import styles from './index.module.css';
import { Form, Icon, Input, Button } from 'antd';

//容器组件，只负责业务逻辑和数据的处理
//用构造函数继承Compontent构造函数，然后渲染，最后返回html代码
function NormalLoginForm(props){
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
  const {isFecthing} = useSelector(state =>({
    isFecthing:state.getIn(['login','isFecthing'])
  }),shallowEqual)

   const dispatch = useDispatch()
  const handleSubmit =useCallback((e)=>{
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        dispatch(actionCreator.getLoginAction(values))
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
                <span className={styles.loginText}>登录</span>
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '账号不能为空' },{pattern:/^\w{3,6}$/i,message:'用户名是以字母开头的3-6位字符'}],
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
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button 
                  type="primary"  
                  className={styles.btnSubmit}
                  onClick ={handleSubmit}
                  loading={isFecthing}
                >
                  登录
                </Button>
              </Form.Item>
              <Form.Item style={{float:'right'}}>
                <a className="register" href="/platform/register">未拥有账号，前往注册</a>
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
// }
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
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
export default memo(WrappedNormalLoginForm);
