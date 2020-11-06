//Global Vars
let playerHands = new Array;
let playerScores = [0, 0, 0];
let players = 2;
let turn = 0;
let MouseClick = false;
let Books = new Array;
let BookNum = 2;
let isBots = false;

    //Create image elements
    appendImages();

   //Generate Cards
 Deck = GenerateGrid();

//Event listeners
document.getElementById("mycanvas").addEventListener("click", clickHandler);
document.getElementById("NextTurnBtn").addEventListener("click", newTurn);

//Function to display the menu screen before the main event function
function StartScreen(){
   
    isMenu = true;
    DrawStartingScreen();


}

function GameMode(GameMode){
    switch (GameMode){
        case "PnP1v1":
            players = 2;
            isBots = false;

        break;
        case "PnP1v1v1":
            players = 3;
            isBots = false;

        break;
        case "PvB1v1":
            players = 2;
            isBots = true;
        break;
        case "PvB1v1v1":
            players = 3;
            isBots = true;
    }
    isMenu = false;
    MainFunction();
}



//Main Event Function

function MainFunction() {

   

    //Deal Cards
    for (let i = 0; i < players; i++){
        console.log("pushing");
        playerHands.push(Deal());

        //check to see if there are paires
        checkBooks(i);
    }

    LoadingScreen();

    ScoreDisplay();

}

//Function for destributing cards from the deck to players hands
function Deal() {
 
    let HandArray = new Array;
    for (let i = 0; i < 7; i++){
        let randNum = Math.randomInt(0, Deck.length - 1);
        HandArray.push(Deck[randNum]);
        Deck.splice(randNum, 1);
    }
    
    return(HandArray);
}
 

//function for detecting when paires of cards are found
function checkBooks(playerHandId) {
    console.log("checking books");

    let cardNumArray = [];
    while (cardNumArray.length < 13){
        cardNumArray.push(0);
    }  
 
//call the checkCard function for each card and each possible rank for the givin card
    for (let i = 0; i < playerHands[playerHandId].length; i++){
        for (let n = 0; n < 13; n++){
            checkCard(playerHandId, i, n);
        }
    }
//call the BookFound function for each card that has been found twice or more times in a hand
    for (let i = 0; i <cardNumArray.length - 1; i++){
        if (cardNumArray[i] >= 2){
            BookFound(i + 1, playerHandId);
        }
    }   

//checks if a given card has a given value.
    function checkCard(playerHandId, i, n){
        console.log("checking" + playerHandId + i + n);
        
       
        if (playerHands[playerHandId][i].num == n){
            cardNumArray[n - 1] ++;
        }
    }
}


//Function to remove cards that are found and place them on the table, also gives points
function BookFound(BookName, playerHandId){
    console.log("book" + BookName);
    let bookCounter = 0;

    for (let i = 0; i < playerHands[playerHandId].length; i++){
      
        if (playerHands[playerHandId][i].num == BookName && bookCounter < 2){
            bookCounter++;
            console.log(bookCounter);

            Books.push(playerHands[playerHandId][i]);
            playerHands[playerHandId].splice(i, 1);
            i--;
            playerScores[playerHandId] += 0.5;

    } 
}
checkBooks(playerHandId);

}

//function for changing whos turn it is and checking if the game is over
function newTurn(){
    console.log("new turn");
    GameEndChecker();
    turn++;
    if (turn > players - 1){
        turn = 0;
    }
    LoadingScreen(); 
    TurnDone = false;

    
 if (isBots){
    console.log("isbots");
    if (players == 3 && turn + 1 == 2 || turn + 1  == 3){
        isBotTurn = true;
    console.log("f");
    BotTurn();
    }
    else if (players == 2 && turn + 1 == 2){
        isBotTurn = true;
    console.log("f");
    BotTurn();
    }
    else {
    console.log("f");
    isBotTurn = false;
    }
}
  else {
    console.log("f");
    isBotTurn = false;
    }

}

function turnGen(n){
    if (n > players - 1){
        return(0);
    }
    else {
        return(n);
    }
}

function GameEndChecker(){
    for (let i = 0; i <= players - 1; i++) {
    
        if (playerHands[i].length == 0){
    console.log("gameEnding");

            EndGame(i);
        }
    }
}

//Function to load image elements in HTML
function appendImages(){
    console.log("appending");
    let cardsuit = ["clubs", "spades", "hearts", "diamonds"];
    let row = 1;
    let col = 1;
    for (i = 0; i <= 51; i++){
        let imgEl = document.createElement("img");
       if (col > 13){
            col = 1;
            row++;
        }   
        imgEl.src = "Media/" + "row-" + row + "-col-" + col + ".jpg";
        imgEl.id = col + cardsuit[row - 1];
        console.log(imgEl);
        document.getElementById("images").appendChild(imgEl);

     col++;
    }
}
