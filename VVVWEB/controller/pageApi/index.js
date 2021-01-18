const  pageFileDao = require('../../dao/pageFileDao')
const querystring = require('querystring');
const url = require('url')
module.exports = function(app){
     // 保存
     app.post('/savePage', function(req, res) {
        console.log('savePage',req.body)
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


    
    // 查看
    app.get('/ViewPage', function(req, res) {
        let urlObj = url.parse(req.url)
       
        let getBody = querystring.parse(urlObj.query)
        // console.log(getBody)
        pageFileDao.viewPage(getBody.view).then( function(result){

            // console.log(result)
            res.render('viewPage.html', {
                pathname:'View',
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