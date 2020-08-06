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
let resetScore = document.getElementById("reset-score");
let key = "tic-tac-toe-gamestate";
window.addEventListener("DOMContentLoaded", (event) => {
  loadSave();
  grid.addEventListener("click", (event) => {
    newGame.disabled = true;
    saveState();
    if (gameStatus === "") {
      const eventTarget = event.target.id;
      // console.log(eventTarget);
      if (eventTarget.startsWith("square-")) {
        const squareNum = eventTarget.slice(7);
        const parsedNum = Number.parseInt(squareNum);
        if (squareValues[parsedNum] === "") {
          if (count % 2 !== 0) {
            playNike(parsedNum);
            saveState();
          } else {
            playAdidas(parsedNum);
            saveState();
          }
        }
        count++;
        console.log(currentPlayerSymbol);
        checkWin();
        checkTie();
        checkGameStatus();
        scoreUpdate();
      }
      saveState();
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
  resetScore.addEventListener("click", (event) => {
    scoreReset();
  });
});

function saveState() {
  let value = {
    currentPlayerSymbolSave: currentPlayerSymbol,
    boardSave: squareValues,
    gameStatusSave: gameStatus,
    nikeCountSave: nikeCount,
    adidasCountSave: adidasCount,
  };
  localStorage.setItem(key, JSON.stringify(value));
}

function loadSave() {
  let save = localStorage.getItem(key);
  if (save === null) {
    return;
  }
  let load = JSON.parse(save);
  currentPlayerSymbol = load.currentPlayerSymbolSave;
  squareValues = load.boardSave;
  gameStatus = load.gameStatusSave;
  nikeCount = load.nikeCountSave;
  adidasCount = load.adidasCountSave;
  for (let i = 0; i < 9; i++) {
    let square = document.getElementById(`square-${i}`);
    if (squareValues[i] !== "") {
      if (squareValues[i] === "nike") {
        const nikeImg = document.createElement("img");
        nikeImg.setAttribute("src", "nike.png");
        nikeImg.setAttribute("id", "nike-image");
        nikeImg.setAttribute("class", "nike");
        square.appendChild(nikeImg);
      } else {
        const adidasImg = document.createElement("img");
        adidasImg.setAttribute("src", "adidas.png");
        adidasImg.setAttribute("id", "adidas-image");
        adidasImg.setAttribute("class", "adidas");
        square.appendChild(adidasImg);
      }
    }
    checkGameStatus();
  }
}

function scoreUpdate() {
  let nikeScore = document.getElementById("nike-score");
  let adidasScore = document.getElementById("adidas-score");
  nikeScore.innerHTML = `NIKE: ${nikeCount}`;
  adidasScore.innerHTML = `ADIDAS: ${adidasCount}`;
}

function scoreReset() {
  let nikeScore = document.getElementById("nike-score");
  let adidasScore = document.getElementById("adidas-score");
  nikeScore.innerHTML = "NIKE: 0";
  adidasScore.innerHTML = "ADIDAS: 0";
}

function endGame() {
  currentPlayerSymbol = "nike";
  squareValues = ["", "", "", "", "", "", "", "", ""];
  gameStatus = "";
  count = 1;
  header.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    let square = document.getElementById(`square-${i}`);
    square.innerHTML = "";
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
