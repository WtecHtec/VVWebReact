const mysqlConnection = require('../utils/mysql/mysqlconnect')



// 新增页面
const  onCreatePage = function(params){
    return new Promise(function(resolve, reject){
        
        let  addSql = 'INSERT INTO pageview(pageid,pagename,createid,createtime) VALUES(?,?,?,?)';
        let  addSqlParams = [params.pageid, params.pagename,params.createid, new Date()];
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

// 查询单个
const onSelectById = function(params) {
    return new Promise(function(resolve, reject){
        let  addSql = 'SELECT  pagename, pageid  FROM pageview WHERE del = 0 AND pageid = ?';
     
        let  addSqlParams = [ params ]
        //
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

// 查询所有
const selectPageView = function(params){
    // console.log('selectPageView',  params)
    return new Promise(function(resolve, reject){
        
        console.log(params)
        let  addSql = 'SELECT pageid, pagename, DATE_FORMAT(createtime,\'%Y-%m-%d %H:%i:%s\') as createtime  FROM pageview WHERE del = 0 AND createid = ?';
     
        let  addSqlParams = [ params.createid ];
        if ( params.pagename )   {
            addSql += 'AND pagename LIKE CONCAT(\'%\',?,\'%\')'
            addSqlParams.push(params.pagename) 
        }


        //
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

// 删除某一条
const delPageView = function(params){
    console.log('selectPageView',  params)
    return new Promise(function(resolve, reject){
        let  addSql = 'UPDATE pageview SET del= 1 WHERE pageid = ?';
        let  addSqlParams = [ params.pageid ];
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


const updateName = function(params){
    console.log('selectPageView',  params)
    return new Promise(function(resolve, reject){
        let  addSql = 'UPDATE pageview SET pagename = ?  WHERE pageid = ?';
        let  addSqlParams = [ params.pagename,  params.pageid ];
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



module.exports ={
    selectPageView,
    delPageView,
    updateName,
    onCreatePage,
    onSelectById
}