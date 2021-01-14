const mysqlConnection = require('../utils/mysql/mysqlconnect')
const unid = require('uuid')
const md5 = require('md5-node');
// 新增用户
const  onCreateUser = function(params){
    return new Promise(function(resolve, reject){
        
        let  addSql = 'INSERT INTO user(userid,username,email,password,createtime) VALUES(?,?,?,?,?)';
        let  addSqlParams = [unid.v4(), params.username,params.email, md5(params.password), new Date()];
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

// 更新用户
const  onUpdateUserById = function(params){
    return new Promise(function(resolve, reject){
        
        let  updateSql = 'UPDATE user SET username = ?,updatetime =? WHERE userid = ?';
        let  updateSqlParams = [params.username,params.userid,  new Date(), md5(params.password)];
        //更新
        mysqlConnection.query(updateSql,updateSqlParams,function (err, result) {
                if(err){
                    console.log('[INSERT ERROR] - ',err.message);
                    reject(err)
                    return;
                }        
        
            console.log('--------------------------UPDATE----------------------------');
            //console.log('INSERT ID:',result.insertId);        
            console.log('UPDATE ID:',result);        
            console.log('-----------------------------------------------------------------\n\n');  
            resolve(result)
        });
 

    })
}


// 登陆 
const  onSelectOnlyUser = function(params){
    return new Promise(function(resolve, reject){
        
        let  selectSql = 'SELECT userid,username,email,DATE_FORMAT(createtime,\'%Y-%m-%d %h:%i:%s\') AS createtime FROM user WHERE email = ? AND password = ? ';
        let  selectSqlParams = [params.email, md5(params.password)];
        //更新
        mysqlConnection.query(selectSql,selectSqlParams,function (err, result) {
                if(err){
                    console.log('[INSERT ERROR] - ',err.message);
                    reject(err)
                    return;
                }        
        
            console.log('--------------------------SELECT----------------------------');
            //console.log('INSERT ID:',result.insertId);        
            console.log('SELECT ID:',result);        
            console.log('-----------------------------------------------------------------\n\n');  
            resolve(result)
        });
 

    })
}


// 检测用户是否已存在
const  onSelectUserByName = function(params){
    return new Promise(function(resolve, reject){
        
        let  selectSql = 'SELECT * FROM user WHERE email = ?';
        let  selectSqlParams = [params.email];
        //更新
        mysqlConnection.query(selectSql,selectSqlParams,function (err, result) {
                if(err){
                    console.log('[INSERT ERROR] - ',err.message);
                    reject(err)
                    return;
                }        
        
            console.log('--------------------------SELECT----------------------------');
            //console.log('INSERT ID:',result.insertId);        
            console.log('SELECT ID:',result);        
            console.log('-----------------------------------------------------------------\n\n');  
            resolve(result)
        });
 

    })
}


module.exports ={
    onCreateUser,
    onUpdateUserById,
    onSelectOnlyUser,
    onSelectUserByName
}