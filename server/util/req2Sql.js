/* 
* @Author: chenhao
* @Date:   2015-06-11 12:58:12
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-03 14:04:19
*/

exports.getReqSqlByQeury = function(data, callback){
    var sql = "";
    for(var key in data){
        sql += " and " + key + " = '" + data[key] + "' ";    
    }
    callback(sql);
};

exports.getReqSqlByInsert = function(data, callback){
    var sql = "";
    for(var key in data){
        if(sql.length == 0){
            sql += key + " = '" + data[key] + "' ";  
        }else{
            sql += " , " + key + " = '" + data[key] + "' ";  
        }
    }
    callback(sql);
};

exports.getReqSqlByUpdate = function(data, callback){
    var sql = "";
    for(var key in data){
        if(sql.length == 0){
            sql += key + " = '" + data[key] + "' ";  
        }else{
            sql += " , " + key + " = '" + data[key] + "' ";  
        }
    }
    callback(sql);
};

exports.getReqSqlByDelete = function(data, callback){
    var sql = "(";
    sql += data.toString();
    sql += ")";
    callback(sql);
};

