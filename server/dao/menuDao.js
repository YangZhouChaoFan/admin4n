/* 
* @Author: chenhao
* @Date:   2015-06-11 11:25:04
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-06 11:34:14
*/

var db = require('../database.js');
var menuModel = require('../model/menuModel.js');
var req2Sql = require('../util/req2Sql.js');

//查询用户菜单
exports.queryByUserId = function(data, callback) {
    var sql = menuModel.queryByUserId;
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

//查询角色菜单
exports.queryByRoleId = function(data, callback) {
    var sql = menuModel.queryByRoleId;
    req2Sql.getReqSqlByQeury(data, function(reqSql){
        sql += reqSql;
        console.log("加载角色菜单: " + sql);
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
                    console.log(results);
                    callback(true);
                    return;
                }
                callback(false, results);
            });
        });
    });
};

//修改角色菜单
exports.updateByRoleId = function(data, callback) {
    console.log(data);
    var sql = menuModel.deleteByRoleId + data.roleId;
    console.log("清空角色菜单: " + sql);
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

            sql = menuModel.insertByRoleId;
            var flag = false; 
            for(var key in data.menu){
                if(data.menu[key]){
                    flag = true;
                    sql += '(';
                    sql += key + ',' + data.roleId;
                    sql += '),';
                }
            }
            sql = sql.substr(0, sql.length - 1);
            if(flag){
                console.log("新增角色菜单: " + sql);
                connection.query(sql, function(err){
                    if (err) {
                        callback(true);
                        return;
                    }
                    callback(false);
                    connection.release();
                });
            }else{
                callback(false);
                connection.release();
            }
        });
    });
};

//查询菜单
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

//新增菜单
exports.insert = function(data, callback) {
    var sql = menuModel.insert;
    req2Sql.getReqSqlByInsert(data, function(reqSql){
        sql += reqSql;
        console.log("新增菜单: " + sql);
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

//修改菜单
exports.update = function(data, callback) {
   var sql = menuModel.update;
    req2Sql.getReqSqlByUpdate(data, function(reqSql){
        sql += reqSql;
        sql += " WHERE " + menuModel.pk + " = " + data[menuModel.pk];
        console.log("修改菜单: " + sql);
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

//删除菜单
exports.delete = function(data, callback) {
    var sql = menuModel.delete;
    req2Sql.getReqSqlByDelete(data, function(reqSql){
        sql += reqSql;
        console.log("删除菜单: " + sql);
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