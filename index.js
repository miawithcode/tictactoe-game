const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winCondition =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const X_PLAYER = "X";
const O_PLAYER = "O";
let option = ["", "", "", "", "", "", "", "", ""]; //玩家的选择，暂时9个都为空字符
let currentPlayer = X_PLAYER;
let running = false;

startGame();

function startGame(){
    running = true;
    cells.forEach(cell => cell.addEventListener("click", cellChecked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}' turn`;
}

function cellChecked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(option[cellIndex] !== "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    option[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == X_PLAYER) ? O_PLAYER : X_PLAYER;
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon =false;
    for(let i = 0; i < winCondition.length; i++){
        const condition = winCondition[i];
        const cellOne = option[condition[0]];
        const cellTwo = option[condition[1]];
        const cellThree = option[condition[2]];

        if(cellOne == "" || cellTwo == "" || cellThree == ""){
            continue;
        }
        if(cellOne == cellTwo && cellTwo == cellThree){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`
        running = false;
    }
    else if(!option.includes("")){
        statusText.textContent = `It's a tie`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){
    running = true
    currentPlayer = X_PLAYER;
    option = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`
    cells.forEach(cell => cell.textContent = "");
}
