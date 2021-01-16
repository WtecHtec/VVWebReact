const mysqlConnection = require('../utils/mysql/mysqlconnect')
//  统计页面浏览
const  onGetPreViewDatas = function(params){
    return new Promise(function(resolve, reject){
        let  sql = `SELECT pg.pagename, COUNT(1) as pvvalue , DATE_FORMAT(pv.previewtime,'%Y-%m-%d') as previewtime   FROM viewpreview pv LEFT JOIN  pageview pg ON pg.pageid = pv.pageid  
        where ( date(pv.previewtime) between date_sub(?, interval 7 day)  and ? ) and  pg.createid = ? GROUP BY pv.previewtime`;
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

module.exports = {
    onGetPreViewDatas
}