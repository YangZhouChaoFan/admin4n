/* 
* @Author: chenhao
* @Date:   2015-06-11 11:25:04
* @Last Modified by:   chenhao
* @Last Modified time: 2015-06-25 12:45:30
*/

var db = require('../database.js');
var userModel = require('../model/userModel.js');
var req2Sql = require('../util/req2Sql.js');

//查询用户
exports.query = function(data, callback) {
    var sql = userModel.query;
    req2Sql.getReqSql(data, function(reqSql){
        sql += reqSql;
        console.log("查询用户: " + sql);
        // get a connection from the pool
        db.mysqlPool.getConnection(function(err, connection) {
            if (err) {
                callback(true);
                connection.release();
                return;
            }
            // make the query
            connection.query(sql, function(err, results) {
                if (err) {
                    callback(true);
                    return;
                }
                callback(false, results);
                connection.release();
            });
        });
    });
};
