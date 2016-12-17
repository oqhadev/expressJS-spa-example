'use strict'
// depencis
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
app.use(expressSession({secret: '1i3j1o2ij31o2j31o2j398u987s'}));
var flash = require('connect-flash');
app.use(flash());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/oqha');

var expressValidator = require('express-validator'); 
var methodOverride = require('method-override'); 

var passport = require('passport');
var initPassport = require('./addon/passport/init');
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);
// var layout = require('express-layout');
// app.use(layout());
// app.set('layouts', './views/dashboard/part');
// app.set('layout', 'layout');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//router
var index = require('./routes/index');
// var AjaxToJson=require('AjaxToJson');
// app.use(AjaxToJson.init(true));

app.use(methodOverride(function(req, res){ 
	if (req.body && typeof req.body == 'object' && '_method' in req.body) { 
		var method = req.body._method; 
		delete req.body._method; return method; 
	} 
}));

//remember me
// app.use( function (req, res, next) {
//   if ( req.method == 'POST' && req.url == '/login-admin' ) {
//     if ( req.body.rememberme ) {
//       req.session.cookie.maxAge = 2592000000; // 30*24*60*60*1000 Rememeber 'me' for 30 days
//     } else {
//       req.session.cookie.expires = false;
//     }
//   }
//   next();
// });
app.use(function(req, res, next){
    res.locals.isAjax = req.headers['x-requested-with'] && 
        req.headers['x-requested-with'] === 'XMLHttpRequest';
    next();
});
app.use('/', index);

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/login-admin');
};

var dashboard = require('./routes/dashboard/dashboard.js');
var dashboardLogin = require('./routes/dashboard/auth.js')(passport);
app.use('/dashboard', dashboard);
app.use('/', dashboardLogin);
//404
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});





module.exports = app;
