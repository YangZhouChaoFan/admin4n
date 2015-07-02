/* 
* @Author: chenhao
* @Date:   2015-06-09 13:07:55
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-02 10:19:57
*/
var userDao = require('../dao/userDao.js');

//查询用户
exports.query = function(data, callback){
    userDao.query(data, function(err, results){
        if(err){
            callback(true);
            return;
        }
        callback(false, results);
    });
};

//新增用户
exports.insert = function(data, callback){
    userDao.insert(data, function(err){
        if(err){
            callback(true);
            return;
        }
        callback(false);
    });
};

//修改用户
exports.update = function(data, callback){
    userDao.update(data, function(err){
        if(err){
            callback(true);
            return;
        }
        callback(false);
    });
};

//修改用户
exports.delete = function(data, callback){
    userDao.delete(data, function(err){
        if(err){
            callback(true);
            return;
        }
        callback(false);
    });
};