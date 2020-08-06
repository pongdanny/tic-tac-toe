let count = 1;
let currentPlayerSymbol = "nike";
let squareValues = ["", "", "", "", "", "", "", "", ""];
let grid = document.getElementById("tic-tac-toe-board");
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
    }
  });
});

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
