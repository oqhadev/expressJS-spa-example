'use strict';
var express = require('express');
var router = express.Router();
var User = require('../../model/users');



var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/login-admin');
};

// router.get('/', isAuthenticated, function(req, res){
// 	res.render('dashboard/test', { user: req.user });
// });
router.get('/', function(req, res){
	res.render('dashboard/index', { user: req.user });
});

router.post('/user', function(req, res){
	var sorts=['username','password'];
	var sort;
	if(req.body.order[0].dir=='desc'){
		sort=-1;
	}
	else{
		sort=1;
	}

	var sortt=sorts[req.body.order[0].column];
	var data={
		limit: req.body.length,
		skip: req.body.start,
		
		search: {
			value: req.body.search.value,
			fields: ['username','password']
		},
		sort: {
			[sortt]: sort
		}
	};
	var dataa=[];
	User.dataTables(data, function (err, table) {
		for (var i = 0, len = table.data.length; i < len; i++) {
			var convertedJSON = JSON.parse(JSON.stringify(table.data[i]));
			convertedJSON.aksi = '<a class="btn btn-danger" onclick="hapus(\''+table.data[i]._id+'\')">Del</a> <a class="btn btn-primary" onclick="hapus(\''+table.data[i]._id+'\')">Edit</a>'; 
			console.log(convertedJSON);
			dataa[i]=convertedJSON;
		}	
		res.json({
			data:dataa,
			recordsFiltered: table.recordsTotal,
			recordsTotal: table.recordsTotal
		}); 
	});

});


router.get('/user', function(req, res){	
	res.render('dashboard/user/user', { user: req.user });
});
router.get('/user/tambah', function(req, res){	
	res.render('dashboard/user/tambah', { user: req.user });
});











router.get('/anime/baru', function(req, res){	
	console.log(req.locals);
	res.render('dashboard/animeBaru', { user: req.user });
});

module.exports = router;
