'use strict';

// Selecting Elements:    0- 1st player,   1- 2nd player
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

const finalScores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

// Selecting Buttons
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

// Starting Conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

// Switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Rolling the dice functionality
rollDice.addEventListener('click', function () {
  if (playing) {

    // 1. Generating a random dice roll
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    // 2. Display dice roll
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${randomNumber}.png`;

    // 3. Check for rolled 1: If true then switch to next player
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});


// Hold functionality
hold.addEventListener('click', function () {
  if (playing) {

    // 1. Add current score to active player's score
    finalScores[activePlayer] += currentScore;  // finalScores at position 0(player-1) += currentScore
    document.getElementById(`score--${activePlayer}`).textContent = finalScores[activePlayer];

    // 2. Check if player's score is >= 100. If yes, finish the game with the winning display message
    if (finalScores[activePlayer] >= 100) {
      playing = false;
      // Add player winner class
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

      // Remove player active class
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

      // Hide the dice img once any player wins the game
      diceElement.classList.add('hidden');
    } else {
      // 3. Switch to next player
      switchPlayer();
    }
  }
});

// Reset game functionality
newGame.addEventListener('click', function () {
  const finalScores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
});