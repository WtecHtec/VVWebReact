const fileUtil = require('../utils/fileUtil/index')
const path = require('path')
const rootDir  =  path.join(__dirname,'../components' ) 

// 保存文件
const saveFile = function(path,fileName,html, css ) {
    let filePath = rootDir + '/' + path
    return new Promise(function(resovle, reject){

        fileUtil.createDir(filePath).then(function(res){
            let htmlPro = fileUtil.writeFile(filePath + '\\' + fileName + '.html', html)
            let cssPro = fileUtil.writeFile(filePath + '\\' + fileName + '.css', css)
            Promise.all([htmlPro, cssPro]).then(function(){
                // console.log('保存文件成功')
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


// 显示

const viewPage  = function(path, fileName){
    return new  Promise(function(resolve, reject){
        let filePath = rootDir + '/' + path
        // console.log(path, fileName)
        let htmlPro = fileUtil.readFile(filePath + '\\' + fileName + '.html')
        let cssPro = fileUtil.readFile(filePath + '\\' + fileName + '.css')
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
    viewPage
}