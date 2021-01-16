
const loginrecordDao = require('../../dao/loginrecordDao')
const viewpreviewDao = require('../../dao/viewpreviewDao')

module.exports = function(app) {
    app.get('/loginrecordlist', function(req, res){
        let query = req.query
        loginrecordDao.onSelectRecordByUserId(query).then((result)=>{
            res.send(result) 
        }).catch((err)=>{
            res.send(err) 
        })
        
    })

    app.get('/previewdatas', function(req, res){
        let query = req.query
        console.log(query)
        viewpreviewDao.onGetPreViewDatas(query).then((result)=>{
            res.send(result) 
        }).catch((err)=>{
            res.send(err) 
        })
        
    })

}