var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejsEngine = require('ejs-mate');
var connectAssets = require('connect-assets');
var methodOverride = require('method-override')
var bodyParser = require("body-parser"); // Module for POST/GET 

var app = express();

// view engine setup
app.engine('ejs', ejsEngine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json()); // API response en JSON
app.use(bodyParser.urlencoded({ extended: true }));

app.use(connectAssets({
  paths: [path.join(__dirname, 'public/stylesheets'), path.join(__dirname, 'public/javascripts')]
}));
app.use(methodOverride('_method', {methods: ['GET', 'POST', 'PUT', 'DELETE']}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var usersRouter    = require('./controllers/users');
var usersRouterApi = require('./controllers/api/v1/users');
var sessionsRouter = require('./controllers/sessions');

var homeRouter = require('./controllers/home');

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/api/v1/users', usersRouterApi);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
