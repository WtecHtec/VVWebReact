import React from 'react';
import './main.css'
import cookie from 'react-cookies'
import {NavLink,withRouter} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    MacCommandOutlined,
    VideoCameraOutlined,
    SmileOutlined,
  } from '@ant-design/icons';
  
const { Header, Sider, Content } = Layout;



class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state={ 
            collapsed: false,
            userName: cookie.load('userInfo')? cookie.load('userInfo').username :''
        }

        this.toggle = () => {
            this.setState({
              collapsed: !this.state.collapsed,
            });
        };

    }
    componentDidMount() {
        let authorityVal = cookie.load('authorityVal')
        if (!authorityVal) {
            this.props.history.push('/login'); // 跳回登录页
            return
        } else {
            this.props.history.push('/main');
        }
    }

    onMenuSelect(item, key, keyPath, selectedKeys, domEvent){
            console.log(item, key, keyPath, selectedKeys, domEvent)
    }

  

    render() { 
        // return ( 
        //     <div> 主页
        //      <div>
        //             <h2>Topics</h2>
        //             <NavLink to='/main'> Page1</NavLink> // Navlink 跳转路由
        //             <NavLink to='/main/Page2'> Page2</NavLink>
        //            {this.props.children} // 表示router/index.js 嵌套路由数据
        //             </div>
        //     </div>
        //  );

      

        return (
            <Layout>
              <Sider trigger={null} collapsible collapsed={this.state.collapsed} id="components-layout-demo-custom-trigger">
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['index']} onSelect={ (val)=>{
                            this.onMenuSelect(val)
                }  }>
                  <Menu.Item key="index" icon={<MacCommandOutlined />}>
                     首页
                  </Menu.Item>
                  <Menu.Item key="pageMage" icon={<VideoCameraOutlined />}>
                     页面管理
                  </Menu.Item>
                  {/* <Menu.Item key="3" icon={<UploadOutlined />}>
                    nav 3
                  </Menu.Item> */}
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0,display:'flex',justifyContent:'space-between' }}>
                  <div>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                      className: 'trigger',
                      onClick: this.toggle,
                    })}
                  </div>

                  <div>
                    <SmileOutlined  className="trigger"  style={{ color:'#409EFF' }}/>
                    <span  className="header-name">{ this.state.userName  }</span>
                  </div>
                 
                   
                </Header>
                <Content
                  className="site-layout-background"
                  style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                  }}
                >
                     {this.props.children}
                </Content>
              </Layout>
            </Layout>
          );


    }
}

export default withRouter(Main);
