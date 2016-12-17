var express = require('express');
var router = express.Router();
var passport = require('passport')
var urlLogin="/login-admin";
var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect(urlLogin);
}

module.exports = function(passport){

	router.get(urlLogin, function(req, res) {
		res.render('dashboard/login', { message: req.flash('message') });
	});


	router.get('/logout-admin', function(req, res) {
		req.logout();
		res.redirect(urlLogin);
	});

	router.post(urlLogin, function(req, res, next) {
		passport.authenticate('login', function(err, user, info) {
			if (err) { return next(err); }
			if (!user) { return res.json({ login_status: 'invalid' }); }
			req.logIn(user, function(err) {



				if (err) { return next(err); }
				return res.json({ login_status: 'success' });
			});
		})(req, res, next);
	});


	return router;
}
