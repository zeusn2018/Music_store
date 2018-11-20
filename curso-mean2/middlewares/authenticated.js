'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso';
//peticion http verificar el header authorization
exports.ensureAuth = function(req, res, next){
	if(!req.headers.authorization){
		return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticacion'});
	}
	//se le quita las comillas al token
	var token = req.headers.authorization.replace(/['"]+/g,'');
	//decodificar el token
	try{
		var payload = jwt.decode(token, secret);

		if(payload.exp <= moment().unix()){
			return res.status(401).send({message: 'El Token ha expirado'});
		}
	}catch(ex){
		//console.log(ex);
		return res.status(404).send({message: 'Token no valido'});
	}
	//se añade al objeto request todos los datos del usuario identificado
	req.user = payload;

	next();
};