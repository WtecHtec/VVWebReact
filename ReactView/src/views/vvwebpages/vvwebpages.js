import React from 'react';

import { Input, Row, Col ,Button ,Table ,Popconfirm   } from 'antd';
import httpRequest from '../../uitls/axios/axios'
import cookie from 'react-cookies'

class  Vvwebpages extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            tableColumns: [
                {
                    title: '页面名称',
                    dataIndex: 'pagename',
                    key: 'pagename',
                    align: 'center'
                  
                },
                {
                    title: '创建时间',
                    key: 'createtime',
                    dataIndex: 'createtime',
                    align: 'center',
                    sorter: (a, b) => { 
                            return new Date(a.createtime).getTime() -   new Date(b.createtime).getTime()
                    } 
               
                },
                {
                    title: '操作',
                    key: "action",
                    align: 'center',
                    render: (self, record) => {
                           return (
                               <div>
                                    <Popconfirm title="是否删除？" okText="确定" cancelText="取消" onConfirm={()=> this.onDelData(self, record) }>
                                        <a href="#">删除</a>
                                    </Popconfirm>
                                    <a> 修改 </a>
                               </div>
                           )
                    }
                },
            ],
            pagename: '',
            tableData: []
        }
    }
   
    componentDidMount(){ 
        this.getPagevViews() 
    }

    onDelData(self,record) {
        console.log('onDelData this:',self, record)
        let url = '/delpageview?pageid=' + record.pageid
        httpRequest.delete(url).then(res=>{
            if (res.status === 200) {
                this.getPagevViews()
            }
        })
    }
    // 获取数据
    getPagevViews(){
        let url = '/getpageviews?createid=' +  cookie.load('userInfo').userid
        if ( this.state.pagename )  url += '&pagename=' +  this.state.pagename
        httpRequest.get(url).then(res=>{
          
            if (res.status === 200) {
                this.setState({
                    tableData:  res.data
                })
            }
        })
    }
  
   
    inputPageName(event){
        this.setState({
            pagename:  event.target.value 
        })
    }
    render() { 
        return (    
            <div style={ {overflow: 'auto', height: '100%'}}>
                <div className="header"> 
                    <Row>
                        <Col span={4} >  <Input placeholder="名称"  onChange={ (e)=> this.inputPageName(e) } />   </Col>
                        <Button style={{ marginLeft: '12px'}} onClick={()=>   this.getPagevViews() }>查询</Button>
                        <Button style={{ marginLeft: '12px'}}  type="primary" onClick={()=>   this.getPagevViews() }>创建</Button>
                    </Row>
                </div>
                <div style={{ marginTop: '12px' }}>
                    <Table columns={ this.state.tableColumns}  dataSource={ this.state.tableData  }  scroll={{ y: 600 }} rowKey={record => record.pageid } />
                </div> 
            </div>
            )
    }

}

export default Vvwebpages