const  pageviewDao = require('../../dao/pageviewDao')
const querystring = require('querystring');
const url = require('url')
const token = require('../../utils/jwt/jwt.js')
module.exports = function(app){

   app.get('/getpageviews', function(req, res){
        
        let urlObj = url.parse(req.url)
        let getBody = querystring.parse(urlObj.query)
        let userInfo = {}
        if (req.headers.authorization) {
           userInfo = token.decrypt( req.headers.authorization.split(' ')[1])
           console.log(userInfo)
        }
        
   
        pageviewDao.selectPageView(getBody).then(result=>{
            res.status(200).json({data:result,maxcount: result.length >= userInfo.token.maxcount} )
        }).catch(err=>{
            res.send(err)
        })

   })   

   app.delete('/delpageview',function(req,res){
        let urlObj = url.parse(req.url)
        let getBody = querystring.parse(urlObj.query)
        console.log(getBody)
        pageviewDao.delPageView(getBody).then(result=>{
            res.status(200).send(result)
        }).catch(err=>{
            res.send(err)
        })
   })
  
   app.post('/updatename',function(req,res){
        pageviewDao.updateName(req.body).then(result=>{
            res.status(200).send(result)
        }).catch(err=>{
            res.send(err)
        })
    })




}