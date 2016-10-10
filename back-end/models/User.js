var mongoose = require('mongoose');

var User = mongoose.model('User', {
	email: String,
	pwd: String
});

module.exports = User;