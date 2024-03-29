/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice1,dice2;

init();
document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying){
    // 1. Random number
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    document.getElementById('dice-0').style.display = "block";
    document.getElementById('dice-1').style.display = "block";
    document.getElementById('dice-0').src = "dice-" + dice1 + ".png";
    document.getElementById('dice-1').src = "dice-" + dice2 + '.png';

    // 3. Update the round score IF the rolled score was NOT a 1
    if (dice > 1) {
        // Add score
        roundScore += dice;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      // Next Player
      rolledOne();
      nextPlayer();
}
}
}); // callback function because it is not called by the code, but by the user

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying){
    // Add CURRENT score to GLOBAL scores
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector("#dice-0").style.display = "none";
      document.querySelector("#dice-1").style.display = "none";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      var cont = prompt("Would you like to continue?", "No");
      cont = cont.toLowerCase();
      if (cont == "yes") {
        init();
      } else {
        gamePlaying = false;
      }
    }else {
    // Next Player
    nextPlayer();
    }
  }
});
function rolledOne () {
    alert("Oh No! You Rolled a One. You lose your turn.");
}
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector("#dice-0").style.display = "none";
  document.querySelector("#dice-1").style.display = "none";
}
function init() {
  gamePlaying = true;
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  document.querySelector("img.dice").style.display = "none";
  document.getElementById("name-0").textContent = prompt("What is your name?", "Player 1");
  document.getElementById("name-1").textContent = prompt("Who are you playing?", "Player 2");
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
}
document.querySelector(".btn-new").addEventListener("click", init);
