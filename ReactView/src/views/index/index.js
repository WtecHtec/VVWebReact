import React from 'react';
// import './index.css';
import httpRequest from '../../uitls/axios/axios'
import cookie from 'react-cookies'
import { Timeline, Empty,Button  } from 'antd';
import { ClockCircleOutlined, ToTopOutlined, RiseOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/charts';
import emitter from "@/uitls/react-events" 
const dayjs = require('dayjs')

class Index extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loginRecordDatas: [],
            previewdatas:[]
        }
    }
    

    getLoginRecordList(){
        // console.log( cookie.load('userInfo') )
        let userid =  cookie.load('userInfo') ? cookie.load('userInfo').userid :''
        httpRequest.get('loginrecordlist?userid=' +  userid ).then((res)=>{
            // console.log(res)
            if (res.status === 200) {
                this.setState({
                    loginRecordDatas: res.data
                })
            }
        }).catch((err)=>{console.log(err)})
        
    }
    
   
    getPreviewdatas(){
         let curDay =  dayjs(new Date().getTime())
         let curDate =  curDay.format('YYYY-MM-DD')
         httpRequest.get('previewdatas?userid=' + cookie.load('userInfo').userid + '&curDate=' + curDate ).then(res=>{
          if (res.status === 200) {
              // console.log('getPreviewdatas',  res.data)
              let resultData = []
              let objDataDate = {}
              res.data.forEach(item=>{
                objDataDate[item.previewtime] =  item.pagename
              })
              
              let objDataName = {}
              res.data.forEach(item=>{
                objDataName[item.pagename] =  item.pvvalue
              })
              for (let i = 7; i > 0; i--) {
                  let cubdate = curDay.subtract(24 * i , 'hour').format('YYYY-MM-DD')
                  let keys = Object.keys(objDataName)
                  // 其中有一个存在
                  if (objDataDate[cubdate]) {
                    
                    for (let j = 0; j < keys.length;j++){
                      resultData.push({
                        pagename: keys[j],
                        previewtime: cubdate,
                        pvvalue: objDataDate[cubdate] ===  keys[j] ? objDataName[keys[j]] : 0
                      })
                    }
                  } else {
                     // 一个都不存在
                     for (let n = 0; n < keys.length;n++){
                          resultData.push({
                            pagename: keys[n],
                            previewtime: cubdate,
                            pvvalue: 0
                          })
                     }
                  }

              }
              // console.log('resultData:', objDataDate, objDataName ,resultData)
              this.setState({
                previewdatas: resultData
              })
          }
         }).catch((err)=>{console.log(err)})
    }
    
    componentDidMount(){
        this.getLoginRecordList()
        this.getPreviewdatas()
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
          var data =  this.state.previewdatas
          const config = {
            data,
            height: 400,
            xField: 'previewtime',
            yField: 'pvvalue',
            seriesField: 'pagename',
            point: {
              size: 5,
              shape: 'diamond',
            },
          };

          var pvDom = data.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} > <Button onClick={()=> emitter.emit("changemenu","vvwebpages")  } type="primary">创建新页面</Button> </Empty> :  <Line {...config} />

        return (
            <div className="main" style={{paddingTop: '10px'}}>
                {/* 首页 */}
                <div className="content-shadow">
                    <div className="header-text " > <RiseOutlined  style={{ 'color': '#1890ff' }} />  页面访问次数</div>
                    <div style={{ 'padding': '24px' }}>
                       { pvDom } 
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

export default Index;
// export const IndexCom = Index