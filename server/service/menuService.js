/* 
* @Author: chenhao
* @Date:   2015-06-09 13:07:55
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-03 10:53:44
*/
var menuDao = require('../dao/menuDao.js');

//查询菜单
exports.queryByUserId = function(data, callback){
    menuDao.queryByUserId(data, function(err, results){
        if(err){
            callback(true);
            return;
        }
        callback(false, results);
    });
};

//查询菜单
exports.query = function(data, callback){
    menuDao.query(data, function(err, results){
        if(err){
            callback(true);
            return;
        }
        callback(false, results);
    });
};

//新增菜单
exports.insert = function(data, callback){
    menuDao.insert(data, function(err){
        if(err){
            callback(true);
            return;
        }
        callback(false);
    });
};

//修改菜单
exports.update = function(data, callback){
    menuDao.update(data, function(err){
        if(err){
            callback(true);
            return;
        }
        callback(false);
    });
};

//修改菜单
exports.delete = function(data, callback){
    menuDao.delete(data, function(err){
        if(err){
            callback(true);
            return;
        }
        callback(false);
    });
};