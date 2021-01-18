import React from 'react';

import { Input, Row, Col ,Button ,Table ,Popconfirm,Modal,message   } from 'antd';
import httpRequest from '../../uitls/axios/axios'
import cookie from 'react-cookies'
import {  EditOutlined } from '@ant-design/icons';

class  Vvwebpages extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            curentPageInfo: '',
            tableColumns: [
                {
                    title: '页面名称',
                    dataIndex: 'pagename',
                    key: 'pagename',
                    align: 'center',
                    render: (self, record) => {
                        return (
                            <div >
                                <EditOutlined style={{ color:'#1890ff',cursor:'pointer'}}  onClick={ ()=>  this.openEditNameModal(record) } />
                                <span> {  record.pagename } </span>  
                            </div>
                        )
                    }
                    
                  
                },
                {
                    title: '创建时间',
                    key: 'createtime',
                    dataIndex: 'createtime',
                    align: 'center',
                    sorter: (a, b) => { 
                            if ( !a ) return 
                            return new Date(a.createtime).getTime() -   new Date(b.createtime).getTime()
                    } 
               
                },
                {
                    title: '操作',
                    key: "action",
                    align: 'center',
                    render: ( record) => {
                           return (
                               <div>
                                    <Popconfirm title="是否删除？" okText="确定" cancelText="取消" onConfirm={()=> this.onDelData( record) }>
                                        <a>删除</a>
                                    </Popconfirm>
                                    <a onClick={()=>  this.onCreatePage(record, 'edit')}> 修改 </a>
                                    <a onClick={ ()=> this.previewPage( record.pageid ) }> 预览 </a>
                               </div>
                           )
                    }
                },
            ],
            editname:'',
            pagename: '',
            tableData: []
        }
    }
   
    componentDidMount(){ 
        this.getPagevViews() 
    }

  
  

    onCreatePage(record,type) {
        if (type) {
            // this.props.history.push({ pathname: "/PutForwardSubmit", state: { vcode } });
            this.getEditPageData(record)
            return
        }
        this.props.history.push('/main/grapesview' ); 
    }
    
    getEditPageData(record){
        httpRequest.get('/editviewpage?view=' +record.pageid).then(res=>{
            if (res.status === 200) {
                // console.log('getEditPageData', res)
                this.props.history.push({ pathname: "/main/grapesview", state: { editData: res.data } })
            }
        })

    }

    previewPage(pageid){
        window.open(httpRequest.defaults.baseURL +'ViewPage?view=' +pageid )
    }
    //打开修改名称窗口
    openEditNameModal(record){
        this.setState(
            {
                isModalVisible: true,
                curentPageInfo: record,
                editname: record.pagename
            }
        )
    }
    
    handleOk(){
        console.log('修改', this.state.editname )
        if ( !this.state.editname ) {
            message.warning('名称不能为空！');
            return
        }
        if ( this.state.editname.length >= 7 ) {
            message.warning('名称不能超过6个字符！');
            return
        }
        let params = {
            pageid: this.state.curentPageInfo.pageid,
            pagename: this.state.editname
        }
        httpRequest.post('/updatename',params).then(res=>{
            if (res.status === 200) {
                this.state.curentPageInfo.pagename =  this.state.editname
                this.setState({isModalVisible: false })
                message.success('名称修改成功！');
            }
        })

    }
    // 删除
    onDelData(record) {
        // console.log('onDelData this:',self, record)
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
  
   
    inputPageName(event, key){
        let inputObj = {}
        inputObj[key] = event.target.value 
        this.setState(inputObj)
      
    }
    render() { 
        return (    
            <div style={ {overflow: 'auto', height: '100%'}}>
                <div className="header"> 
                    <Row>
                        <Col span={4} >  <Input placeholder="名称"  onChange={ (e)=> this.inputPageName(e,'pagename') } />   </Col>
                        <Button style={{ marginLeft: '12px'}} onClick={()=>   this.getPagevViews() }>查询</Button>
                        <Button style={{ marginLeft: '12px'}}  type="primary" onClick={()=>  this.onCreatePage() }>创建</Button>
                    </Row>
                </div>
                <div style={{ marginTop: '12px' }}>
                    <Table columns={ this.state.tableColumns}  dataSource={ this.state.tableData  }  scroll={{ y: 600 }} rowKey={record =>  record.pageid  } />
                </div> 

                <Modal title="修改名称" visible={ this.state.isModalVisible } onOk={()=> this.handleOk() } onCancel={()=> this.setState({isModalVisible: false }) }>
                    <Input placeholder="名称"  onChange={ (e)=> this.inputPageName(e,'editname') }  value={ this.state.editname }/> 
                </Modal>
            </div>
            )
    }

}

export default Vvwebpages