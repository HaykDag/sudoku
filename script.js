let mainBoard = [[6,4,3,5,1,7,9,2,8],[8,1,5,3,2,9,7,4,6],[2,9,7,8,6,4,3,1,5],[9,2,8,1,7,5,6,3,4],[4,7,1,6,3,2,5,8,9],[5,3,6,9,4,8,1,7,2],[7,5,9,4,8,3,2,6,1],[3,6,4,2,5,1,8,9,7],[1,8,2,7,9,6,4,5,3]];

let board = mainBoard;
let colArr = [[],[],[],[],[],[],[],[],[]];
let errorCount = 0;
let missingNum = 0;
let completedNum =0;
let boardCell;
let isHelp = false;
let gameLevel  = "easy";
let delNum = 28;
let start = "";
let numSelected;

window.onload = function()  {
    makeBoard();
    setGame ();
    
}

 
 
function setGame () {
    
   for(let i = 1; i<=9; i++) {
       let digits = document.createElement("div");
       digits.id = i;
       digits.innerText = i;
       digits.addEventListener("click", selectedNumber);
       digits.classList.add("number");
       document.getElementById("digits").appendChild(digits);
   }
   for (let r = 0; r<9 ; r++){
       for(let c =0; c<9; c++){
          boardCell = document.createElement("div");
          boardCell.id = r +"p" + c ;
            if (r == 3 || r == 6) {
                boardCell.classList.add("vertical-line");
            };
            if (c == 3 || c == 6){
                boardCell.classList.add("horizontal-line");
            }
          boardCell.innerText = colArr[r][c];
          boardCell.classList.add("cell");
          document.getElementById("board").appendChild(boardCell); 
          boardCell.addEventListener("click", putNumbersOnTheBoard);
          document.getElementById("solve").addEventListener("click", solve);
          document.getElementById("help").addEventListener("click", help);
          
          
       }
   }
   
   setTheBoard ();
  
}

function makeBoard (){
    let randomNumRow = Math.floor(Math.random() * 10 +1);
    let randomNumcol = Math.floor(Math.random() * 10 +1);
    //shuffling the rows
        for (let i = 0; i < 9; i++){ 
            
            for (let r = 0; r < randomNumRow ; r++) {

                let num = board[i].shift();
                board[i].push(num);
                
            }
     }
     
// rewrite the board from rows to columns
     for (i = 0; i<9 ; i++) { 
        for ( r = 0; r< 9; r++){
            let num = mainBoard[r][i];
            colArr[i].push(num);
        }
    } 
    //shuffling the columns
    for (let i = 0; i < 9; i++){ 
        
        for (let r = 0; r < randomNumcol ; r++) {

            let num = colArr[i].shift();
            colArr[i].push(num);
            
        }
    }
    
}

function selectedNumber(){
    
    if (numSelected != null){
        numSelected.classList.remove("selectedNumber");
    } 
         numSelected = this;
        numSelected.classList.add("selectedNumber");    
}

function putNumbersOnTheBoard(){
    if(this.innerText != "") {
        return;
    } else if (isHelp){
        let coord = this.id;
        coord = coord.split("p");
        let r = parseInt(coord[0]);
        let c = parseInt(coord[1]);
        this.innerText = colArr[r][c];
        isHelp = false;
        errorCount = errorCount+1;
        document.getElementById("wrong").innerText = (errorCount);
    }
    
    let coord = this.id;
    
    coord = coord.split("p");
    let r = parseInt(coord[0]);
    let c = parseInt(coord[1]);
    
    if (colArr[r][c] == numSelected.id){
        this.innerText = numSelected.innerText;
        completedNum = completedNum +1;

        if (completedNum === missingNum){
            alert("Great job! You made " + errorCount + " mistakes");
        }
    } 
    else {   
        errorCount = errorCount + 1;
        document.getElementById("wrong").innerText = (errorCount);
        if (errorCount > 20){
            alert("You are such a LOSER! You made " + errorCount + "mistakes");
        }
       }
}
// deleting 36 numbers from the board, easy level
function setTheBoard(){
    
    for (i=0;i<32;i++) {
        let ranNumRow = (Math.floor(Math.random() * 9 +1)-1);
        let ranNumcol = (Math.floor(Math.random() * 9 +1)-1);
        let cellId = ranNumRow  + "p" + ranNumcol;

        let tile = document.getElementById(cellId);
        if(tile.innerText != ""){
            tile.innerText = "";
            tile.classList.add("empty-cells");
        }else i--;
        
        missingNum = i;
    } 
}


function solve (){
    for (let r = 0; r<9 ; r++){
        for(let c =0; c<9; c++){
          let id = r + "p" + c
           document.getElementById(id).innerText = colArr[r][c];
               
        }
    }
}
function help (){
    isHelp = true;
    numSelected.classList.remove("selectedNumber")
}

/*function levelSet(level){
    
if (level == "easy"){
    delNum = 28;
}else if (level == "medium"){
    delNumm = 36;
}else if (level == "hard"){
    delNum = 42;
    console.log(delNum);
}

}*/
// random  from 1 to 10
// randomNumRow = Math.floor(Math.random() * 10 +1);
// randomNumCol = Math.floor(Math.random() * 10 +1);
// the last element of the array is the lenght -1 
/*   Array.prototype.every()
Returns true if every element in the calling array satisfies the testing function.
*/
/* Array.prototype.reverse()
Reverses the order of the elements of an array in place. (First becomes the last, last becomes first.)*/
/*  
         Array.prototype.unshift()
Adds one or more elements to the front of an array, and returns the new length of the array.
        Array.prototype.shift()
Removes the first element from an array and returns that element.
        Array.prototype.push()
Adds one or more elements to the end of an array, and returns the new length of the array.
        Array.prototype.pop()
Removes the last element from an array and returns that element.*/