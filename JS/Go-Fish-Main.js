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
    let AceNum = 0;
    let TwoNum = 0;
    let ThreeNum = 0;
    let FourNum = 0;
    let FiveNum = 0;
    let SixNum = 0;
    let SevenNum = 0;
    let EightNum = 0;
    let NineNum = 0;
    let TenNum = 0;
    let JackNum = 0;
    let QueenNum = 0;
    let KingNum = 0;

 for (let i = 0; i < playerHands[playerHandId].length; i++){
     switch (playerHands[playerHandId][i].num){
         case 1: AceNum++;
         if (AceNum == BookNum){
             //console.log("book1");
             BookFound(1, playerHandId);
             AceNum = 0;
             playerScores[playerHandId]++;

         }
         break;
         case 2: TwoNum++;
         if (TwoNum == BookNum){
            //console.log("book2");
            BookFound(2, playerHandId);
            TwoNum = 0;
            playerScores[playerHandId]++;

        }
         break;
         case 3: ThreeNum++;
         if (ThreeNum == BookNum){
            //console.log("book3");
            BookFound(3, playerHandId);
            ThreeNum = 0;
            playerScores[playerHandId]++;

        }
         break;
         case 4: FourNum++;
         if (FourNum == BookNum){
            //console.log("book4");
            BookFound(4, playerHandId);
            FourNum = 0;
            playerScores[playerHandId]++;

        }
         break;
         case 5: FiveNum++;
         if (FiveNum == BookNum){
            //console.log("book5");
            BookFound(5, playerHandId);
            FiveNum = 0;
            playerScores[playerHandId]++;

        }
         break;
         case 6: SixNum++;
         if (SixNum == BookNum){
            //console.log("book6");
            BookFound(6, playerHandId);
            SixNum = 0;
            playerScores[playerHandId]++;

        }
         break;
         case 7: SevenNum++;
         if (SevenNum == BookNum){
            //console.log("book7");
            BookFound(7, playerHandId);
            SevenNum = 0;
            playerScores[playerHandId]++;

        }
         break;
         case 8: EightNum++;
         if (EightNum == BookNum){
            //console.log("book8");
            BookFound(8, playerHandId);
            EightNum = 0;
            playerScores[playerHandId]++;

        }
         break;
         case 9: NineNum++;
         if (NineNum == BookNum){
            //console.log("book9");
            BookFound(9, playerHandId);
            NineNum = 0;
            playerScores[playerHandId]++;

        }
         break;
         case 10: TenNum++;
         if (TenNum == BookNum){
            //console.log("book10");
            BookFound(10, playerHandId);
            TenNum = 0;
            playerScores[playerHandId]++;

        }
         break;
         case 11: JackNum++;
         if (JackNum == BookNum){
            //console.log("book11");
            BookFound(11, playerHandId);
            JackNum = 0;
            playerScores[playerHandId]++;

        }
         break;
         case 12: QueenNum++;
         if (QueenNum == BookNum){
            //console.log("book 12");
            BookFound(12, playerHandId);
            QueenNum = 0;
            playerScores[playerHandId]++;

        }
         break;
         case 13: KingNum++;
         if (KingNum == BookNum){
            //console.log("book 13");
            BookFound(13, playerHandId);
            KingNum = 0;
            playerScores[playerHandId]++;

        }
         break;
     }
 }
}


//Function to remove cards that are found and place them on the table, also gives points
function BookFound(BookName, playerHandId){
    let bookCounter = 0;

    for (let i = 0; i < playerHands[playerHandId].length; i++){
        ////console.log(playerHands[playerHandId][i].num == BookName);
        if (playerHands[playerHandId][i].num == BookName && bookCounter < 3){
            //console.log(playerHands[playerHandId][i]);
            Books.push(playerHands[playerHandId][i]);
            playerHands[playerHandId].splice(i, 1);
            BookFound(BookName, playerHandId);
          

    } 
}
checkBooks(playerHandId);

//BookFound(BookName, playerHandId);
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
