const fileUtil = require('../utils/fileUtil/index')
const  pageviewDao = require('./pageviewDao')
const unid = require('uuid')
const path = require('path')
const rootDir  =  path.join(__dirname,'../components' ) 

// 保存文件
const saveFile = function(postBody ) {
    let pageid =  unid.v4()
    let fileName = 'index'
    postBody['pageid'] = pageid
    let filePath = rootDir + '/' + pageid
    return new Promise(function(resovle, reject){

        fileUtil.createDir(filePath).then(function(res){
            let htmlPro = fileUtil.writeFile(filePath + '\\' + fileName + '.html', postBody.html)
            let cssPro = fileUtil.writeFile(filePath + '\\' + fileName + '.css', postBody.css)
            Promise.all([htmlPro, cssPro]).then(function(){
              
                // 记录数据库
                pageviewDao.onCreatePage(postBody)
                resovle()
               
            }).catch(function(){
                // console.log('保存文件失败')
                reject()
            })

        }).catch(function(err){
            // console.log('保存文件失败a')
            reject()
        })
    })
    
}

// 修改数据
const updateFile = function(postBody ) {
    let fileName = 'index'
    let filePath = rootDir + '/' + postBody.pageid
    return new Promise(function(resovle, reject){


        //  修改
        pageviewDao.updateName(postBody).then((updateitem)=>{

            fileUtil.createDir(filePath).then(function(res){
                let htmlPro = fileUtil.writeFile(filePath + '\\' + fileName + '.html', postBody.html)
                let cssPro = fileUtil.writeFile(filePath + '\\' + fileName + '.css', postBody.css)
                Promise.all([htmlPro, cssPro]).then(function(){
                  
                    
                    resovle()
                   
                }).catch(function(){
                    // console.log('保存文件失败')
                    reject()
                })
    
            }).catch(function(err){
                // console.log('保存文件失败a')
                reject()
            })


        }) 

        
    })
    
}


// 显示

const viewPage  = function(path){
    return new  Promise(function(resolve, reject){
        let filePath = rootDir + '/' + path
        // console.log(path, fileName)
        let htmlPro = fileUtil.readFile(filePath + '\\index.html')
        let cssPro = fileUtil.readFile(filePath + '\\index.css')
        Promise.all([htmlPro, cssPro]).then(function(res){
            // console.log('读取文件成功')
            resolve(res)
        }).catch(function(){
            // console.log('读取文件失败')
            reject()
        })

    })
}





module.exports = {
    saveFile,
    viewPage,
    updateFile
}