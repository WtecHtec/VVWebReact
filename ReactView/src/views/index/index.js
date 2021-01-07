import React from 'react';
import './index.css';
import httpRequest from '../../uitls/axios/axios'
import cookie from 'react-cookies'
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

class Index extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loginRecordDatas: []
        }
    }
    

    getLoginRecordList(){
        // console.log( cookie.load('userInfo') )
        httpRequest.get('loginrecordlist?userid=' + cookie.load('userInfo').userid).then((res)=>{
            console.log(res)
            if (res.status === 200) {
                this.setState({
                    loginRecordDatas: res.data
                })
            }
        }).catch((err)=>{console.log(err)})
        
    }
    
    componentDidMount(){
        this.getLoginRecordList()
    }
    
    timeLineItemsDom(){
      

          let loginRecordDatas =  this.state.loginRecordDatas

          const timeLineItems = loginRecordDatas.map((item, index) => 
            <Timeline.Item  key={ 'time' + index } dot={ <ClockCircleOutlined style={{ fontSize: '16px' }}  />}>
                <div style={{fontWeight: 700}}>
                 { item.logintime  }
                </div>
                <div>
                    在  { item.loginplace  }( { item.loginip  }) 登陆
                </div>
            
             </Timeline.Item>
          )
        return  timeLineItems
    }

    render(){
       
      

        return (
            <div className="main" style={{paddingTop: '10px'}}>
                {/* 首页 */}
                <Timeline mode="alternate">
                    { this.timeLineItemsDom() }
                </Timeline>
            </div>
          );
    }
  
}

export default Index;