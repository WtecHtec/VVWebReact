import React from 'react';

import httpRequest from '../../uitls/axios/axios'
import grapesjs from 'grapesjs';
import StyleManager from '@/uitls/grapesview/grapesview-styleMange'
import BlockManager from '@/uitls/grapesview/BlockManager'
import ComponentManager from '@/uitls/grapesview/ComponentsManager'
import { Modal  , Input  } from 'antd';
import { SwapLeftOutlined  } from '@ant-design/icons';
import cookie from 'react-cookies'

class Grapesview extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            editData: null,
            editname:'',
            editor: null,
            isModalVisible: false
        }
    }
   
    componentDidMount(){
        if ( !cookie.load('userInfo')) return
        if (this.props.location.state) {
            this.state.editData =  this.props.location.state.editData
            this.state.editname = this.state.editData.pathname
        }
      
        // console.log('componentDidMount',  this.state.editData )
        this.initEditor()
    }

    // 初始化编辑器
    initEditor(){
        // console.log(StyleManager)
        this.state.editor = grapesjs.init({
            showOffsets: 1,
            noticeOnUnload: 0,
            container: '#gjs',
            height: '100%',
            fromElement: this.state.editData?false : true,
            components:  this.state.editData?  this.state.editData.html : '',
            style:  this.state.editData?  this.state.editData.css : '',
            storageManager: { autoload: false },
            styleManager : StyleManager,
            plugins: [ ]
        })


        this.state.editor.DomComponents.addType('link', {
            model: {
              defaults: {
                traits: [
                  {
                    type: 'href-next',
                    name: 'href',
                    label: 'href',
                  },
                ]
              }
            }
          });

        this.createSaveBtn()
        ComponentManager(this.state.editor)
        BlockManager(this.state.editor)

    }

    // 添加保存按钮
    createSaveBtn(){
        let self = this
        const panelManager =  this.state.editor.Panels;

        panelManager.addButton('options',{
            id: 'saveButton',
            className: 'fa fa-save',
            command: 'saveCommand',
            attributes: { title: '保存'},
        
       });
      
       this.state.editor.Commands.add('saveCommand', {
            run(editor, sender) {
                let htmlData = editor.getHtml()
                if ( !htmlData ) {
                    Modal.warning({
                        title: '页面不能没有内容！',
                        getContainer(){
                            return document.getElementById('gjs')
                        },
                      });
                    return
                }
                self.savePageView()    
            }
        });

    }

    savePageView(){
        this.setState({   isModalVisible: true  })
    }

    handleOk(){

        if ( !this.state.editname ) {
            Modal.warning({
                title: '名称不能为空！',
                getContainer(){
                    return document.getElementById('gjs')
                },
              });
            return
        }
        if ( this.state.editname.length >= 7 ) {
            Modal.warning({
                title: '名称不能超过6个字符！',
                getContainer(){
                    return document.getElementById('gjs')
                },
              });
            return
        }


       let params = {
           pagename:this.state.editname,
           createid:  cookie.load('userInfo').userid,
           html: this.state.editor.getHtml(),
           css:  this.state.editor.getCss()
       
        }
        let url = '/savePage'
        // 修改
        if ( this.state.editData) {
            params['pageid'] = this.state.editData.pageid
            url = '/editviewpage'
            
        }


       httpRequest.post(url,params).then(res=>{
           if (res.status === 200 ) {
            this.props.history.goBack()
           } else {
                Modal.warning({
                    title: '保存失败！',
                    getContainer(){
                        return document.getElementById('gjs')
                    },
                });
           }
       }).catch(err=>{
            Modal.warning({
                title: '保存失败！',
                getContainer(){
                    return document.getElementById('gjs')
                },
            });

       })
    }
  
    componentWillUnmount(){
        if (this.state.editor) this.state.editor.destroy()
    }
    inputPageName(event, key){
        let inputObj = {}
        inputObj[key] = event.target.value 
        this.setState(inputObj)
      
    }

    render(){
        return (
            <div style={{height: 'calc(100% - 50px)'}}> 
                <div className="header-text " > <SwapLeftOutlined  onClick={()=> this.props.history.goBack() }  style={{ 'color': '#1890ff' }}   /> 创建页面 </div>
                <div id="gjs">
                    <h1>Hello World Component VVVWEBVIEW!</h1>
                </div>

                <Modal title="保存" visible={ this.state.isModalVisible } getContainer={ ()=>  document.getElementById('gjs')  }  onOk={()=> this.handleOk() } onCancel={()=> this.setState({isModalVisible: false }) }>
                    <Input placeholder="名称"  onChange={ (e)=> this.inputPageName(e,'editname') }  value={ this.state.editname }/> 
                </Modal>
            </div>
        )
    }
    
}

export default Grapesview