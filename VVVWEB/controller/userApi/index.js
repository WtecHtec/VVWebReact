const userDao = require('../../dao/userDao')
const loginrecordDao = require('../../dao/loginrecordDao')
const token = require('../../utils/jwt/jwt.js')

module.exports = function(app) {

    app.post('/signUp', function(req, res){
        console.log("ip = " + req.ip);
        userDao.onSelectUserByName(req.body).then((selectrel)=>{
            if (selectrel.length > 0) {
                res.status(201).send('邮箱已被占用')
                return
            }
            userDao.onCreateUser(req.body).then((result)=>{
                res.status(200).send(result)
            }).catch(err=>{
                res.send(err)
            })
        }).catch(err=>{
            res.send(err)
        })
    })


    app.post('/signIn', function(req, res){
        userDao.onSelectOnlyUser(req.body).then((result)=>{
            if (result.length === 0 ||  result.length >= 2) {
                res.status(201).send(result)
            } else {
                console.log('-------- signIn ----')
                let rel = result[0]
                let authorization =  token.encrypt( {data:rel.userid })
                rel['authorization'] =  authorization
                console.log(rel)
                let recordParams = {
                    userid: rel.userid,
                    cip: req.body.cip,
                    cname: req.body.cname
                }
                loginrecordDao.onCreateRecord(recordParams).then(()=>{
                    res.status(200).send(rel)
                }).catch(()=>{
                    res.status(200).send(rel)
                })
                
                
            }
            
        }).catch(err=>{
            res.send(err)
        })
        
    })



}





