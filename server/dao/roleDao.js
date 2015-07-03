/* 
* @Author: chenhao
* @Date:   2015-07-03 13:52:41
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-03 14:05:57
*/

'use strict';

var db = require('../database.js');
var roleModel = require('../model/roleModel.js');
var req2Sql = require('../util/req2Sql.js');

//查询角色
exports.query = function(data, callback) {
    var sql = roleModel.query;
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

//新增角色
exports.insert = function(data, callback) {
    var sql = roleModel.insert;
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

//修改角色
exports.update = function(data, callback) {
    var sql = roleModel.update;
    req2Sql.getReqSqlByUpdate(data, function(reqSql){
        sql += reqSql;
        sql += " WHERE " + roleModel.pk + " = " + data[roleModel.pk];
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

//删除角色
exports.delete = function(data, callback) {
    var sql = roleModel.delete;
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