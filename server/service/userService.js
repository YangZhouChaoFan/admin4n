/* 
* @Author: chenhao
* @Date:   2015-06-09 13:07:55
* @Last Modified by:   chenhao
* @Last Modified time: 2015-06-11 14:06:41
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