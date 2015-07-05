/* 
* @Author: chenhao
* @Date:   2015-07-03 13:47:06
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-05 19:00:22
*/

'use strict';
var express = require('express');
var roleService = require('../service/roleService.js');
var router = express.Router();

//查询用户角色
router.post("/role/queryByUserId", function(req, res){
    var data = req.body;
    roleService.queryByUserId(data, function(err, results){
        if(err){
            res.json({msg: '查询失败'});
            return;
        }
        res.json(results);
    });
});

//更新用户角色
router.post("/role/updateByUserId", function(req, res){
    var data = req.body;
    roleService.updateByUserId(data, function(err){
        if(err){
            res.json({msg: '修改失败'});
            return;
        }
        res.json({msg: '修改成功'});
    });
});

//查询角色
router.post("/role/query", function(req, res){
    var data = req.body;
    roleService.query(data, function(err, results){
        if(err){
            res.json({msg: '查询失败'});
            return;
        }
        res.json(results);
    });
});

//新增角色
router.post("/role/insert", function(req, res){
    var data = req.body;
    roleService.insert(data, function(err){
        if(err){
            res.json({msg: '新增失败'});
            return;
        }
        res.json({msg: '新增成功'});
    });
});

//更新角色
router.post("/role/update", function(req, res){
    var data = req.body;
    roleService.update(data, function(err){
        if(err){
            res.json({msg: '修改失败'});
            return;
        }
        res.json({msg: '修改成功'});
    });
});

//删除角色
router.post("/role/delete", function(req, res){
    var data = req.body;
    roleService.delete(data, function(err){
        if(err){
            res.json({msg: '删除失败'});
            return;
        }
        res.json({msg: '删除成功'});
    });
});

module.exports = router;