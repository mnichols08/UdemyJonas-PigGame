/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice1, dice2, lastDice1, lastDice2, lastDice;

//init();

document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying){
    // 1. Random number
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6 + 1);

    // 2. Display the result
      document.querySelector("#dice-0").style.display = "block";
      document.querySelector("#dice-1").style.display = "block";
      document.querySelector("#dice-0").src = "dice-" + dice1 + '.png';
      document.querySelector("#dice-1").src = "dice-" + dice2 + '.png';
      // Challenge - Update the round if the player rolled 2 6's in a row
    if (dice1 === 6 && lastDice1 === 6 || dice2 === 6 && lastDice2 === 6) {
      // Player loses score
      alert("Oh No! You Rolled Back to Back Six's. You lose all of your points.");
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice1 > 1 && dice2 > 1) {
        // Add score
        roundScore += dice1 + dice2;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      // Next Player
      rolledOne();
      nextPlayer();
}
      lastDice1 = dice1;
      lastDice2 = dice2;
}
}); // callback function because it is not called by the code, but by the user

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying){
    // Add CURRENT score to GLOBAL scores
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    var input = document.querySelector(".final-score").value
    if (input) {
      var winningScore = input;
    } else {
      winningScore = 100;
    }
    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
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
  document.querySelector("#dice-0").style.display = "none";
  document.querySelector("#dice-1").style.display = "none";
  document.getElementById("name-0").textContent = prompt("What is your name?", "Player 1");
  document.getElementById("name-1").textContent = prompt("Who are you playing?", "Player 2");
  var scoreLimit = prompt("How many points would you like to play until?", "100");
  document.querySelector(".final-score").value = scoreLimit;
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
