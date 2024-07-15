const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const table = [["", "", ""],
["", "", ""],
["", "", ""]];

const player1 = "x";
const player2 = "o";
let currentPlayer = player1;
let playerWinner = false;
let moveCount = 1;

// Check row function 
function checkRow() {
    for (let i = 0; i < table.length; i++) {
        //check row player1(x)
        if (table[i][0] === player1 && table[i][1] === player1 && table[i][2] === player1) {
            playerWinner = true;
            console.log(`player : ${player1} wins!`);
            return;
        }
        //check row player2(o)
        if (table[i][0] === player2 && table[i][1] === player2 && table[i][2] === player2) {
            playerWinner = true;
            console.log(`player : ${player2} wins!`);
            return;
        }
    }
}

// Check col function
function checkCol() {
    for (let i = 0; i < table.length; i++) {
        //check col player1 (x)
        if (table[0][i] === player1 && table[1][i] === player1 && table[2][i] === player1) {
            playerWinner = true;
            console.log(`player : ${player1} wins!`);
            return;
        }
        //check col player2 (o)
        if (table[0][i] === player2 && table[1][i] === player2 && table[2][i] === player2) {
            playerWinner = true;
            console.log(`player : ${player2} wins!`);
            return;
        }
    }
}

//Check cross function 
function checkCross() {

    //player1(x) cross
    if (table[0][0] === player1 && table[1][1] === player1 && table[2][2] === player1) {
        playerWinner = true;
        console.log(`player : ${player1} wins!`);
        return;
    }
    if (table[0][2] === player1 && table[1][1] === player1 && table[2][0] === player1) {
        playerWinner = true;
        console.log(`player : ${player1} wins!`);
        return;
    }

    //player0(o) cross
    if (table[0][0] === player2 && table[1][1] === player2 && table[2][2] === player2) {
        playerWinner = true;
        console.log(`player : ${player2} wins!`);
        return;
    }
    if (table[0][2] === player2 && table[1][1] === player2 && table[2][0] === player2) {
        playerWinner = true;
        console.log(`player : ${player2} wins!`);
        return;
    }
}

function checkTie() {
    //check not tie 
    //find all row 
    for (let i = 0; i < table.length; i++) {
        //find every index in row 
        for (let j = 0; j < table[i].length; j++) {
            if (table[i][j] === "") {
                return false;
            }
        }
    }
    //if tie and no one win 
    if (playerWinner !== true) {
        console.log("It's a tie bobo!!!! :)");
        process.exit(0);
    }
}

// Create Table 
function printTable() {
    for (let i = 0; i < table.length; i++) {
        console.log(table[i].join(' | '));
        //add under line only index 0,1
        if (i < table.length - 1) {
            console.log('-------');
        }
    }
}

// Play function
function play() {
    printTable();
    rl.question(`Player ${currentPlayer}, enter your move (row,col): `, (move) => {
        // console.log(move); // "1", "2"
        //delete ","
        const [row, col] = move.split(',');
        //if player didn't type anything or player type string like k,k l,l (isNaN return true when input is a,b,c,... will return fasle when input "1", 1 ...)
        if (!row || !col || isNaN(row) || isNaN(col)) {
            console.log("Invalid move format, please enter row,col.");
            play();
        } else {
            //if table[row][col] not exit
            if (table[row][col] === "") {
                //set table with player1(x) or player2(o)
                table[row][col] = currentPlayer;
                //check winner
                checkRow();
                checkCol();
                checkCross();
                //check tie 
                checkTie();
                //win condition
                if (playerWinner) {
                    rl.close();
                } else {
                    //switch player turn  
                    moveCount++;
                    //change currentPlayer if round odd player1(x) play else player2(0) play
                    currentPlayer = moveCount % 2 === 1 ? player1 : player2;
                    play();
                }
            } else {
                //if index is already exit
                console.log(`It's seem like "player : ${table[row][col]}" is already play on this index, Try again. :(`);
                play();
            }
        }
    });
}


play();
