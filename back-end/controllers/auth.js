var User = require('../models/user');
var jwt = require('jwt-simple');
var moment = require('moment');

var auth = {
	register: function(req, res){
		console.log(req.body);

		User.findOne({email: req.body.email}, function(err, existingUser) {

			if(existingUser)
				return res.status(409).send({message: 'Email is already registered'});

			var user = new User(req.body);

			user.save(function(err,result) {
				if (err) {
					res.status(500).send({
						message: err.message
					}).end();
				}
				res.status(200).send({token: createToken(result)}).end();
			});
		});
	},
	
	login: function (req, res) {
		User.findOne({email: req.body.email}, function(err, user) {
			if(!user)
				return res.status(401).send({message: 'Email or Password invalid'});
			if(req.body.pwd == user.pwd) {
				console.log(req.body, user.pwd);
				res.send({
					token: createToken(user)
				});
			}
			else {
				return res.status(401).send({
					message: 'Invalid email and/or password'
				});
			}
		});

	}
}

function createToken(user) {
	var payload = {
		sub: user._id,
		iat: moment().unix(),
		exp: moment().add(14, 'days').unix()
	};

	return jwt.encode(payload, 'secret');
}

module.exports = auth;