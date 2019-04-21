#!/usr/bin/env node
'use strict'

var app = require('./app');
var port = process.env.PORT || 4000;
var mongoose = require('mongoose');

mongoose. connect('mongodb://localhost:27017/tic-tac-toe', (err, res) => {
	if(err){
		throw err;
	}
	else{
		console.log("Base de datos iniciada");
		app.listen(port, function(){
			console.log("Servidor Corriendo en puerto " + port);
		});
	}
});
