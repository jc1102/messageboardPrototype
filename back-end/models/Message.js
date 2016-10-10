var mongoose = require('mongoose');

var Message = mongoose.model('Message', {
	msg: String,
	user: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports = Message;