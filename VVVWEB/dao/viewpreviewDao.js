const mysqlConnection = require('../utils/mysql/mysqlconnect')
// 新增用户
const  onGetPreViewDatas = function(params){
    return new Promise(function(resolve, reject){
        let  sql = `SELECT pg.pagename, COUNT(1) , pv.previewtime  FROM viewpreview pv LEFT JOIN  pageview pg ON pg.pageid = pv.pageid  
        where   date_sub(curdate(), interval 7 day) <= date(pv.previewtime) and  pg.createid = 'test1' GROUP BY pv.previewtime`;
        let  sqlParams = [unid.v4(), params.username,params.email, md5(params.password), new Date()];
        //增
        mysqlConnection.query(sql,sqlParams,function (err, result) {
                if(err){s
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
    onGetPreViewDatas
}