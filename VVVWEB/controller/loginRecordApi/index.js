
const loginrecordDao = require('../../dao/loginrecordDao')

module.exports = function(app) {
    app.get('/loginrecordlist', function(req, res){
        let query = req.query
        loginrecordDao.onSelectRecordByUserId(query).then((result)=>{
            res.send(result) 
        }).catch((err)=>{
            res.send(err) 
        })
        
    })
}