const  pageviewDao = require('../../dao/pageviewDao')
const querystring = require('querystring');
const url = require('url')

module.exports = function(app){

   app.get('/getpageviews', function(req, res){
        
        let urlObj = url.parse(req.url)
        let getBody = querystring.parse(urlObj.query)
        pageviewDao.selectPageView(getBody).then(result=>{
            res.status(200).send(result)
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