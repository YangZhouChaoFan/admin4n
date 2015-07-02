/* 
* @Author: chenhao
* @Date:   2015-06-11 12:58:12
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-02 10:10:55
*/

exports.getReqSqlByQeury = function(data, callback){
    var reqSql = "";
    for(var key in data){
        reqSql += " and " + key + " = '" + data[key] + "' ";    
    }
    callback(reqSql);
};

exports.getReqSqlByInsert = function(data, callback){
    var reqSql = "";
    for(var key in data){
        if(reqSql.length == 0){
            reqSql += key + " = '" + data[key] + "' ";  
        }else{
            reqSql += " , " + key + " = '" + data[key] + "' ";  
        }
    }
    callback(reqSql);
};

exports.getReqSqlByDelete = function(data, callback){
    var reqSql = "";
    reqSql = data.toString();
    callback(reqSql);
};

