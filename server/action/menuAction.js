/* 
 * @Author: chenhao
 * @Date:   2015-06-11 14:33:36
 * @Last Modified by:   chenhao
 * @Last Modified time: 2015-06-25 16:06:32
 */
var express = require('express');
var menuService = require('../service/menuService.js');
var router = express.Router();

//查询菜单
router.post("/menu/query", function(req, res) {
    var data = {userId: req.body.userId};
    menuService.query(data, function(err, results) {
        if (err) {
            return;
        }        
        res.json(results);
    });
});

module.exports = router;