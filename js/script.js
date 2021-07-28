let cells = document.querySelectorAll("#board th");
let turn = 0;
let color = ["black","white"];
let clickPosition = 0;
let checkPosition = 0;
let xPos = 0;
let yPos = 0;
let canMove = false;
let direction = '';
let opponentList =[];
let pointsBlack = 0;
let pointsWhite = 0;
   
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

pointsOut();
showPossibleMove (colorArrReturn(turn));


for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function(){clickAction(i)}, false);       
}



function clickAction(index) {
    if (isEmpty(index)) {
        if (isPosible(index)) {
            cells[index].classList.remove("red");
            cells[index].classList.toggle(color[turn % 2]);
            console.log("before color chenge");

            for (let i = 0; i < directionArr.length; i++) {
                opponentCheck(directionArr[i][0], directionArr[i][1], colorArrReturn(turn), index);    
                console.log("opponents  " + opponentList);    
            }
            colorChange(turn);
    
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (boardArr[i][j] === index){
                        boardColorArr[i][j] = colorArrReturn(turn);
                        console.log(boardColorArr);
                    }
                }
            }
        }
    }

    pointsOut();
    opponentList = [];
    turn++;

    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("red");
    }
    showPossibleMove (colorArrReturn(turn));   
}

function isEmpty(index) {

    if (cells[index].classList.contains("black") || cells[index].classList.contains("white")) {
        return false;
    } else {
        return true;
    }
}

function isPosible (index) {

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

                console.log("directionCheck");
                console.log(directionX, directionY);
                while (((i + x * directionX >= 0) && (j + y * directionY >= 0) && (i + x * directionX  < 8) && (j + y * directionY  < 8)) ) { // and look for that cell possible move
                   /* console.log("i " + i + " j "+ j);
                    console.log("boardColorArr[i + x * directionX][j + y * directionY] " + (boardColorArr[i + x * directionX][j + y * directionY ]));
                    console.log("boardColorArr[i + x * directionX][j + y * directionY] != plyaer_color " + (boardColorArr[i + x * directionX][j + y * directionY] != plyaer_color) );
                    console.log("boardColorArr[i + x * directionX][j + y * directionY] != 0 " + (boardColorArr[i + x * directionX][j + y * directionY] != 0));*/

                        if ((boardColorArr[i + x * directionX][j + y * directionY ] != plyaer_color) && boardColorArr[i + x * directionX][j + y * directionY ] != 0) {
                        
                            console.log ("opponent yes");
                            canMoveleft = true;
                            console.log("i " + i + " j "+ j + " x " + x + " y " + y +" massive "+ boardArr[i + x * directionX][j + y * directionY ]);
                            
                                              
                            console.log(cells[boardArr[i + x * directionX + directionX][j + directionY * y + directionY]]);
                            if (cells[boardArr[i + x * directionX + directionX][j + directionY * y + directionY]].classList.value != "black" &&  cells[boardArr[i + x * directionX + directionX][j + directionY * y + directionY]].classList.value != "white" ){
                                cells[boardArr[i + x * directionX + directionX][j + directionY * y + directionY]].classList.add("red"); // proverit' eto uslovie
                            }
    
                        } else {
                            console.log("opponent no");
                            canMoveleft = false;
                        }
                    x++;
                    y++;              
                }
            }
        }
    }
}

function showPossibleMove (plyaer_color) {     
    console.log(plyaer_color);

    for (let i = 0; i < directionArr.length; i++) {
        directionCheck(directionArr[i][0], directionArr[i][1], colorArrReturn(turn));        
    }
}

function opponentCheck(directionX, directionY, plyaer_color, clickPos) {

    console.log("index " + clickPos );
    console.log("opponent color " + plyaer_color * -1);
    console.log("player color " + plyaer_color);

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

    //console.log(" check posotion boardArr[posX + x * directionX][posY + y * directionY] " + boardArr[posX + x * directionX][posY + y * directionY]);
    //console.log("boardColorArr[posX + x * directionX][posY + y * directionY] color " + boardColorArr[posX + x * directionX][posY + y * directionY]);
    //console.log("(plyaer_color) * - 1 = " + (plyaer_color * - 1));

    while (boardColorArr[posX + x * directionX][posY + y * directionY] === (plyaer_color* -1)) {
        x++;
        y++;
        console.log("check if ");
        console.log("next check position boardArr[posX + x * directionX][posY + y * directionY] " + boardArr[posX + x * directionX][posY + y * directionY]);
        console.log("next check position boardArr[posX + x * directionX][posY + y * directionY] color " + boardColorArr[posX + x * directionX][posY + y * directionY]);
        console.log("(plyaer_color) " + plyaer_color);
        console.log("boardColorArr[posX + x * directionX][posY + y * directionY] === ((plyaer_color) * - 1) are " +boardColorArr[posX + x * directionX][posY + y * directionY] === plyaer_color);
        
        if (boardColorArr[posX + x * directionX][posY + y * directionY] === plyaer_color) {
            console.log("if checked");
            opponentList.push((boardArr[posX + (x-1)  * directionX][posY + (y-1) * directionY]));
            console.log(opponentList);
        } else {console.log("no opponent in list");}  
    }
}

function colorChange (player) {
    console.log("color chenge");
    console.log("player " + player);
    
    playerColor = color[turn % 2];
    oponentColor =  color[(turn + 1) % 2];

    console.log("playerColor " + playerColor);
    console.log("oponentColor " + oponentColor);

    for (let l = 0; l < opponentList.length; l++) {
        console.log(opponentList[l]);
         cells[opponentList[l]].classList.remove(oponentColor);
         cells[opponentList[l]].classList.add(playerColor);

         for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (boardArr[i][j] == opponentList[l]){
                    console.log("boardColorArr[i][j] " + boardColorArr[i][j]);
                    boardColorArr[i][j] = colorArrReturn(turn);
                    console.log(boardColorArr);
                }
            }
        }

         console.log("color chenged");
         console.log("color chengeded arr " );
         console.log(boardColorArr);

    }
}

function points (plyaerColor) {

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
    pBlack.innerHTML = points(-1);

    let pWhite = document.getElementById('white_points');
    pWhite.textContent = points(1);
}