/* 
* @Author: chenhao
* @Date:   2015-06-11 11:25:04
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-01 10:19:34
*/

var db = require('../database.js');
var menuModel = require('../model/menuModel.js');
var req2Sql = require('../util/req2Sql.js');

//查询用户
exports.query = function(data, callback) {
    var sql = menuModel.query;
    req2Sql.getReqSqlByQeury(data, function(reqSql){
        sql += reqSql;
        console.log("查询菜单: " + sql);
        // get a connection from the pool
        db.mysqlPool.getConnection(function(err, connection) {
            if (err) {
                connection.release();
                callback(true);      
                return;
            }
            // make the query
            connection.query(sql, function(err, results) {
                connection.release();
                if (err) {
                    callback(true);
                    return;
                }
                callback(false, results);
            });
        });
    });
};
