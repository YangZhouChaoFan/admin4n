var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./server/action/indexAction');
var login = require('./server/action/loginAction');
var menu = require('./server/action/menuAction');
var user = require('./server/action/userAction');
var role = require('./server/action/roleAction');

var app = express();

// view engine setup 
app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'html');  

//更改ejs为html文件
//app.engine('.html', require('ejs').renderFile);
app.engine('.html', require('ejs').__express);

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/app/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  /*  genid: function(req) {
    return genuuid() // use UUIDs for session IDs 
  },*/
  secret: 'nodeCRM',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 300 * 1000 }
}));

app.use('/action', function (req, res, next) {
  var url = req.originalUrl;
  if(!req.session.user && url.indexOf("login") == -1){
    res.redirect("/login.html");
    return;
  }
  next();
});

// 配置服务端路由控制器 
app.use('/', index);
app.use('/action', login);
app.use('/action', menu); 
app.use('/action', user); 
app.use('/action', role); 

app.use(express.static(path.join(__dirname, 'app')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;