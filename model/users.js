var mongoose = require('mongoose'); 
var dataTables = require('mongoose-datatables');
var Schema = mongoose.Schema; 
var userSchema = new Schema({ 
	nama: String , 
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	role: { type: String, required: true },
	pic: { type: String, required: true },
	about: { type: String, required: true },
	active: { type: String, required: true }
    },
	{
		timestamps: true 
	});
userSchema.plugin(dataTables, {
	totalKey: 'recordsTotal',
	dataKey: 'data'
});
var User = mongoose.model('User', userSchema); 
module.exports = User; 

