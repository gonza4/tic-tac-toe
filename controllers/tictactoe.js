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

var humanMoves = [];
var cumputerMoves = [];
var emptyBoard;

function startGame(req, res) {
    let indice = req.body.indice;
    var resultado;

    turnMove(indice, function(res) {
        resultado = res;
    });

    res.status(200).send({resultado: resultado});
}

function getBoard(req, res) {
    emptyBoard = Array.from(Array(9).keys());

    res.status(200).send({resultado: emptyBoard})
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
    callback(emptyBoard);
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



module.exports = {
    startGame,
    getBoard
};