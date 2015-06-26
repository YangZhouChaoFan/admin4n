/* 
* @Author: chenhao
* @Date:   2015-06-09 13:07:55
* @Last Modified by:   chenhao
* @Last Modified time: 2015-06-25 16:06:59
*/
var menuDao = require('../dao/menuDao.js');

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