// stating the element
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");

const rollDice = document.querySelector(".btn--roll");
const resetDice = document.querySelector(".btn--new");
const holdDice = document.querySelector(".btn--hold");

// stating the starting conditions

let score, activePlayer, currentScore, playing;

const init = function () {
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player0El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
//implementing the Roll-Dicce functiionality
rollDice.addEventListener("click", function () {
  //getting a random dice roll
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;

    //making the rolled dice visible(DISPLAY DICE)
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);

    //check for rolled
    if (dice !== 1) {
      //display current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

holdDice.addEventListener("click", function () {
  if (playing) {
    //Add current score to active players score
    score[activePlayer] += currentScore;
    //score[1] = score[1] += current score
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //check if score is >= 100(end game)
    if (score[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
    //switch player
  }
});

resetDice.addEventListener("click", function () {
  init();
});
