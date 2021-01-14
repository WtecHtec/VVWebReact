const  pageFileDao = require('../../dao/pageFileDao')
const querystring = require('querystring');
const url = require('url')
module.exports = function(app){
     // 保存
     app.post('/savePage', function(req, res) {
        console.log('savePage',req.body)
        let postBody =  req.body
     
        pageFileDao.saveFile(postBody.path, postBody.fileName, postBody.html, postBody.css).then(function(){
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


    
    // 查看
    app.get('/ViewPage', function(req, res) {
        let urlObj = url.parse(req.url)
       
        let getBody = querystring.parse(urlObj.query)
        pageFileDao.viewPage(getBody.path, getBody.fileName).then( function(result){

            // console.log(result)
            res.render('viewPage.html', {
                html :  result[0],
                htmlDom: {
                    css :  result[1],
                }
            })
        }).catch(function(err){
            res.json({
                code: 201
            })
        })
    })

}