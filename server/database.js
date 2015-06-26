/* 
* @Author: chenhao
* @Date:   2015-06-09 11:14:38
* @Last Modified by:   chenhao
* @Last Modified time: 2015-06-13 20:14:18
*/

var mysql = require('mysql');
var config = require('./config');
 
var mysqlPool = mysql.createPool(config.mysql_dev);

exports.mysqlPool = mysqlPool;