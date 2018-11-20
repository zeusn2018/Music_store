'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso';

//lo va guardar dentro de un hash un token los datos de user
exports.createToken = function(user){
//los datos que se van a codificar payload, sub sera el id del documento en este caso del usuario user
	var payload = {
		sub: user._id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		role: user.role,
		image: user.image,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	};

	return jwt.encode(payload, secret);
};

//se puede hacer mas metodos decoficarToken ...