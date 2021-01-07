import React from 'react';
import ReactDOM from 'react-dom';
import './login.css'
import { Form, Input, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import cookie from 'react-cookies'


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};




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
            <div className="login-btn">
             
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
            rules={[{ required: true, message: 'Please input your Name!' }]}
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
     
  
    
    // 登陆dom
    loginDom () {

     

        const onFinish = values => {
            console.log('Success:', values);
            cookie.save('authorityVal','authorityVal')
            this.props.history.push('/'); // 主页面

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
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input />
                </Form.Item>
            
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
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
            <div className="login-main"> 
                
            { this.loginDom() }
               
           
            </div>
         );
    }
}
export default Login;

