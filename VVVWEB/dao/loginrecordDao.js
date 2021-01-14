
const mysqlConnection = require('../utils/mysql/mysqlconnect')

// 新增登陆记录
const  onCreateRecord = function(params){
    return new Promise(function(resolve, reject){
        
        let  addSql = 'INSERT INTO loginrecord(userid,loginip,loginplace,logintime) VALUES(?,?,?,?)';
        let  addSqlParams = [params.userid, params.cip,params.cname,new Date()];
        //增
        mysqlConnection.query(addSql,addSqlParams,function (err, result) {
                if(err){
                console.log('[INSERT ERROR] - ',err.message);
                reject(err)
                return;
                }        
        
            console.log('--------------------------INSERT----------------------------');
            //console.log('INSERT ID:',result.insertId);        
            console.log('INSERT ID:',result);        
            console.log('-----------------------------------------------------------------\n\n');  
            resolve(result)
        });

    })
}


// 新增登陆记录
const  onSelectRecordByUserId = function(params){
    return new Promise(function(resolve, reject){
        
        let  addSql = 'SELECT userid,loginip,loginplace,DATE_FORMAT(logintime,\'%Y-%m-%d %H:%i:%s\') AS logintime FROM loginrecord WHERE  userid=? ORDER BY  logintime  DESC';
        let  addSqlParams = [params.userid];
        //增
        mysqlConnection.query(addSql,addSqlParams,function (err, result) {
                if(err){
                console.log('[INSERT ERROR] - ',err.message);
                reject(err)
                return;
                }        
        
            console.log('--------------------------INSERT----------------------------');
            //console.log('INSERT ID:',result.insertId);        
            console.log('INSERT ID:',result);        
            console.log('-----------------------------------------------------------------\n\n');  
            resolve(result)
        });

    })
}


module.exports = {
    onCreateRecord,
    onSelectRecordByUserId
}