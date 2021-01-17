import React from 'react';

import { Input, Row, Col ,Button ,Table   } from 'antd';
import httpRequest from '../../uitls/axios/axios'
import cookie from 'react-cookies'

    const columns = [
        {
        title: '页面名称',
        dataIndex: 'name',
       
        },
        {
        title: '创建时间',
        dataIndex: 'age',
       
        },
        {
        title: '操作',
        dataIndex: 'address',
        },
    ];


    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }

class  Vvwebpages extends React.Component {
    
    constructor(props) {
        super(props);
        // this.state = {
         
        // }
    }
    render() { 
        return (    
            <div style={ {overflow: 'auto', height: '100%'}}>
                <div className="header"> 
                    <Row>
                        <Col span={4} >  <Input placeholder="名称" />   </Col>
                        <Button style={{ marginLeft: '12px'}}>查询</Button>
                    </Row>
                </div>
                <div style={{ marginTop: '12px' }}>
                    <Table columns={columns}  dataSource={data}  scroll={{ y: 600 }} />
                </div> 
            </div>
            )
    }

}

export default Vvwebpages