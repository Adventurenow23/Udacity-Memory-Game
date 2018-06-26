/*Setting variables*/
let openCards = [];
let moves = 0;
let seconds = 0,
    minutes = 0;
let timer = document.querySelector('.timer');
let interval;
const deck = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
let matches = 0;
const stars = document.querySelectorAll('.stars');
let one = document.querySelectorAll('.first-star');
let two = document.querySelectorAll('.second-star');
let closebtn = document.querySelector('.close');
const restart = document.querySelector('.restart');
/* * Create a list that holds all of your cards */
const allCards = [
  "fas fa-glass-martini",
  "fas fa-glass-martini",
  "fa fa-life-ring",
  "fa fa-life-ring",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-cloud",
  "fa fa-cloud",
  "fa fa-bug",
  "fa fa-bug",
  "fas fa-sun",
  "fas fa-sun",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-camera",
  "fa fa-camera",
  ];
 
restart.addEventListener('click',() => {
  location.reload (true);
});
// document.querySelector(".restart").reset();
// function for shuffling the deck in a random order

function shuffleDeck() {
  const shuffleAllCards = Array.from(document.querySelectorAll(".deck li"));
  //console.log('Cards to shuffle', shuffleAllCards);//
  const shuffledCards = shuffle(shuffleAllCards);
  //console.log('Shuffled cards', shuffledCards);//
  for (let card of shuffledCards) {
    deck.appendChild(card);
  }
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//Event Listener to click 2 cards at a time for possible match//
deck.addEventListener('click',event => { 
    const clickTarget = event.target; 
    if (
      clickTarget.classList.contains('card') &&
      !clickTarget.classList.contains ('match') &&
      openCards.length < 2 &&
      !openCards.includes(clickTarget)
   )  {
     toggleCard(clickTarget);
     addOpenCard (clickTarget);
     if (openCards.length === 2) {
       console.log('2 cards');
       setTimeout (checkMatch, 700);
       moveCounter();
     }
   }
});

//Make cards flip, change class to "card open show".
function toggleCard(card) {  //pass in the event.target here.
    card.classList.toggle('open'); //adds open to class of card...
    card.classList.toggle('show'); //...along with show. End result should be: .card = "open card show"
}
                        
function addOpenCard(clickTarget) {
  openCards.push(clickTarget);
  console.log(openCards);
}
//Checking for match: if 7 matches occur - modal will appear for winning - If no match, cards will
//flip over and return to array//
function checkMatch () {
  if (   
   openCards[0].firstElementChild.className === 
   openCards[1].firstElementChild.className
) {    
   openCards[0].classList.toggle('match');
   openCards[1].classList.toggle('match');
   openCards = [];
    console.log('Match!');
if (matches === 7) {
  console.log(matches);
  toggleModal();
  stopTimer();
} else {
  matches++; 
}  
  } else {  
    console.log('Not a Match!');
    toggleCard(openCards[0]);
    toggleCard(openCards[1]);
    openCards=[];
  }
}
 //function that counts moves// 
function moveCounter() {
    moves++;
    const counter = document.querySelector('.moves');
    counter.innerHTML = moves;
    //start timer on first move
    if (moves === 1) {
        seconds = 0;
        minutes = 0;
        hour = 0;
        startTimer();
    }
    starRating();
}

//Removes first and second stars based on move count// 
// after 12 & 16 moves respectively//
function starRating() {
    if (moves > 12 && moves < 16) {
        for (let i = 0; i < one.length; i++) {
            one[i].style.visibility = 'hidden';
        }
        // one.style.visibility = 'hidden';//
    } else if (moves > 16) {
        for (let j = 0; j < one.length; j++) {
            two[i].style.visibility = 'hidden';
        }
        // two.style.visibility = 'hidden';//
    }
}

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minutes + "mins " + seconds + "secs";
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes == 60) {
            hour++;
            minutes = 0;
        }
    }, 1000);
}
//Stop timer and Congratulatory modal appears//
function stopTimer() {
    clearInterval(interval);
}
 
function toggleModal() {
    console.log("");
    const modal = document.querySelector('.modal-box');
    closebtn.addEventListener('click', toggleModal);
    console.log(closebtn);
    modal.classList.toggle('hide');
    document.getElementById("modal-moves").innerHTML = moves;
    document.getElementById("modal-time").innerHTML = timer.innerHTML;
}

// Press Play Again and Listen for Click to activate button//
let playAgainButton = document.querySelector(".playAgainBtn");
playAgainButton.addEventListener('click',() => {
    toggleModal();
    location.reload(true);
 });

shuffleDeck();








     
     
     
     

