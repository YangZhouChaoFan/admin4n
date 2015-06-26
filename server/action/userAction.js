/* 
* @Author: chenhao
* @Date:   2015-06-09 12:51:03
* @Last Modified by:   chenhao
* @Last Modified time: 2015-06-17 10:03:34
*/

var express = require('express');
var userService = require('../service/userService.js');
var router = express.Router();

//查询用户
router.post("/user/query", function(req, res){
    userService.query(null, function(err, results){
        if(err){
            res.json({msg: '查询失败'});
            return;
        }
        res.json(results);
    });
});

//新增用户
router.post("/user/insert", function(req, res){

    res.json();
});

//更新用户
router.post("/user/update", function(req, res){
    
    res.json();
});

//删除用户
router.post("/user/delete", function(req, res){
    
    res.json();
});

module.exports = router;