const choices = document.querySelectorAll('.choice');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const ralliesElement = document.getElementById('rallies');
const computerChoiceImg = document.getElementById('computer-choice-img');
const playerChoiceImg = document.getElementById('player-choice-img');

let playerScore = 0;
let computerScore = 0;
let rallies = 1;

choices.forEach(choice => {
  choice.addEventListener('click', playGame);
});

function playGame(e) {
  if (rallies > 10) {
    return; // Exit the function if 10 rallies have already taken place
  }

  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();

  const result = getWinner(playerChoice, computerChoice);
  updateScores(result);
  displayChoices(playerChoice, computerChoice);

  ++rallies;
  if (rallies > 10) {
    endGame();
  } else {
    setTimeout(resetChoices, 1000);
  }
}

function getComputerChoice() {
  const choices = ['stone', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'draw';
  } else if (
    (playerChoice === 'stone' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'stone') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'player';
  } else {
    return 'computer';
  }
}

function updateScores(result) {
  if (result === 'player') {
    playerScore++;
    playerScoreElement.textContent = `Player: ${playerScore}`;
  } else if (result === 'computer') {
    computerScore++;
    computerScoreElement.textContent = `Computer: ${computerScore}`;
  }

  ralliesElement.textContent = `Rallies: ${rallies}`;
}

function endGame() {
  let message;
  let modalClass;
  let gifPath;

  if (playerScore > computerScore) {
    message = 'Congratulations! You win the game!';
    modalClass = 'win-modal';
    gifPath = './assets/images/win.gif';
  } else if (playerScore < computerScore) {
    message = 'Sorry! Better Luck Next Time.';
    modalClass = 'lose-modal';
    gifPath = './assets/images/lost.gif';
  } else {
    message = 'The game ends in a draw.';
    modalClass = 'draw-modal';
    gifPath = './assets/images/draw.gif';
  }

  const modal = document.createElement('div');
  modal.classList.add('modal', modalClass);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  modalContent.appendChild(messageElement);

  const gifElement = document.createElement('img');
  gifElement.src = gifPath;
  gifElement.classList.add('gif');
  modalContent.appendChild(gifElement);

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  setTimeout(resetScores, 2000);
}

function resetScores() {
  playerScore = 0;
  computerScore = 0;
  rallies = 0;
  playerScoreElement.textContent = 'Player: 0';
  computerScoreElement.textContent = 'Computer: 0';
  ralliesElement.textContent = 'Rallies: 0';
  resetChoices();
}

function resetChoices() {
  choices.forEach(choice => {
    choice.classList.remove('selected');
  });
}

function displayChoices(playerChoice, computerChoice) {
  const imagePathPlayer = getImagePath(playerChoice);
  const imagePathComputer = getImagePath(computerChoice);

  playerChoiceImg.src = imagePathPlayer;
  playerChoiceImg.alt = playerChoice;
  computerChoiceImg.src = imagePathComputer;
  computerChoiceImg.alt = computerChoice;
}

function getImagePath(choice) {
  return `./assets/images/${choice}.jpg`;
}