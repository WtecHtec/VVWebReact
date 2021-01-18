const mysqlConnection = require('../utils/mysql/mysqlconnect')
//  统计页面浏览
const  onGetPreViewDatas = function(params){
    return new Promise(function(resolve, reject){
        let  sql = `SELECT pg.pagename, COUNT(1) as pvvalue , DATE_FORMAT(pv.previewtime,'%Y-%m-%d') as previewtime   FROM viewpreview pv LEFT JOIN  pageview pg ON pg.pageid = pv.pageid  
        where ( date(pv.previewtime) between date_sub(?, interval 7 day)  and ? ) AND pg.del = 0  and  pg.createid = ? GROUP BY pv.previewtime`;
        let  sqlParams = [params.curDate,params.curDate, params.userid];
        //增
        mysqlConnection.query(sql,sqlParams,function (err, result) {
                if(err){
                console.log('[INSERT ERROR] - ',err.message);
                reject(err)
                    return;
                }        
        
            console.log('--------------------------SELECT----------------------------');
              
            console.log('onGetPreViewDatas :',result);        
            console.log('-----------------------------------------------------------------\n\n');  
            resolve(result)
        });
    })

}


const onCreateViewPer= function(params){
    return new Promise(function(resolve, reject){
        
        let  addSql = 'INSERT INTO viewpreview(pageid,previewip,previewplace,previewtime) VALUES(?,?,?,?)';
        let  addSqlParams = [ params.pageid,params.previewip, params.previewplace, new Date()];
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
    onGetPreViewDatas,
    onCreateViewPer
}