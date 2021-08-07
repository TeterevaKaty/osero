let cells = document.querySelectorAll("#board th");
let turn = 0;
let color = ["black","white"];
let clickPosition = 0;
let checkPosition = 0;
let xPos = 0;
let yPos = 0;
let canMove = 0;
let direction = '';
let opponentList =[];
let pointsBlack = 0;
let pointsWhite = 0;
let whoseTurn = document.querySelectorAll('#turn');
   
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

    boardArr = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30, 31],
    [32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47],
    [48, 49, 50, 51, 52, 53, 54, 55],
    [56, 57, 58, 59, 60, 61, 62, 63],
];

function startPosition() {
    cells[27].classList.add("white"); 
    cells[28].classList.add("black");
    cells[35].classList.add("black");
    cells[36].classList.add("white");
}

window.onload = startPosition;

whoseTurn[0].style.background = "red";
showPossibleMove (colorArrReturn(turn));

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function(){clickAction(i)}, false);  
}

function clickAction(index) {
    console.log("move start >>>");
    console.log("click position " + index + " player " + turn % 2);

    if (isPosible(index)) {
        cells[index].classList.remove("red");
        cells[index].classList.add(color[turn % 2]);            
        
        for (let i = 0; i < directionArr.length; i++) {
            opponentCheck(directionArr[i][0], directionArr[i][1], colorArrReturn(turn), index);    
            console.log("opponents list " + opponentList);    
        }
        colorChange();

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (boardArr[i][j] === index){
                    boardColorArr[i][j] = colorArrReturn(turn);
                }
            }
        }
        turn++;

        if (color[turn % 2] == "black") {
            console.log("background black");
            whoseTurn[1].style.background = "white";
            whoseTurn[0].style.background = "red";
        } else {
            console.log("background white");
            whoseTurn[0].style.background = "white";
            whoseTurn[1].style.background = "red";    
        } 
    }   
    
    pointsOut();
        
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("red");
    }
    
    canMove = 0; 
    opponentList = [];

    showPossibleMove (colorArrReturn(turn));   
}

function isPosible (index) {

    console.log("isPosible function called");

    if (cells[index].classList.value === "red") {
        console.log("is posible true");
        return true;
    } else {
        console.log("is posible false");
        return false;
    }
}

function colorArrReturn(player) {
   return color[player % 2] === "black" ? -1 : 1;
}

function colorClassReturn(player) {
    return player === -1 ? color[0] : color[1];
}

function xAndYPos (index) {
    console.log("xAndYPos function called");   
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j <8; j++) {
            if (boardArr[i][j] === index) {
                xPos = i;
                yPos = j;
                console.log(i,j);
            }
        }
    } 
}

function directionCheck (directionX, directionY, plyaer_color) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j ++) {
            if (boardColorArr[i][j] === plyaer_color) //look on cell with player color
            {
                let x = 1;
                let y = 1;

                //console.log("directionCheck " + directionX + " " + directionY);
                while (((i + (x + 1) * directionX >= 0) && (j + (y + 1) * directionY >= 0) && (i + (x + 1) * directionX  < 8) && (j + (y + 1) * directionY  < 8)) ) { // and look for that cell possible move
                   
                        if ((boardColorArr[i + x * directionX][j + y * directionY ] != plyaer_color) && boardColorArr[i + x * directionX][j + y * directionY ] != 0) {

                            //console.log("opponent position "+ boardArr[i + x * directionX][j + y * directionY]);

                            if (cells[boardArr[i + x * directionX + directionX][j + directionY * y + directionY]].classList.value != "black" &&  cells[boardArr[i + x * directionX + directionX][j + directionY * y + directionY]].classList.value != "white" ){
                                cells[boardArr[i + x * directionX + directionX][j + directionY * y + directionY]].classList.add("red"); // proverit' eto uslovie
                                //console.log("add red for opponent position " + boardArr[i + x * directionX + directionX][j + directionY * y + directionY] + " for direction " + directionX + " " + directionY);
                                canMove++;
                            }
    
                        } else {
                            //console.log("no opponent on direction " + directionX + " " + directionY);
                            break;
                        }
                    x++;
                    y++;              
                }
            }
        }
    }
}

function showPossibleMove (plyaer_color) {
    console.log("showPossibleMove function called whith plyaer_color " +  plyaer_color);    

    for (let i = 0; i < directionArr.length; i++) {
        directionCheck(directionArr[i][0], directionArr[i][1], colorArrReturn(turn));        
    }

    if (canMove === 0 ) {
        console.log("before canmove check ok");
        console.log("points(-1)" + points(-1));
        console.log("points(1)" + points(1));
        console.log("points(-1) > points(1) " + (points(-1) > points(1)));
        console.log("points(-1) < points(1) " + (points(-1) < points(1)));
        console.log("points(-1) === points(1) " + (points(-1) === points(1)));

        let winner = document.getElementById('win');
        let bPoints = points(-1);
        let wPoints = points(1);


        if (bPoints > wPoints) {
           winner.textContent = "Black wins!";
        }
        if (wPoints > bPoints){
           winner.textContent = "White wins!";
        }
        if (bPoints === wPoints) {
            winner.textContent = "Draw!";
        }
    }
  
}

function opponentCheck(directionX, directionY, plyaer_color, clickPos) {
    console.log("opponentCheck function called whith collor " + plyaer_color + ", from posotion " + clickPos + " and direction " + directionX + " " + directionY);
    let posX = 0;
    let posY = 0;

    for(let i = 0; i < 8; i++) {                    //get click position x and y
        for (let j = 0; j < 8; j++) {
            if (boardArr[i][j] === clickPos) {
                posX = i;
                posY = j;
            }
        }
    }

    let x = 1;
    let y = 1;

    while (((posX + (x + 1) * directionX >= 0) && (posY + (y + 1) * directionY >= 0) && (posX + (x + 1) * directionX  < 8) && (posY + (y + 1) * directionY  < 8)) ) { // and look for that cell possible move

        if (boardColorArr[posX + x * directionX][posY + y * directionY] === (plyaer_color* -1)){           
            if (boardColorArr[posX + (x + 1) * directionX][posY + (y + 1) * directionY] === plyaer_color) {                  
                if (((posX + (x - 1)  * directionX >= 0) && (posY + (y - 1)* directionY >=0) && (posX + (x - 1) * directionX <8) && (posY + (y - 1) * directionY < 8))){
                    opponentList.push((boardArr[posX + x * directionX][posY + y * directionY]));
                    boardColorArr[posX + x * directionX][posY + y * directionY] = colorArrReturn(turn);
                    console.log("color chengeded arr " );
                    console.log(boardColorArr);
                    x = 0;
                    y = 0;
                    
                    console.log("opponent list added " + opponentList);      
                
                } else {
                    console.log("no opponent in list");
                }                       
            }            
        }       
        x++;
        y++;                      
    }  
}

function colorChange () {
    playerColor = color[turn % 2];
    oponentColor =  color[(turn + 1) % 2];
    console.log("colorChange function called whith collor " + playerColor );

    for (let l = 0; l < opponentList.length; l++) {
        console.log("color change for opponent posotion " + opponentList[l]);
        cells[opponentList[l]].classList.remove(oponentColor);
        cells[opponentList[l]].classList.add(playerColor);
        console.log("color changed for cell " + opponentList[l]);
    }
}

function points (plyaerColor) {
    console.log("points function called for " + plyaerColor);
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
    console.log("pointsOut function called");
    let pBlack = document.getElementById('black_points');
    let pWhite = document.getElementById('white_points');

    pBlack.innerHTML = points(-1);
    pWhite.textContent = points(1);

    console.log("before canmove check");
    console.log("canMove " + canMove);
}

/*function winnerCheck() {
    console.log("winnerCheck function called");
    console.log("black points " + points(-1));
    console.log("black points " );
    console.log("white points " + points(1));


}*/

function notOutBoard(posI, posJ) {
    if ((posI >= 0) && (posI < 8) && (posJ >= 0) && (posJ < 8)) {
        return true;
    } else {
        return false;
    }
}