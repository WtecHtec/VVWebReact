
const loginrecordDao = require('../../dao/loginrecordDao')
const viewpreviewDao = require('../../dao/viewpreviewDao')
const pageviewDao = require('../../dao/pageviewDao')

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
           
            if (result.length === 0) {
                
                pageviewDao.selectPageView({createid: query.userid}).then(resData=>{
                    if (resData.length > 0) {
                        let dataRes = []
                        resData.forEach((item)=>{
                            dataRes.push({
                                pagename: item.pagename,
                                pvvalue:0,
                                previewtime:    query.curDate
                            })
                        })
                        res.send(dataRes) 
                    } else {
                        res.send(resData) 
                    }
                })
                return
            }
            res.send(result) 
        }).catch((err)=>{
            res.send(err) 
        })
        
    })

}