/*
 * Create a list that holds all of your cards
 */

const cards = document.getElementsByClassName("card");
const cardList = [...cards];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//shuffle the deck and apply shuffled cards to page
const deck = document.querySelector(".deck");
function shuffledDeck(){
  shuffle(cardList);
  for (let i = 0; i < cardList.length; i++){
    let newCardArr = cardList[i];
    deck.appendChild(newCardArr);
  }
}
shuffledDeck();

//initialize variables
const allCards = document.querySelectorAll(".card");
var openCards = [];
var matches = 0;
var moves = 0;
const counter = document.querySelector(".moves");
const modal = document.querySelector(".modal-container");
const endMoves = document.querySelector(".moves-taken");
const stars = document.querySelector(".stars").children;
const starsModal = document.querySelector(".stars-modal").children;
const restart = document.querySelector(".restart");
const replay = document.querySelector("#again");
const secondCounter = document.querySelector(".seconds");
const minuteCounter = document.querySelector(".minutes");
const endGameTime = document.querySelector(".game-time");
var cardsClicked = 0;
//flip cards by adding open and show classes
const clickOpen = () => {
  allCards.forEach(function(card) {
    card.addEventListener("click", function(e){
      if (openCards.length < 2 && !card.classList.contains("open") && !card.classList.contains("show")){
        openCards.push(card);
        card.classList.add("open", "show");
        cardsClicked +=1;
        if (cardsClicked === 1) {
          startTimer = new Date().getTime();
          runningTimer();
        }
        if (openCards.length > 1) {
          //check for matches
          checkMatch(card);
          //add a count to moves
          countMove();
          //update moves on scoreboard
          moveCounter();
          console.log("moves = " + moves);
          //update update stars
          updateStars();
        }
      }
    });
  });
};
//check flipped cards for match and add match class
const checkMatch = (card) => {
    console.log("checking for match")
    let firstCard = openCards[0].innerHTML;
    let secondCard = openCards[1].innerHTML;
    if (firstCard === secondCard){
      card.classList.add("match");
      openCards[0].classList.add("match");
      openCards = [];
      //add count to matched list
      countMatch();
      //check for game complete
      checkWin();
      console.log("matches = " + matches);
    } else {
      setTimeout(function() {
        openCards.forEach(function(card) {
          card.classList.remove("open", "show");
      });
      openCards = [];
    }, 1000);
  }
}
//matched list function
const countMatch = () => {
  return matches += 1;
}
//moves counter
const countMove = () => {
  return moves += 1;
}
const checkWin = () => {
  if (matches === 1) {
    //congratulations modal popup
    gameWon();
  }
}
//congratulations modal popup function
const gameWon = () => {
  modal.classList.replace("winner-hidden","winner");
  modal.classList.add("winner");
  stopTimer();
  winTime();
}
//update move counter
const moveCounter = () => {
  counter.textContent = moves;
  endMoves.textContent = "Moves: " + moves;
}
//update star-rating
const updateStars = () => {
  if (moves === 0) {
    stars[0].classList.replace("fa-star-o", "fa-star");
    stars[1].classList.replace("fa-star-o", "fa-star");
    stars[2].classList.replace("fa-star-o", "fa-star");
  } else {
    if (moves > 10) {
      stars[2].classList.replace("fa-star", "fa-star-o");
      starsModal[2].classList.replace("fa-star", "fa-star-o");
      if (moves > 16) {
        stars[1].classList.replace("fa-star", "fa-star-o");
        starsModal[1].classList.replace("fa-star", "fa-star-o");
      }
    }
  }
}
const resetBoard = () => {
  allCards.forEach(function(card) {
    card.classList.remove("open", "show", "match");
  });
  moves = 0;
  matches = 0;
  openCards = [];
  cardsClicked = 0;
  moveCounter();
  updateStars();
  stopTimer();
  resetTime();
  shuffledDeck();
  console.log("reset");
}
//reset functions
const reset = () => {
  restart.addEventListener("click", resetBoard);
}
const playAgain = () => {
    replay.addEventListener("click", function () {
      resetBoard();
      modal.classList.replace("winner", "winner-hidden");
    });
}
//timer
var time = 0,
    startTimer = "",
    elapsedTime = 0;
//format the timer clock on the score panel
const timerDetail = () => {
  if (elapsedTime < 60) {
    if (elapsedTime < 10) {
      secondCounter.textContent = "0"+elapsedTime;
    } else if (elapsedTime > 9 && elapsedTime < 60) {
    secondCounter.textContent = elapsedTime;
    }
  } else {
    let minutes = Math.round(elapsedTime/60);
    let seconds = Math.round(elapsedTime%60);
    if (seconds < 10) {
      secondCounter.textContent = "0"+seconds;
      minuteCounter.textContent = minutes;
    }else {
    secondCounter.textContent = seconds;
    minuteCounter.textContent = minutes;
    }
  }
}
//formatting the time taken to win on the winner popup
const winTime = () => {
  if (elapsedTime < 60) {
    if (elapsedTime < 10) {
      endGameTime.textContent = "Time: 00:0"+elapsedTime;
    } else if (elapsedTime > 9 && elapsedTime < 60) {
        endGameTime.textContent = "Time: 00:" + elapsedTime;
    }
  } else {
    let minutes = Math.round(elapsedTime/60);
    let seconds = Math.round(elapsedTime%60);
    if (seconds < 10) {
      endGameTime.textContent = "Time: " + minutes + ":0" + seconds;
    }else {
    endGameTime.textContent = "Time: " + minutes + ":" + seconds;
    }
  }
}
let runTimer;
const runningTimer = () => {
  runTimer = setInterval(function() {
    time = new Date().getTime() - startTimer;
    elapsedTime = Math.round(Math.floor(time / 100) / 10);
    if(Math.round(elapsedTime) == elapsedTime) {
      elapsedTime += '';
    }
    timerDetail();
}, 100);
}
//stop the timer
const stopTimer = () => {
  clearInterval(runTimer);
  return elapsedTime;
}
//reset the timer
const resetTime = () => {
  time = 0;
  elapsedTime = 0;
  cardsClicked = 0;
  secondCounter.textContent = "00";
  minuteCounter.textContent = "00";
  endGameTime.textContent = "Time: 00:00"
  console.log(elapsedTime);
}
playAgain();
reset();
clickOpen();
