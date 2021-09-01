let cells = document.querySelectorAll("#board th");
let cell;
let whoseTurn = document.querySelectorAll('#turn');
let turn = 0;
let canMove = 0;
let color = ["black","white"];
let opponentList =[];
let isTest = true;
   
let boardColorArr = [                // 1 - white; -1 - black
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, -1, 0, 0, 0],
        [0, 0, 0, -1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];

const directionArr = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1]
];

function startPosition() {
    cells[27].classList.add("white"); 
    cells[28].classList.add("black");
    cells[35].classList.add("black");
    cells[36].classList.add("white");
}

window.onload = startPosition;

whoseTurn[0].style.background = "red";
showPossibleMove();

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function(){doClickAction(i)}, false); 
}

function doClickAction(index) {
    console.log("click cell " + index + " whith turn " + color[turn % 2]);

    cell = document.getElementById(index);

    if (checkPosible(index)) {
        cells[index].classList.remove("red");
        cells[index].classList.add(color[turn % 2]);            
        
        for (let i = 0; i < directionArr.length; i++) {
            opponentCheck(directionArr[i][0], directionArr[i][1], colorArrReturn(turn));      
        }
        colorChange();
        boardColorArr[cell.dataset.x][cell.dataset.y] = colorArrReturn(turn);
        turn++;

        showWhoseTurn();
    }   
    
    pointsOut();
        
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("red");
    }
    
    canMove = 0; 
    opponentList = [];

    showPossibleMove ();   
}

function showWhoseTurn() {
    if (color[turn % 2] == "black") {
        whoseTurn[1].style.background = "white";
        whoseTurn[0].style.background = "red";
    } else {
        whoseTurn[0].style.background = "white";
        whoseTurn[1].style.background = "red";    
    } 
}

function checkPosible (index) {
    if (cells[index].classList.value === "red") {
        return true;
    }
    return false;
}

function colorArrReturn(player) {
   return color[player % 2] === "black" ? -1 : 1;
}

function colorClassReturn(player) {
    return player === -1 ? color[0] : color[1];
}

function directionCheck (dirX, dirY, plyaer_color) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j ++) {
            if (boardColorArr[i][j] === plyaer_color) 
            {
                let x = 1;
                let y = 1;

                let nextCheckPosX = i + (x + 1) * dirX; 
                let nextCheckPosY = j + (y + 1) * dirY;

                let checkPos = 0;
                let nextCheckPos  = 0;

                while (notEndOfBoard(nextCheckPosX,nextCheckPosY)) {                     
                    checkPos = boardColorArr[i + x * dirX][j + y * dirY];  // the next position from the checked position 
                    nextCheckPos = document.querySelector('th[data-x="' + nextCheckPosX + '"][data-y="' + nextCheckPosY + '"]'); // from the click position, check the next position in the direction
                   
                    if ((checkPos != plyaer_color) && checkPos != 0) {
                            if (nextCheckPos.classList.value != "black" &&  nextCheckPos.classList.value != "white" ){
                                nextCheckPos.classList.add("red");   //show possible move by red color
                                canMove++;
                            }
    
                        } else {
                            break;
                        }
                    x++;
                    y++; 

                    nextCheckPosX = i + (x + 1) * dirX; 
                    nextCheckPosY = j + (y + 1) * dirY;             
                }
            }
        }
    }
}

function showPossibleMove () {
    for (let i = 0; i < directionArr.length; i++) {
        directionCheck(directionArr[i][0], directionArr[i][1], colorArrReturn(turn));        
    }

    if (canMove === 0 ) {
        let winner = document.getElementById('win');

        inArr=function(val,arr){
            for ( let i = 0 ; i < arr.length; i++) {
                if(arr[i]==val){
                return true;
                }
                if('object'==typeof arr[i]){
                    if(inArr(val,arr[i])){
                        return true;
                    }
                }
            }
            return false;
        }; 

        console.log("in arr are 0   " + (inArr(0, boardColorArr)));
          
        if (!inArr(0, boardColorArr)){
            if (pointsCount(-1) > pointsCount(1)) {
                winner.textContent = "Black wins!";
             }
             if (pointsCount(1) > pointsCount(-1)){
                winner.textContent = "White wins!";
             }
             if (pointsCount(-1) === pointsCount(1)) {
                 winner.textContent = "Draw!";
             }
        } else {
            console.log(boardColorArr);
            turn++;
            alert("You have no moves available! Turn goes to another player.");
            console.log("turn changed from " +color[(turn-1) % 2]+ " to " + color[turn % 2] );
            showWhoseTurn();
            showPossibleMove();
        }
    } 
}

function opponentCheck(dirX, dirY, plyaer_color) {
    let posX = Number(cell.dataset.x);
    let posY = Number(cell.dataset.y);
    let x = 1;
    let y = 1;
    let opNextCheckPosX = posX + (x + 1) * dirX; 
    let opNextCheckPosY = posY + (y + 1) * dirY;
    let opChekPosX = posX + x * dirX; 
    let opChekPosY = posY + y * dirY; 
    let goBackPosX = posX + (x - 1)  * dirX; 
    let goBackPosY = posY + (y - 1) * dirY;

    while (notEndOfBoard(opNextCheckPosX, opNextCheckPosY)) { // and look for that cell possible move
        let opCheckPos = boardColorArr[opChekPosX][opChekPosY];

        if (opCheckPos === (plyaer_color* -1)){           
            if (boardColorArr[opNextCheckPosX][opNextCheckPosY] === plyaer_color) {                  
                if (notEndOfBoard(goBackPosX, goBackPosY)){
                    let opCellIdByDataXY = document.querySelector('th[data-x="' + opChekPosX + '"][data-y="' + opChekPosY + '"]').id;
                    opponentList.push(opCellIdByDataXY);
                    boardColorArr[opChekPosX][opChekPosY] = colorArrReturn(turn);
                    x = 0;
                    y = 0;
                }                      
            }            
        }      
        x++;
        y++;      
        opNextCheckPosX = posX + (x + 1) * dirX; 
        opNextCheckPosY = posY + (y + 1) * dirY;
        goBackPosX = posX + (x - 1)  * dirX; 
        goBackPosY = posY + (y - 1) * dirY;
    }  
}

function colorChange () {
    playerColor = color[turn % 2];
    oponentColor =  color[(turn + 1) % 2];

    for (let l = 0; l < opponentList.length; l++) {
        cells[opponentList[l]].classList.remove(oponentColor);
        cells[opponentList[l]].classList.add(playerColor);
    }
}

function pointsCount (plyaerColor) {
    let playerPoints = 0;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j ++) {
            if (boardColorArr[i][j] === plyaerColor){
                playerPoints += 1; 
            }
        }
    }
    return playerPoints;
}

function pointsOut () {
    let pBlack = document.getElementById('black_points');
    let pWhite = document.getElementById('white_points');

    pBlack.innerHTML = pointsCount (-1);
    pWhite.textContent = pointsCount (1);
}

function notEndOfBoard(xPos, yPos) {
    if ((xPos >= 0) && (yPos >= 0) && (xPos < 8) && (yPos  < 8)) {
        return true;
    } else {
        return false;
    }
}