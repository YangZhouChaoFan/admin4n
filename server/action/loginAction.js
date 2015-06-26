/* 
* @Author: chenhao
* @Date:   2015-06-11 14:33:36
* @Last Modified by:   chenhao
* @Last Modified time: 2015-06-25 16:06:00
*/

var express = require('express');
var userService = require('../service/userService.js');
var router = express.Router();

//登录操作
router.post("/login", function(req, res){
    var data = {email: req.body.email, password: req.body.password};
    userService.query(data, function(err, results){
        if(err || results.length == 0){
            res.render("login");
            return;
        }
        req.session.user = results[0];
        res.redirect("/");
    });
});

module.exports = router;