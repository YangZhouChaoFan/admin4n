/* 
* @Author: chenhao
* @Date:   2015-06-11 12:58:12
* @Last Modified by:   chenhao
* @Last Modified time: 2015-06-25 16:07:29
*/

exports.getReqSql = function(data, callback){
    var reqSql = "";
    for(var key in data){
        reqSql += " and " + key + " = '" + data[key] + "' ";    
    }
    callback(reqSql);
};