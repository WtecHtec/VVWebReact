import React from 'react';
// import './index.css';
import httpRequest from '../../uitls/axios/axios'
import cookie from 'react-cookies'
import { Timeline } from 'antd';
import { ClockCircleOutlined, ToTopOutlined, RiseOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/charts';

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
        var data = [
            {
              month: 'Jan',
              key: 'series1',
              value: 125,
            },
            {
              month: 'Jan',
              key: 'series2',
              value: 51,
            },
            {
              month: 'Feb',
              key: 'series1',
              value: 132,
            },
            {
              month: 'Feb',
              key: 'series2',
              value: 91,
            },
            {
              month: 'Mar',
              key: 'series1',
              value: 141,
            },
            {
              month: 'Mar',
              key: 'series2',
              value: 34,
            },
            {
              month: 'Apr',
              key: 'series1',
              value: 158,
            },
            {
              month: 'Apr',
              key: 'series2',
              value: 47,
            },
            {
              month: 'May',
              key: 'series1',
              value: 133,
            },
            {
              month: 'May',
              key: 'series2',
              value: 63,
            },
            {
              month: 'June',
              key: 'series1',
              value: 143,
            },
            {
              month: 'June',
              key: 'series2',
              value: 58,
            },
            {
              month: 'July',
              key: 'series1',
              value: 176,
            },
            {
              month: 'July',
              key: 'series2',
              value: 56,
            },
            {
              month: 'Aug',
              key: 'series1',
              value: 194,
            },
            {
              month: 'Aug',
              key: 'series2',
              value: 77,
            },
            {
              month: 'Sep',
              key: 'series1',
              value: 115,
            },
            {
              month: 'Sep',
              key: 'series2',
              value: 99,
            },
            {
              month: 'Oct',
              key: 'series1',
              value: 134,
            },
            {
              month: 'Oct',
              key: 'series2',
              value: 106,
            },
            {
              month: 'Nov',
              key: 'series1',
              value: 110,
            },
            {
              month: 'Nov',
              key: 'series2',
              value: 88,
            },
            {
              month: 'Dec',
              key: 'series1',
              value: 91,
            },
            {
              month: 'Dec',
              key: 'series2',
              value: 56,
            },
          ];
          const config = {
            data,
            height: 400,
            xField: 'month',
            yField: 'value',
            seriesField: 'key',
            point: {
              size: 5,
              shape: 'diamond',
            },
          };
      

        return (
            <div className="main" style={{paddingTop: '10px'}}>
                {/* 首页 */}
                <div className="content-shadow">
                    <div className="header-text " > <RiseOutlined  style={{ 'color': '#1890ff' }} />  页面访问次数</div>
                    <div style={{ 'padding': '24px' }}>
                        <Line {...config} />
                    </div>
                </div>
                <div className="content-shadow">
                    <div className="header-text " ><ToTopOutlined style={{ 'color': '#1890ff' }} /> 登陆记录</div>
                    <Timeline mode="alternate">
                        { this.timeLineItemsDom() }
                    </Timeline>
                </div>
            </div>
          );
    }
  
}

// export default Index;
export const IndexCom = Index