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
	}
}

function turn(indice, player, callback) {
    emptyBoard[indice] = player;
    // console.log(emptyBoard);
    callback(emptyBoard);
}

module.exports = {
    startGame,
    getBoard
};