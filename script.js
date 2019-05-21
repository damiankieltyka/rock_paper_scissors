let userScore = 0;
let computerScore = 0;
const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';
const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const result_p = document.querySelector('.result > p');
const choiceRock_div = document.getElementById('rock');
const choicePaper_div = document.getElementById('paper');
const choiceScissors_div = document.getElementById('scissors');

const getComputerChoice = () => {
    let getRandomNumber = (Math.floor(Math.random() * 3));
    if (getRandomNumber == 0) {
        getRandomNumber = rock;
    } else if (getRandomNumber == 1) {
        getRandomNumber = paper;
    } else {
        getRandomNumber = scissors;
    }
    return getRandomNumber;
}

const won = (userChoice, computerChoice) => {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `User choose ${userChoice}, that beats ${computerChoice}, what computer played. You won!`;
}

const lost = (userChoice, computerChoice) => {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `User choose ${userChoice}, that loses with ${computerChoice}, what computer played. You lost!`;
}

const tie = (userChoice, computerChoice) => {
    result_p.innerHTML = `User choose ${userChoice}, that equals to ${computerChoice}, what computer played. It's a tie!!`;
}

const playGame = (userChoice) => {
    const computerChoice = getComputerChoice();
    if (userChoice === computerChoice) {
        return tie(userChoice, computerChoice);
    } else {
        switch (userChoice + computerChoice) {
            case rock + scissors:
            case paper + rock:
            case scissors + paper:
                won(userChoice, computerChoice);
                break;
            case rock + paper:
            case paper + scissors:
            case scissors + rock:
                lost(userChoice, computerChoice);
                break;
        }
    }

}

const mainGame = () => {
    choiceRock_div.addEventListener('click', () => playGame(rock));
    choicePaper_div.addEventListener('click', () => playGame(paper));
    choiceScissors_div.addEventListener('click', () => playGame(scissors));
}

mainGame();