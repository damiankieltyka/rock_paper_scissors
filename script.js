let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreTable_div = document.querySelector('.score-table');
const result_p = document.querySelector('.result > p');
const choiceRock_div = document.getElementById('rock');
const choicePaper_div = document.getElementById('paper');
const choiceScissors_div = document.getElementById('scissors');

const getComputerChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const getRandomNumber = (Math.floor(Math.random() * 3));
    return choices[getRandomNumber];
}

const toUpperCase = word => {
    if (word === 'rock') return 'ROCK';
    if (word === 'paper') return 'PAPER';
    return 'SCISSORS';
}

const gameReset = () => {
    if (userScore == '10') {
        alert(`You won 10 rounds, game will restart, clicking OK`);
        setTimeout(() => location.reload(), 100);
    } else if (computerScore == '10'){
        alert(`Computer won 10 rounds, game will restart after clicking OK`);
        setTimeout(() => location.reload(), 100);
    }
}

const won = (userChoice, computerChoice) => {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `User choose ${toUpperCase(userChoice)}, that beats ${toUpperCase(computerChoice)}, what computer played. You won!`;
}

const lost = (userChoice, computerChoice) => {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `User choose ${toUpperCase(userChoice)}, that loses with ${toUpperCase(computerChoice)}, what computer played. You lost!`;
}

const tie = (userChoice, computerChoice) => {
    result_p.innerHTML = `User choose ${toUpperCase(userChoice)}, that equals to ${toUpperCase(computerChoice)}, what computer played. It's a tie!!`;
}


const playGame = (userChoice) => {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            won(userChoice, computerChoice);
            break;
        case 'rockpaper':
        case 'paperscissors':
        case 'scissorsrock':
            lost(userChoice, computerChoice);
            break;
        case 'rockrock':
        case 'paperpaper':
        case 'scissorsscissors':
            tie(userChoice, computerChoice);
            break;
    }
    gameReset();
}

const mainGame = () => {
    choiceRock_div.addEventListener('click', () => playGame('rock'));
    choicePaper_div.addEventListener('click', () => playGame('paper'));
    choiceScissors_div.addEventListener('click', () => playGame('scissors'));
}

mainGame();
