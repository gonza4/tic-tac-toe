'use strict'

const winRows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

var emptyBoard;
var Play = require('../models/play');

function startGame(req, res) {
    let indice = req.body.indice;
    var result;
    var draw;
    var finish;

    turnMove(indice, function(res) {
        result = res;
        draw = res.draw;
        if (undefined !== res.finish) {
            finish = res.finish;
        }
    });
    
    saveResult(result)
    
    res.status(200).send({result: result, draw: draw, finish: finish});
}

function saveResult(result){
    var play = new Play({
        result: result
    });

    play.save(function (err, play) {
      if (err) {
          console.log(err);
      } else {
          console.log(play);
      }
    });
}

function getBoard(req, res) {
    emptyBoard = Array.from(Array(9).keys());

    res.status(200).send({result: emptyBoard})
}

function turnMove(indice, callback){
    if (typeof emptyBoard[indice] == 'number') {
		turn(indice, 'X', function(res) {
            callback(res);
        });

        if (!checkTie()) {
            turn(findMachineSpot(), 'O', function(res){
                callback(res);
            });
        } else {
            callback({draw: "It's a draw"});
        }
	}
}

function turn(indice, player, callback) {
    emptyBoard[indice] = player;

    checkWinner(emptyBoard, player, function(res){
        if (res) {
            gameOver(res, function(res){
                if (undefined !== res) {
                    callback({finish: res});
                }
            });
        } else {
            callback(emptyBoard);
        }
    })
}

function checkTie() {
	if (emptySquares().length == 0) {
		return true;
	}
	return false;
}

function emptySquares() {
	return emptyBoard.filter(s => typeof s == 'number');
}

function findMachineSpot() {
	return emptySquares()[0];
}

function checkWinner(board, player, callback) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    
	for (let [index, win] of winRows.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	callback(gameWon);
}

function gameOver(gameWon, callback) {
    if('X' === gameWon.player){
        callback("¡You Win!");
    } else {
        callback("¡You Lose!");
    }
}

module.exports = {
    startGame,
    getBoard
};