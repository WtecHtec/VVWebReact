import React from 'react';
import ReactDOM from 'react-dom';


// import login from './login.css'; 
import('./login.css') 
import { message,Form, Input, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import cookie from 'react-cookies'
import httpRequest from '../../uitls/axios/axios'
import { withRouter } from 'react-router-dom';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};
 
// console.log('css', login.loginmain )


class Login extends React.Component {
    
   

    constructor(props) {
        super(props);
        this.formRef = React.createRef(); 
        this.state={
            isSiginUp: false
         }
    }


    // 注册 btn
    signUpBtn(){
        
       const onLoginOut = event => {
            this.setState({
                isSiginUp:  false
            })
            requestAnimationFrame(()=>{
                this.formRef.current.resetFields()
            })
       }

        return (
            <div className='login-btn'>
             
                <Button icon={<ArrowLeftOutlined />}  onClick={ onLoginOut } >
                     Login In
                </Button>
                <Button type="primary" htmlType="submit" >
                    Sure
                </Button>
            </div>
        )
    }

    // 注册dom
    signUpDom(){

        return (
            <Form.Item
            label="Name"
            name="Name"
            rules={[
                { required: true, message: 'Please input your Name!' },
                { whitespace: true, message: 'Name cannot be a space!' }
            ]}
            >
             <Input />
            </Form.Item>
        )
    }


    
    // 登陆 btn 
    signInBtn(){
        const onSignUp = event => {
            console.log('event:', event);
            this.setState({
                isSiginUp: true
            })
           
            requestAnimationFrame(()=>{
                this.formRef.current.resetFields()
            })
        
        };
        return (
            <div className="login-btn">
                <Button type="primary" htmlType="submit">
                Login In
                </Button>
                <Button  onClick={ onSignUp }  htmlType="button">
                Sign Up
                </Button>
            </div>
        )
    }
     
    signInReq(values){
        let params = {
            email: values.Email,
            password:  values.password,
            cip: returnCitySN["cip"],
            cname: returnCitySN["cname"]
        }
        httpRequest.post('/signIn',params).then((res)=>{
            console.log('signInReq res:',res)
            if (res.status === 201) {
                message.error('Incorrect password or email!');
            } else if (res.status === 200) {
                cookie.save('authorityVal',res.data.authorization)
                delete res.data.authorization
                cookie.save('userInfo',res.data)
                this.props.history.push('/');
            }
           
        }).catch((err)=>{console.log('signInReq err:',err)})
    }

    signUpReq(values){
        let params = {
            username:values.Name,
            email: values.Email,
            password:  values.password
        }
        httpRequest.post('/signUp',params).then((res)=>{
            console.log('signUp res:',res)
            if (res.status === 201) {
                message.info('email 已被占用 !');
            } else {
                message.success('注册成功');
            }
        }).catch((err)=>{console.log('signUp err:',err)})

    }
  
    
    // 登陆dom
    loginDom () {

        const onFinish = values => {
            console.log('Success:', values);
            if ( this.state.isSiginUp ) {
                this.signUpReq(values)
            } else {
                this.signInReq(values)
            }
            // this.props.history.push('/'); // 主页面

          };
        
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

     
     
        return   (
            <div className="login-dialog">
                <Form
                 ref={this.formRef}
                name="control-hooks"
                labelAlign="left"
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                    {  this.state.isSiginUp ? this.signUpDom(): ''}
                <Form.Item
                    label="Email"
                    name="Email"
                    rules={[
                        { required: true, message: 'Please input your Email!' },
                        {  type: 'email', message: 'The input is not valid E-mail!'  }
                    ]}
                >
                    <Input />
                </Form.Item>
            
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[ 
                        { required: true, message: 'Please input your password!' },
                        { whitespace: true, message: 'Password cannot be a space!' }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout}>
                
                    
                 {  this.state.isSiginUp ?  this.signUpBtn() :  this.signInBtn()}

                </Form.Item>
                </Form>
            </div>
          );
    };

    componentDidMount(){
      
        // const [form] = Form.useForm();
    }

    componentDidUpdate(){
        // console.log('componentDidMount', this.formRef)

        // this.formRef.current.resetFields()
    }

   

    render() { 
        

        return ( 
        <div className="login-main" > 
                
            { this.loginDom() }
               
           
            </div>
         );
    }
}
// export default Login;
export const LoginCom = Login


