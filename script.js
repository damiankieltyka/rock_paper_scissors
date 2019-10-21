'use strict';

var params = {
    turnResult: TIE,
    playerScore: 0,
    computerScore: 0,
    turnsLimit: 0,
    gameFinished: true,
    roundsPlayed: 0,
    progress: [],
    playerName: '',
};

var ROCK = 'ROCK';
var PAPER = 'PAPER';
var SCISSORS = 'SCISSORS';
var TIE = 'TIE';
var WIN = 'YOU WIN';
var LOSE = 'YOU LOSE';
var modals = document.querySelectorAll('.modal');
var modalLinks = document.querySelectorAll('.show-modal');
var closeButtons = document.querySelectorAll('.modal .close');
var modalOne = document.getElementById('modal-one');

var output = document.getElementById('output');
output.innerHTML = 'Click the <b>New Game</b> button to begin new game.';
var result = document.getElementById('result');
result.innerHTML = params.playerName + ' <b>' + params.playerScore + '</b> : <b>' + params.computerScore + '</b> Computer';

var playerMoveButton = document.getElementsByClassName('player-move');
for (var i = 0; i < playerMoveButton.length; i++) {
    playerMoveButton[i].addEventListener('click', function(event) {
        playerMove(event.target.getAttribute('data-move'));
    });
}

function moveDependencies(playerPick, computerPick) {
    if (playerPick == computerPick) {
        params.turnResult = TIE;
    }
    else if ((playerPick == ROCK && computerPick == SCISSORS) ||
        (playerPick == PAPER && computerPick == ROCK) ||
        (playerPick == SCISSORS && computerPick == PAPER)) {
        params.turnResult = WIN;
    }
    else if ((playerPick == ROCK && computerPick == PAPER) ||
        (playerPick == PAPER && computerPick == SCISSORS) ||
        (playerPick == SCISSORS && computerPick == ROCK)) {
        params.turnResult = LOSE;
    }
}

function outputText(playerPick, computerPick) {
    output.innerHTML = '<b>' + params.turnResult + '</b>: ' + params.playerName + ' played <b>' + playerPick + '</b>, computer played <b>' + computerPick + '</b>!<br>' + output.innerHTML;
}

function playerMove(playerPick, computerPick) {
    if (params.gameFinished === true) {
        output.innerHTML = 'The game is finished. Click the <b>New Game</b> button to begin new game.<br>' + output.innerHTML;
    }
    else {
        computerPick = [ROCK, PAPER, SCISSORS][Math.floor(Math.random() * 3)];

        moveDependencies(playerPick, computerPick);
        outputText(playerPick, computerPick);
        checkResult();
        params.progress.push({progressRounds: params.roundsPlayed, progressPlayerPick: playerPick, progressComputerPick: computerPick, progressTurnResult: params.turnResult, progressScore: (params.playerScore + ' : ' + params.computerScore)});
        checkIfGameIsFinished();
    }
}

function checkResult() {
    params.roundsPlayed++;

    if (params.turnResult == WIN) {
        params.playerScore++;
    }
    else if (params.turnResult == LOSE) {
        params.computerScore++;
    }
    result.innerHTML = params.playerName + ' <b>' + params.playerScore + '</b> : <b>' + params.computerScore + '</b> Computer';
}

var buttonNewGame = document.getElementById('new-game');
buttonNewGame.addEventListener('click', newGameModal);

function newGameModal() {
    document.querySelector('#modal-overlay').classList.add('show');
    document.querySelector('#modal-two').classList.add('show');
    document.getElementById('start-button').addEventListener('click', newGame)
}

var limit = document.getElementById('turns-limit');

function newGame() {
    params.playerName = document.getElementById('player-name').value;
    params.turnsLimit = document.getElementById('turns-number').value;

    if (params.playerName != '' && params.turnsLimit > 0) {
        WIN = params.playerName.toUpperCase() + ' WINS';
        LOSE = params.playerName.toUpperCase() + ' LOSES';
        document.getElementById('table-player-name').innerHTML = params.playerName;
        params.playerScore = 0;
        params.computerScore = 0;
        params.roundsPlayed = 0;
        params.gameFinished = false;
        params.progress = [];
        result.innerHTML = params.playerName + ' <b>' + params.playerScore + '</b> : <b>' + params.computerScore + '</b> Computer';
        limit.innerHTML = 'Number of turns to be won: <b>' + params.turnsLimit + '</b>';
        output.innerHTML = '<b>New game started.</b>';
        modalOne.querySelector('.table-body').innerHTML = '';
        hideModal();
    }
}

function checkIfGameIsFinished() {
    if (params.turnsLimit > 0 && params.turnsLimit == params.playerScore) {
        params.gameFinished = true;
        output.innerHTML = '<b>Congratulations! ' + params.playerName + ' has won the game.</b> Click the <b>New Game</b> button to begin new game.<br>' + output.innerHTML;
        document.querySelector('#modal-overlay').classList.add('show');
        modalOne.classList.add('show');
        modalOne.querySelector('header').innerHTML = WIN;
        modalOne.querySelector('.content').innerHTML = '<b>Congratulations! ' + params.playerName + ' has won the game.</b> Click the <b>New Game</b> button to begin new game.<br>';
        for (var i = 0; i < params.progress.length; i++) {
            var para = params.progress[i];
            console.log(para.progressRounds);
            modalOne.querySelector('.table-body').insertAdjacentHTML('beforeEnd', '<tr><td>' + para.progressRounds + '</td><td>' + para.progressPlayerPick + '</td><td>' + para.progressComputerPick + '</td><td>' + para.progressTurnResult + '</td><td>' + para.progressScore + '</td></tr>');
        }
    }
    else if (params.turnsLimit > 0 && params.turnsLimit == params.computerScore) {
        params.gameFinished = true;
        output.innerHTML = '<b>Better luck next time!</b> Click the <b>New Game</b> button to begin new game.<br>' + output.innerHTML;
        document.querySelector('#modal-overlay').classList.add('show');
        modalOne.classList.add('show');
        modalOne.querySelector('header').innerHTML = LOSE;
        modalOne.querySelector('.content').innerHTML = '<b>Better luck next time!</b> Click the <b>New Game</b> button to begin new game.<br>';
        for (var i = 0; i < params.progress.length; i++) {
            var para = params.progress[i];
            modalOne.querySelector('.table-body').insertAdjacentHTML('beforeEnd', '<tr><td>' + para.progressRounds + '</td><td>' + para.progressPlayerPick + '</td><td>' + para.progressComputerPick + '</td><td>' + para.progressTurnResult + '</td><td>' + para.progressScore + '</td></tr>');
        }
    }
    else {
        params.gameFinished = false;
    }
}

var showModal = function(i){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.add('show');
    modals[i].classList.add('show');
};

modalLinks.forEach(function(link, index) {
    link.addEventListener('click', function(){
        showModal(index);
    })
});

var hideModal = function(i){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
    document.querySelector('.modal').classList.remove('show');
    modals.forEach(function(elem) {
        elem.classList.remove('show');
    })
};

for (var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

for (var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
        event.stopPropagation();
    })
}