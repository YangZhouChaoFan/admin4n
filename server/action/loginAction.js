/* 
* @Author: chenhao
* @Date:   2015-06-11 14:33:36
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-06 16:04:56
*/

var express = require('express');
var userService = require('../service/userService.js');
var router = express.Router();

//登录操作
router.post("/login", function(req, res){
    var data = {email: req.body.email, password: req.body.password};
    userService.query(data, function(err, results){
        if(err || results.length == 0){
            res.redirect("/login.html");
            return;
        }
        req.session.user = results[0];
        res.redirect("/");
    });
});

//登出操作
router.post("/logout", function(req, res){
    delete req.session.user;
    res.json({msg: "登出成功"});
});

module.exports = router;