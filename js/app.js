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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
//initialize variables
const allCards = document.querySelectorAll(".card");
var openCards = [];
var matches = 0;
var moves = 0;
const counter = document.querySelector(".moves");
const endMoves = document.querySelector(".moves-taken");
//flip cards by adding open and show classes
const clickOpen = () => {
  allCards.forEach(function(card) {
    card.addEventListener("click", function(e){
      if (openCards.length < 2 && !card.classList.contains("open") && !card.classList.contains("show")){
        openCards.push(card);
        card.classList.add("open", "show");
        if (openCards.length > 1) {
          //check for matches
          checkMatch(card);
          //add a count to moves
          countMove();
          //update moves on scoreboard
          moveCounter();
          console.log("moves = " + moves);
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
  if (matches === 8) {
    //congratulations modal popup
    gameWon();
  }
}
//congratulations modal popup function
const gameWon = () => {
  let modal = document.querySelector(".modal-container");
  modal.classList.remove("winner-hidden");
  modal.classList.add("winner");
}
//update move counter
const moveCounter = () => {
  counter.textContent = moves;
  endMoves.textContent = "Moves: " + moves;
}
clickOpen();
