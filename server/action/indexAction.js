/* 
* @Author: chenhao
* @Date:   2015-06-09 12:51:03
* @Last Modified by:   chenhao
* @Last Modified time: 2015-06-17 16:10:31
*/

var express = require('express');
var router = express.Router();

/* GET / page. */
router.get('/', function(req, res, next) {
  if(!req.session.user){
    res.render("login");
    return;
  }
  res.locals.user = req.session.user;
  res.render('index');
});

module.exports = router;