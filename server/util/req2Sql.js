/* 
* @Author: chenhao
* @Date:   2015-06-11 12:58:12
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-01 10:28:31
*/

exports.getReqSqlByQeury = function(data, callback){
    var reqSql = "";
    for(var key in data){
        reqSql += " and " + key + " = '" + data[key] + "' ";    
    }
    callback(reqSql);
};

exports.getReqSqlByDelete = function(data, callback){
    var reqSql = "";
    reqSql = data.toString();
    callback(reqSql);
};