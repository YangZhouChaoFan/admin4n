/* 
* @Author: chenhao
* @Date:   2015-06-11 11:25:04
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-02 13:11:28
*/

var db = require('../database.js');
var userModel = require('../model/userModel.js');
var req2Sql = require('../util/req2Sql.js');

//查询用户
exports.query = function(data, callback) {
    var sql = userModel.query;
    req2Sql.getReqSqlByQeury(data, function(reqSql){
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

//新增用户
exports.insert = function(data, callback) {
    var sql = userModel.insert;
    req2Sql.getReqSqlByInsert(data, function(reqSql){
        sql += reqSql;
        console.log("新增用户: " + sql);
        // get a connection from the pool
        db.mysqlPool.getConnection(function(err, connection) {
            if (err) {
                callback(true);
                connection.release();
                return;
            }
            // make the query
            connection.query(sql, function(err) {
                if (err) {
                    callback(true);
                    return;
                }
                callback(false);
                connection.release();
            });
        });
    });
};

//修改用户
exports.update = function(data, callback) {
   var sql = userModel.update;
    req2Sql.getReqSqlByUpdate(data, function(reqSql){
        sql += reqSql;
        sql += " WHERE " + userModel.pk + " = " + data[userModel.pk];
        console.log("修改用户: " + sql);
        // get a connection from the pool
        db.mysqlPool.getConnection(function(err, connection) {
            if (err) {
                callback(true);
                connection.release();
                return;
            }
            // make the query
            connection.query(sql, function(err) {
                if (err) {
                    callback(true);
                    return;
                }
                callback(false);
                connection.release();
            });
        });
    });
};

//删除用户
exports.delete = function(data, callback) {
    var sql = userModel.delete;
    req2Sql.getReqSqlByDelete(data, function(reqSql){
        sql += reqSql;
        console.log("删除用户: " + sql);
        db.mysqlPool.getConnection(function(err, connection) {
            if (err) {
                callback(true);
                connection.release();
                return;
            }
            // make the query
            connection.query(sql, function(err) {
                if (err) {
                    callback(true);
                    return;
                }
                callback(false);
                connection.release();
            });
        });
    });
};