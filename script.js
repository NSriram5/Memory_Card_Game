const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let unturned = 10;
let guessturned = [];
let slowDown = false;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newcardcontainerDiv = document.createElement("div");
    const newflipcardDiv = document.createElement("div");
    const newfrontDiv = document.createElement("div");
    const newbackDiv = document.createElement("div");
    newbackDiv.style.backgroundColor = color;
    newflipcardDiv.style.margin = "0px";

    // give it a class attribute for the value we are looping over
    newcardcontainerDiv.classList.add(color, "flip-card-container");
    newflipcardDiv.classList.add("flip-card");
    newfrontDiv.classList.add("flip-card-front");
    newbackDiv.classList.add("flip-card-back");

    // call a function handleCardClick when a div is clicked on
    newcardcontainerDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    newflipcardDiv.append(newfrontDiv);
    newflipcardDiv.append(newbackDiv);
    newcardcontainerDiv.append(newflipcardDiv);
    gameContainer.append(newcardcontainerDiv);
  }
}

function reflipCards(){
  colorCards1 = Array.from(document.querySelectorAll(`.${guessturned[0]}`));
  colorCards2 = Array.from(document.querySelectorAll(`.${guessturned[1]}`));
  colorCards = colorCards1.concat(colorCards2);
  //colorCards.concat(Array.from(document.querySelectorAll(`.${color2}`)));
  for (card of colorCards){
    //debugger;
    card.firstElementChild.style.transform = "rotateY(0deg)";
  }
  guessturned = [];
  slowDown = false;
}



// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log(event);
  console.log("you just clicked", event.target.nextElementSibling);

  //conditional for if this is the first card turned over
  if (slowDown === false) {
    if (guessturned.length === 0){
      event.target.parentElement.style.transform = "rotateY(180deg)";
      guessturned.push(event.target.nextElementSibling.style.backgroundColor);
    }else if (guessturned.length === 1){
      event.target.parentElement.style.transform = "rotateY(180deg)";
      guessturned.push(event.target.nextElementSibling.style.backgroundColor);
      if (guessturned[0]===guessturned[1]){
        console.log("Good job you got one");
        unturned -= 2;
        guessturned = [];
        //end game function here******
        if (unturned === 0){
          console.log("You've won");

        }

      }else{
        slowDown = true;
        let timerID = setTimeout(reflipCards,1000);
        console.log(timerID);
        //pause then turn the cards back over... pause resets slowDown

      }
    }else {console.log("Error: too many turned over... somehow")}
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

let button = document.querySelector('Button');
button.addEventListener('click',function(){
  guessturned = COLORS.slice(0,6);
  reflipCards();
  shuffledColors = shuffle(COLORS);
  let game = document.getElementById('game');
  game.innerHTML = "";
  createDivsForColors(shuffledColors);
})
