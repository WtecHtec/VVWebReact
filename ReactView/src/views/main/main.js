import React from 'react';
// import './main.css'
import cookie from 'react-cookies'
import {NavLink,withRouter} from 'react-router-dom';
import { Layout, Menu, Dropdown, Modal,notification  } from 'antd';

import emitter from "@/uitls/react-events" 
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MacCommandOutlined,
  VideoCameraOutlined,
  SmileOutlined,
  ImportOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
  
const { Header, Sider, Content } = Layout;

const { confirm } = Modal;

const openNotification = () => {
  const args = {
    message: 'Notification',
    description:
      '反馈是不可能有反馈.',
    duration: 0,
  };
  notification.open(args);
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state={ 
            eventEmitter:'',
            menuSelectKey: 'index',
            collapsed: false,
            userName: cookie.load('userInfo')? cookie.load('userInfo').username :'',
            dropMenu:  (
              <Menu>
                <Menu.Item>
                  <a     rel="noopener noreferrer" onClick={ ()=> openNotification() } >
                    反馈
                  </a>
                </Menu.Item>
                <Menu.Item>
                  <a    rel="noopener noreferrer"  onClick={ ()=> this.showConfirm()} >
                    退出登陆
                  </a>
                </Menu.Item>
              </Menu>
            )
        }

        this.toggle = () => {
            this.setState({
              collapsed: !this.state.collapsed,
            });
        };

    }

    showConfirm() {
        let self = this
        confirm({
          title: '是否退出登陆',
          icon: <ExclamationCircleOutlined />,
          onOk() {
            // console.log('OK');
            cookie.remove('authorityVal')
            self.props.history.push('/login');
          },
          onCancel() {
            // console.log('Cancel');
          },
        });
    }

    componentDidMount() {
        let authorityVal = cookie.load('authorityVal')
        // console.log('authorityVal',authorityVal)
        if (!authorityVal) {
           
            this.props.history.push('/login'); // 跳回登录页
            return
        } else {
            this.props.history.push('/main');
        }

        emitter.addListener("changemenu",this.eventEmitter);
    }

    eventEmitter(menu) {
      console.log('changemenu', menu)
      this.setState({
        menuSelectKey:  menu
      })
      this.props.history.push('/main/' + menu );
    }
    componentWillUnmount(){
       if (this.state.eventEmitter) {
        emitter.removeListener(this.eventEmitter);
       }
    }

    onMenuSelect(item, key, keyPath, selectedKeys, domEvent){
            // console.log(item, key, keyPath, selectedKeys, domEvent)
            this.state.menuSelectKey =  item.key
            if ( !item.key ||  item.key === 'index') {
              this.props.history.push('/main');
              return
            }
            this.props.history.push('/main/' + item.key );
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
                <Menu theme="dark" mode="inline" selectedKeys={[ this.state.menuSelectKey ]} onSelect={ (val)=>{
                            this.onMenuSelect(val)
                }  }>
                  <Menu.Item key="index" icon={<MacCommandOutlined />}>
                     首页
                  </Menu.Item>
                  <Menu.Item key="vvwebpages" icon={<VideoCameraOutlined />}>
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
                    <Dropdown overlay={ this.state.dropMenu}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <ImportOutlined  className="trigger"  style={{ color:'#409EFF' }} />
                      </a>
                    </Dropdown>

                   
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

// export const MainCom = withRouter(Main)
