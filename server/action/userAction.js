/* 
* @Author: chenhao
* @Date:   2015-06-09 12:51:03
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-05 18:41:04
*/

var express = require('express');
var userService = require('../service/userService.js');
var router = express.Router();

//查询用户
router.post("/user/query", function(req, res){
    var data = req.body;
    userService.query(data, function(err, results){
        if(err){
            res.json({msg: '查询失败'});
            return;
        }
        res.json(results);
    });
});

//新增用户
router.post("/user/insert", function(req, res){
    var data = req.body;
    userService.insert(data, function(err){
        if(err){
            res.json({msg: '新增失败'});
            return;
        }
        res.json({msg: '新增成功'});
    });
});

//更新用户
router.post("/user/update", function(req, res){
    var data = req.body;
    userService.update(data, function(err){
        if(err){
            res.json({msg: '修改失败'});
            return;
        }
        res.json({msg: '修改成功'});
    });
});

//删除用户
router.post("/user/delete", function(req, res){
    var data = req.body;
    userService.delete(data, function(err){
        if(err){
            res.json({msg: '删除失败'});
            return;
        }
        res.json({msg: '删除成功'});
    });
});

module.exports = router;