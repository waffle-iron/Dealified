var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var schedule = require('node-schedule');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
// var mongoUtil = require('./routes/mongo');


var index = require('./routes/index');
var users = require('./routes/users');
var crawler = require('./routes/crawler');
var app = express();

var j = schedule.scheduleJob('*/1 * * *', function() {
    // crawler.crawl();

});
//
// mongoUtil.connect(function (err) {
//     console.log(err);
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressJWT({secret: 'rdabbir12121' }).unless({path: ['/login']}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
