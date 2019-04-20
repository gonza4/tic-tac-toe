'use strict'

var express = require('express');
var tictactoeController = require('../controllers/tictactoe');

var api = express.Router();

api.post('/game/start', tictactoeController.startGame);
api.get('/board', tictactoeController.getBoard);

module.exports = api;