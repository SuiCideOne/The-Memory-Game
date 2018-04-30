let card = document.querySelectorAll(".card");
let cardsArray = [...card];
let deck = document.querySelector('.deck');
let moves = document.querySelector(".moves");
let theTimer = document.querySelector("#timer");
let sec = 0;
let mint = 0;
let hour = 0;
let count = 0;
let theStars = document.querySelectorAll(".fa-star");
let firstStar = document.querySelector("#first-star");
let secondStar = document.querySelector("#second-star");
let thirdStar = document.querySelector("#third-star");
let fourthStar = document.querySelector("#fourth-star");
let fifthStar = document.querySelector("#fifth-star");
let matchedCards = document.getElementsByClassName("match");
let openCards = document.querySelectorAll(".open");
let starTheTimer;
let popUpScoreBored = document.querySelector(".popup");
let scoresTitle = document.querySelector(".scores-head");


/*
**
*** starting the game with shuffled cards
**
*/


shuffle(cardsArray);
cardsArray.forEach(function(x) {
    deck.append(x);
});

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


/*
**
*** some actions with click on Cards
**
*/

function clicking() {
  for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i].classList.remove("open", "show", "match", "unmatch");
    cardsArray[i].addEventListener("click", function() {
      cardsArray[i].classList.add("open", "show");
        openCards = deck.querySelectorAll(".open")  ;
          for (let i = 0 ; i < openCards.length ; i++) {
            if (openCards.length == 2) {
          startMoves(); // starting counting
              openCards[i].classList.remove("open");
              if (openCards[0].type === openCards[1].type) {
                match();
                }
                else {
              unmatch();
            }
          }
        }
    });
    cardsArray[i].addEventListener("click", popUpWindow);
  };
};

/*
**
*** checking the cards
**
*/


function checkOutCards() {
  console.log(cardsArray);
  setTimeout(function() {
    $(card).addClass("open show freeze");
    setTimeout(function () {
      $(card).removeClass("open show freeze");
    },3000)
  },100)
  $(cardsArray).removeClass("freeze");
}



/*
**
*** matching cards
**
*/
function match() {
  openCards[0].classList.add("match", "freeze");
  openCards[1].classList.add("match", "freeze");
  console.log(matchedCards);

};


/*
**
*** Un.matching cards
**
*/

function unmatch() {
  openCards[0].classList.add("unmatch");
  openCards[1].classList.add("unmatch");
  freeze();
  setTimeout(function() {
    openCards[0].classList.remove("show", "unmatch");
    openCards[1].classList.remove("show", "unmatch");
    unfreeze();
  },700)
};

/*
**
*** freezing cards
**
*/

function freeze() {
  cardsArray.forEach(function (card) {
    card.classList.add("freeze");
  });
};
/*
**
*** Un.freezing cards
**
*/

function unfreeze() {
    cardsArray.forEach(function(card) {
      card.classList.remove("freeze");
      for (let i = 0 ; i < matchedCards.length ; i++) {
        matchedCards[i].classList.add("freeze");


      }
  });
};

/*
**
*** Counting the moves
**
*/

  function startMoves() {

	count += 1/2  ;
	moves.innerHTML = count;
  timing();
    if(moves.innerHTML <= 16 ) {
      scoresTitle.innerHTML = "WoooooT! <br>You Are 99 % Cheater Or 100 % lucky !"
    }
    else if (moves.innerHTML > 16  &&  moves.innerHTML <= 26 ) {
      secondStar.remove();
      scoresTitle.innerHTML = "Awesome ! <br>You Really Have A Good Memory !"
    }
      else if (moves.innerHTML > 26  &&  moves.innerHTML <= 36) {
      thirdStar.remove();
      scoresTitle.innerHTML = "Not Bad ! <br>You Need To Fouce More Next Time !"
    }
    else if (moves.innerHTML > 36 &&  moves.innerHTML <= 47) {
    fourthStar.remove();
    scoresTitle.innerHTML = "Not Bad ! <br>You Need To Fouce More Next Time !"
  }
    else if (moves.innerHTML  > 47) {
    fifthStar.remove();
    scoresTitle.innerHTML = "Finlly You Done It ! <br>Pay More Attention Next Time !"
  }

  };

  /*
  **
  *** Starting the timer
  **
  */

  function timing() {
    if (moves.innerHTML == 1) {
      starTheTimer = setInterval(function() {
        theTimer.innerHTML = hour + " h " + " : " + mint + " m " + ": "+ sec + " s";
        sec++;
        if ( sec > 59) {
          sec = 1;
          mint++;
        } else if ( mint > 59) {
          mint = 0;
          hour++;
        }
      },1000)
    }
  };

  /*
  **
  *** pop up window
  **
  */

  function popUpWindow() {
    if(matchedCards.length == 32) {
      clearInterval(starTheTimer);
      popUpScoreBored.classList.add("bigShow");


      let finalTime = theTimer.innerHTML;
      let starsRate =  document.querySelector(".stars").innerHTML;
      moves = moves.innerHTML;

      document.querySelector(".lastMove").innerHTML = moves;
      document.querySelector(".lastTimer").innerHTML = finalTime;
      document.querySelector(".lastRate").innerHTML = starsRate;
    }
  };

  /*
  **
  *** poro icon to restart the game "the page"
  **
  */

  function startOver() {
    shuffle(cardsArray);
    for (let i = 0; i < cardsArray.length; i++) {
      cardsArray[i].classList.remove("show", "open", "match", "unmatch", "freeze")
    }
    count = 0;
    moves.innerHTML = count;
    firstStar.style.color = "#fff";
    secondStar.style.color = "#fff";
    thirdStar.style.color = "#fff";
    fourthStar.style.color = "#fff";
    fifthStar.style.color = "#fff";
    sec = 0;
  	mint = 0;
	  hour = 0;
	theTimer.innerHTML = "The Timer";
	clearInterval(starTheTimer);
	window.location.reload(false);
};




checkOutCards()
clicking();
popUpWindow();
