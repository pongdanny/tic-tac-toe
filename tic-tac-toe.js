let gameStatus = "";
let count = 1;
let currentPlayerSymbol = "nike";
let squareValues = ["", "", "", "", "", "", "", "", ""];
let grid = document.getElementById("tic-tac-toe-board");
let nikeCount = 0;
let adidasCount = 0;
let newGame = document.getElementById("new-game");
let header = document.getElementById("game-status");
let giveUp = document.getElementById("give-up");
window.addEventListener("DOMContentLoaded", (event) => {
  grid.addEventListener("click", (event) => {
    const eventTarget = event.target.id;
    // console.log(eventTarget);
    if (eventTarget.startsWith("square-")) {
      const squareNum = eventTarget.slice(7);
      const parsedNum = Number.parseInt(squareNum);
      if (squareValues[parsedNum] === "") {
        if (count % 2 !== 0) {
          playNike(parsedNum);
        } else {
          playAdidas(parsedNum);
        }
      }
      count++;
      console.log(currentPlayerSymbol);
      checkWin();
      checkTie();
      checkGameStatus();
    }
  });
  newGame.addEventListener("click", (event) => {
    endGame();
  });
  giveUp.addEventListener("click", (event) => {
    header.innerHTML = `Winner is ${currentPlayerSymbol}`;
    setTimeout(function () {
      endGame();
    }, 1500);
  });
});

function endGame() {
  let currentPlayerSymbol = "nike";
  let squareValues = ["", "", "", "", "", "", "", "", ""];
  let gameStatus = "";
  count = 1;
  header.innerHTML = "";
  for (let i = 0; i <= 8; i++) {
    let squareX = document.getElementById(`square-${i}`);
    squareX.innerHTML = "";
  }
}
function checkRows() {
  if (
    (squareValues[0] === squareValues[1] &&
      squareValues[1] === squareValues[2] &&
      squareValues[2] !== "") ||
    (squareValues[3] === squareValues[4] &&
      squareValues[4] === squareValues[5] &&
      squareValues[5] !== "") ||
    (squareValues[6] === squareValues[7] &&
      squareValues[7] === squareValues[8] &&
      squareValues[8] !== "")
  ) {
    gameStatus = `WINNER: ${currentPlayerSymbol}`;
    return true;
  }
}

function checkColumns() {
  if (
    (squareValues[0] === squareValues[3] &&
      squareValues[3] === squareValues[6] &&
      squareValues[6] !== "") ||
    (squareValues[1] === squareValues[4] &&
      squareValues[4] === squareValues[7] &&
      squareValues[7] !== "") ||
    (squareValues[2] === squareValues[5] &&
      squareValues[5] === squareValues[8] &&
      squareValues[8] !== "")
  ) {
    gameStatus = `WINNER: ${currentPlayerSymbol}`;
    return true;
  }
}

function checkDiag() {
  if (
    (squareValues[0] === squareValues[4] &&
      squareValues[4] === squareValues[8] &&
      squareValues[8] !== "") ||
    (squareValues[2] === squareValues[4] &&
      squareValues[4] === squareValues[6] &&
      squareValues[6] !== "")
  ) {
    gameStatus = `WINNER: ${currentPlayerSymbol}`;
    return true;
  }
}

function checkTie() {
  if (
    !checkRows() &&
    !checkDiag() &&
    !checkColumns() &&
    !squareValues.includes("")
  ) {
    gameStatus = "IT'S A TIE";
  }
}

function checkWin() {
  console.log(checkRows() || checkDiag() || checkColumns() === true);
  if (checkRows() || checkDiag() || checkColumns()) {
    gameStatus = `WINNER: ${currentPlayerSymbol}`;
    if (currentPlayerSymbol === "NIKE") {
      nikeCount++;
    } else {
      adidasCount++;
    }
  }
}

function checkGameStatus() {
  if (gameStatus !== "") {
    header.innerHTML = gameStatus;
    newGame.disabled = false;
    giveUp.disabled = true;
  } else {
    newGame.disabled = true;
    giveUp.disabled = false;
  }
}

function playNike(num) {
  const nikeImg = document.createElement("img");
  nikeImg.setAttribute("src", "nike.png");
  nikeImg.setAttribute("id", "nike-image");
  nikeImg.setAttribute("class", "nike");
  event.target.appendChild(nikeImg);
  squareValues[num] = "nike";
  currentPlayerSymbol = "NIKE";
}

function playAdidas(num) {
  const adidasImg = document.createElement("img");
  adidasImg.setAttribute("src", "adidas.png");
  adidasImg.setAttribute("id", "adidas-image");
  adidasImg.setAttribute("class", "adidas");
  event.target.appendChild(adidasImg);
  squareValues[num] = "adidas";
  currentPlayerSymbol = "ADIDAS";
}
