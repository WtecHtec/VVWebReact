const  pageFileDao = require('../../dao/pageFileDao')
const viewpreviewDao = require('../../dao/viewpreviewDao')
const  pageviewDao = require('../../dao/pageviewDao')


const querystring = require('querystring');
const url = require('url')
module.exports = function(app){
     // 保存
     app.post('/savePage', function(req, res) {
        // console.log('savePage',req.body)
        let postBody =  req.body
     
        pageFileDao.saveFile(postBody).then(function(){
            // console.log('resolve')
           return  res.json({
                code: 200
            })
        }).catch(function(err){
            // console.log('reject')
            return  res.json({
                code: 201
            })
        })
    })

    // 获取修改数据
    app.get('/geteditviewpage', function(req, res) {
        getPageData(req, res, 'edit')
    })


    app.post('/editviewpage', function(req, res) {
        let postBody =  req.body
        pageFileDao.updateFile(postBody).then(function(){
            // console.log('resolve')
           return  res.json({
                code: 200
            })
        }).catch(function(err){
            // console.log('reject')
            return  res.json({
                code: 201
            })
        })
    })

    
    function getPageData(req, res, type){
        let urlObj = url.parse(req.url)
       
        let getBody = querystring.parse(urlObj.query)

        pageviewDao.onSelectById(getBody.view).then((onlyItem)=>{
            //  console.log('pageviewDao:', onlyItem)
            if (onlyItem && onlyItem.length > 0) {

                pageFileDao.viewPage(getBody.view).then( function(result){
                       
                    // 修改
                    if (type === 'edit') {
                        res.status(200).json({
                            pageid: onlyItem[0].pageid,
                            pathname: onlyItem[0].pagename,
                            html :  result[0],
                            css :  result[1]
                        })
                        return
                    }
                    
                    //  预览
                    res.render('viewPage.html', {
                        pathname: onlyItem[0].pagename,
                        html :  result[0],
                        htmlDom: {
                            css :  result[1],
                        }
                    })
                    let vparams = {
                        pageid: getBody.view,
                        previewip:'',
                        previewplace:''
                    }
                    viewpreviewDao.onCreateViewPer( vparams)



                }).catch(function(err){
                    res.json({
                        code: 201
                    })
                })

            } else {
                res.json({
                    code: 201
                })
            }
            
        })
        
    }

    // 查看
    app.get('/ViewPage', function(req, res) {
        getPageData(req, res, 'preview')
    })

}