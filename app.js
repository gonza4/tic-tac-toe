'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var tttRoutes = require('./routes/tictactoe');

app.use(cors());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.use('/api', tttRoutes);

module.exports = app;