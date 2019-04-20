'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var path = require("path");

var app = express();

var tttRoutes = require('./routes/tictactoe');

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use('/api', tttRoutes);

module.exports = app;